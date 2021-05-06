import BN from "bn.js";
import Web3 from "web3";
import { pedersen } from "./pedersen";

async function hashData(
  _nullifier: string,
  _data: string,
  _secret: string
): Promise<string> {
  const data = Web3.utils.toBN(Web3.utils.toHex(_data));
  const nullifier = Web3.utils.toBN(Web3.utils.toHex(_nullifier));
  const secret = Web3.utils.toBN(Web3.utils.toHex(_secret));
  const pSecret = Web3.utils.toBN(`0x${pedersen([nullifier, secret])}`);
  return `0x${pedersen([data, pSecret])}`;
}
async function hashSecret(
  _nullifier: string,
  _secret: string
): Promise<string> {
  const nullifier = Web3.utils.toBN(Web3.utils.toHex(_nullifier));
  const secret = Web3.utils.toBN(Web3.utils.toHex(_secret));
  const pSecret = Web3.utils.toBN(`0x${pedersen([nullifier, secret])}`);
  return pSecret.toString(10);
}
function modCairoPrime(str: string): string | Promise<string> {
  const prime = new BN(
    "800000000000011000000000000000000000000000000000000000000000001",
    16
  );
  const value = new BN(str, 16);
  const result = value.mod(prime);
  return result.toString(10);
}
function addCairoPrime(str: string): string | Promise<string> {
  const prime = new BN(
    "800000000000011000000000000000000000000000000000000000000000001",
    16
  );
  const value = new BN(str, 10);
  const result = value.add(prime);
  return `0x${result.toString(16)}`;
}

const REGISTRIES = {
  DISABILITY: `374546399808851745807054416014379391823657543778127138954064098322040293325`,
  YOUNG: `161373187550089867448191830760110801114155294027693593477164529548269146668`,
  OLD: `418791004851046193537070596848530790547129451305514433175127304050849890764`,
};

export { hashData, hashSecret, modCairoPrime, addCairoPrime, REGISTRIES };
