
type EncryptPKIType = {
	publicKey: string;
	encryptedPrivateKey: string;
};

const _arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};
const _base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
};

const digestPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return _arrayBufferToBase64(hash);
};

const sha256 = async (message: string): Promise<string> => {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/* ************************************************************************
 **	We are generating a private and a public key for the member.
 **	Theses keys are the most important part of all the process. Without
 **	them, no encryption, but also no decryption.
 ************************************************************************ */
const generatePKI = async (): Promise<CryptoKeyPair> => {
  const pki = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: { name: 'SHA-512' },
    },
    true,
    ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey'],
  );
  return pki;
};

const encryptPKI = async (password: string, pki: CryptoKeyPair): Promise<EncryptPKIType> => {
  const encoder = new TextEncoder();
  const encodedPassword = encoder.encode(password);
  const IV = new Uint8Array(256);
  const salt = new Uint8Array(256);

  window.crypto.getRandomValues(IV);
  window.crypto.getRandomValues(salt);

  /* ************************************************************************
   **	We need to save the keys to the database to get access to them
   **	We cannot (should not, must not) save the plain keys.
   **	We need to encrypt the private key, which will be used for decryption
   **	with the session password.
   **	To achieve this, we need to transform the password to a crypto key, and
   **	derive it from a random salt.
   **	The salt will be stored with the password for session decryption
   ************************************************************************ */
  const derivedKey = await window.crypto.subtle.importKey(
    'raw',
    encodedPassword,
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );
  const wrappingKey = await window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt, iterations: 100000, hash: 'SHA-256' },
    derivedKey,
    { name: 'AES-GCM', length: 256 },
    true,
    ['wrapKey', 'unwrapKey'],
  );

  /* ************************************************************************
   **	We can now wrap the private key with the key derived from the password
   **	with an IV which will be stored on the server with the salt and the
   **	encrypted private key.
   ************************************************************************ */
  const encryptedPrivateKey = await window.crypto.subtle.wrapKey(
    'pkcs8',
    pki.privateKey,
    wrappingKey,
    { name: 'AES-GCM', iv: IV },
  );
  const exportedPublicKey = await window.crypto.subtle.exportKey('spki', pki.publicKey);

  return {
    publicKey: _arrayBufferToBase64(exportedPublicKey),
    encryptedPrivateKey: `${_arrayBufferToBase64(encryptedPrivateKey)},${_arrayBufferToBase64(
      salt,
    )},${_arrayBufferToBase64(IV)}`,
  };
};

const encryptPrivateKey = async (password: string, privateKey: CryptoKey): Promise<string> => {
  const encoder = new TextEncoder();
  const encodedPassword = encoder.encode(password);
  const IV = new Uint8Array(256);
  const salt = new Uint8Array(256);

  window.crypto.getRandomValues(IV);
  window.crypto.getRandomValues(salt);

  /* ************************************************************************
   **	We need to save the keys to the database to get access to them
   **	We cannot (should not, must not) save the plain keys.
   **	We need to encrypt the private key, which will be used for decryption
   **	with the session password.
   **	To achieve this, we need to transform the password to a crypto key, and
   **	derive it from a random salt.
   **	The salt will be stored with the password for session decryption
   ************************************************************************ */
  const derivedKey = await window.crypto.subtle.importKey(
    'raw',
    encodedPassword,
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );
  const wrappingKey = await window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt, iterations: 100000, hash: 'SHA-256' },
    derivedKey,
    { name: 'AES-GCM', length: 256 },
    true,
    ['wrapKey', 'unwrapKey'],
  );

  /* ************************************************************************
   **	We can now wrap the private key with the key derived from the password
   **	with an IV which will be stored on the server with the salt and the
   **	encrypted private key.
   ************************************************************************ */
  const encryptedPrivateKey = await window.crypto.subtle.wrapKey('pkcs8', privateKey, wrappingKey, {
    name: 'AES-GCM',
    iv: IV,
  });

  return `${_arrayBufferToBase64(encryptedPrivateKey)},${_arrayBufferToBase64(
    salt,
  )},${_arrayBufferToBase64(IV)}`;
};

const decryptPrivateKey = async (
  encryptedPrivateKey: string,
  password: string,
): Promise<CryptoKey> => {
  const encoder = new TextEncoder();
  const encodedPassword = encoder.encode(password);

  const [encPK, salt, IV] = encryptedPrivateKey
    .split(',')
    .map((epk: string): ArrayBuffer => _base64ToArrayBuffer(epk));

  /* ************************************************************************
   **	We need to reverse the encryption process
   **	First thing to do is to recreate the derived key from the password and
   **	the salt
   ************************************************************************ */
  const passwordKey = await window.crypto.subtle.importKey(
    'raw',
    encodedPassword,
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );
  const derivedKey = await window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    true,
    ['wrapKey', 'unwrapKey'],
  );

  /* ************************************************************************
   **	Then, we can unwrap the encryptedPrivateKey with the help of the
   **	derivedKey and the IV
   ************************************************************************ */
  return await window.crypto.subtle.unwrapKey(
    'pkcs8',
    encPK,
    derivedKey,
    { name: 'AES-GCM', iv: IV },
    { name: 'RSA-OAEP', hash: 'SHA-512' },
    true,
    ['decrypt', 'unwrapKey'],
  );
};

/* ************************************************************************
 **	encryptWithPublicKey and decryptWithPrivateKey are used to handle
 ** data which has been encrypted with a public key from a CryptoKeyPair.
 ************************************************************************ */
const decryptWithPrivateKey = async (
  dataToDecrypt: string,
  privateKey: CryptoKey,
): Promise<string> => {
  const data = _base64ToArrayBuffer(dataToDecrypt);
  const decrypted = await window.crypto.subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, data);
  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
};

const encryptWithPublicKey = async (
  dataToEncrypt: string,
  b64publicKey: string,
): Promise<string> => {
  const publicKey = await window.crypto.subtle.importKey(
    'spki',
    _base64ToArrayBuffer(b64publicKey),
    { name: 'RSA-OAEP', hash: 'SHA-512' },
    true,
    ['encrypt'],
  );
  const encoder = new TextEncoder();
  const data = encoder.encode(dataToEncrypt);

  const encryptedData = await window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, data);
  return _arrayBufferToBase64(encryptedData);
};

/******************************************************************************
 **  encryptDataWithSecret is used to encrypt some data with a cryptoKey. This
 **  cryptoKey is not an element of a KeyPair. It is used only for symetric
 **  encryption
 ******************************************************************************/
const encryptDataWithSecret = async (
  dataToEncrypt: string,
  wrappingKey: CryptoKey,
): Promise<string> => {
  const IV = new Uint8Array(12);
  window.crypto.getRandomValues(IV);

  const encoder = new TextEncoder();
  const data = encoder.encode(dataToEncrypt);
  const encryptedSecretKey = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: IV },
    wrappingKey,
    data,
  );
  return `${_arrayBufferToBase64(IV)},${_arrayBufferToBase64(encryptedSecretKey)}`;
};

/******************************************************************************
 **  decryptDataWithSecret is used to decrypt some data with a secret key. This
 **  secret key should be provided raw. It is used only for symetric decryption
 ******************************************************************************/
const decryptDataWithSecret = async (
  dataToEncrypt: string,
  rawWrappingKey: string,
  IV: string,
): Promise<string> => {
  const wrappingKey = await window.crypto.subtle.importKey(
    'raw',
    _base64ToArrayBuffer(rawWrappingKey),
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );

  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: _base64ToArrayBuffer(IV) },
    wrappingKey,
    _base64ToArrayBuffer(dataToEncrypt),
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
};

/* ************************************************************************
 **	generateSecretKey will generate a CryptoKey based on a random entropy
 ************************************************************************ */
const generateSecretKey = async (): Promise<CryptoKey> => {
  return await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );
};

/* ************************************************************************
 **	publicKeyToBase64 will export a publicKey to it's spki format and
 ** convert it to it's base64 counterpart
 ************************************************************************ */
const publicKeyToBase64 = async (publicKey: CryptoKey): Promise<string> => {
  const exportedPublicKey = await window.crypto.subtle.exportKey('spki', publicKey);
  return _arrayBufferToBase64(exportedPublicKey);
};

/* ************************************************************************
 **	secretKeyToBase64 will export a key to it's raw format and convert it
 ** to it's base64 counterpart
 ************************************************************************ */
const secretKeyToBase64 = async (secretKey: CryptoKey): Promise<string> => {
  const exportedSecretKey = await window.crypto.subtle.exportKey('raw', secretKey);
  return _arrayBufferToBase64(exportedSecretKey);
};

const exportKey = async(secretKey: CryptoKey) => {
  return await crypto.subtle.exportKey('jwk', secretKey);
}


export {
  generatePKI,
  encryptPKI,
  encryptPrivateKey,
  decryptPrivateKey,
  decryptWithPrivateKey,
  encryptWithPublicKey,
  encryptDataWithSecret,
  decryptDataWithSecret,
  generateSecretKey,
  publicKeyToBase64,
  secretKeyToBase64,
  digestPassword,
  exportKey,
  sha256,
};