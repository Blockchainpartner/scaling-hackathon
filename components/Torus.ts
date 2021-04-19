import OpenLogin from "@toruslabs/openlogin";
import useClientEffect from "../utils/useClientEffect";


const VERIFIER = {
  loginProvider: "google", // "facebook", "apple", "twitter", "reddit", etc. See full list of supported logins: https://docs.tor.us/direct-auth/supported-authenticators-verifiers
  clientId: "YOUR PROJECT ID",
};
const TorusInit = () => { 
	useClientEffect(() => {
	  (async function () {
		try {
		  const openlogin = new OpenLogin({
			clientId: VERIFIER.clientId,
			iframeUrl: "http://beta.openlogin.com", // Beta version of OpenLogin
			network: "testnet",
		  });
		  console.log(openlogin)
		  await openlogin.init();
		  console.log(openlogin.privKey)
		} finally {
			console.log(`YEAH`);
		}
	  })();
	}, []);
    
	return null;
  };
  
  export default TorusInit;
  