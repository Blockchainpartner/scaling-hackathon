![Kiwi](./public/images/logo_small.png)

# Kiwi dApp

A training frontend project for `Tailwindcss`, `Web3` and `Metamask` integrations.

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FBlockchainpartner%2Ftailwind-web3)
## Demo

Click on the logo to test the demo deployed with 
[Vercel](https://vercel.com)


[<img src="https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/180x180.png" width="40px"/>](https://test-mew.vercel.app/)

## Code Notes

#### Web3 usage

This is the way web3 is instantiated.  
Replace `givenProvider` by a custom RCP URI if needed.

```typescript
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);
```

#### Web3 Metamask setup

There are the main functions to setup for a minimal Metamask Onboarding.  
- Checking if the extension is installed
- Connect the user
- And get the accounts: address and balance

More documentation about Metamask Onboarding [here](https://docs.metamask.io/guide/create-dapp.html#basic-action-part-1).

```typescript
const checkAccounts = async () => {
    //we use eth_accounts because it returns a list of addresses owned by us.
    if (typeof window !== undefined) {
      const mmAccounts = await window.ethereum.request({method: 'eth_accounts'});
      setAccounts(mmAccounts);
      dispatch({
        type: 'SET_ACCOUNTS',
        payload: {
          accounts: mmAccounts,
        },
      });
      await getBalance();
    } else {
      setAccounts(await []);
    }
};

//This will start the onboarding proccess
const onClickInstall = () => {
    //On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding();
};

//This will request a connection to Metamask and launch checkAccounts()
const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      if (typeof window !== undefined) await window.ethereum.request({method: 'eth_requestAccounts'});
      await checkAccounts();
    } catch (error) {
      console.error(error);
    }
};

//This will provide the balances on accounts' update (via useEffect)
const getBalance = async () => {
    let address: any, wei, mmBalance;
    address = accounts[0];
    wei = promisify((cb: any) => web3.eth.getBalance(address, cb));
    try {
      mmBalance = web3.utils.fromWei(await wei as string, 'ether');
      setBalance(mmBalance);
    } catch (error) {
      console.log(error);
    }
};

useEffect(() => {
    if(accounts.length > 0 && typeof window !== undefined){
      (async function() {
        try {
          await getBalance();
        } catch (e) {
          console.error(e);
        }
      })();
    }
}, [accounts]);
```

#### promisify

Util function used to resolve and manage web3 Promises.

```typescript
const promisify = (inner: any) =>
  new Promise((resolve, reject) =>
    inner((err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  );
```

#### window + nextJs turnaround

NextJs uses SSR and SSG. While serving the frontend, on the SSR phase, there is no `window` element, like on a client's browser.  
Hence the turnaround.

```typescript
if (typeof window !== undefined)
```

#### ERC20 token balances

Function to use o get balances for other ERC20 tokens on the connected wallet (where `ERC20_JSON` is the JSON interface).

```typescript
async function checkERC20Amount(web3: any, userAddress: string, erc20Address: string) {
  const	erc20Json = new web3.eth.Contract(ERC20_JSON, erc20Address);
  const	balanceRightNow = await erc20Json.methods.balanceOf(userAddress).call().then((e: any) => e);
  return web3.utils.fromWei(balanceRightNow);
}
```

## Dependencies

<p float="left">
    <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" alt="Next" width="30px"/>
    <img src="https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png" alt="TypeScript" width="30px"/>
    <img src="https://lh3.googleusercontent.com/proxy/iMnwmr24qPpT9gjnR_4xNv97ykdyRKvScr4GGRQ14CJlKy8xwZ0Ev-Aiw4qtQEIu111WmlC0TH4hbsOv0Lp2q7MMX4ZGaqCP" alt="Redux" width="30px"/>
    <img src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" alt="TailwindCSS" width="30px"/>
    <img src="https://miro.medium.com/max/1400/1*2GHi9FwnyA5UTJpcxPSG7A.jpeg" alt="web3" width="30px"/>
    <img src="https://platform.eductx.org/static/media/metamask.5e06983f.png" alt="Metamask" width="30px"/>
</p>