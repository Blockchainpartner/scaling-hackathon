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

![Kiwi](./public/images/doc1.png)

#### Web3 Metamask setup

There are the main functions to setup for a minimal Metamask Onboarding.  
- Checking if the extension is installed
- Connect the user
- And get the accounts: address and balance

More documentation about Metamask Onboarding [here](https://docs.metamask.io/guide/create-dapp.html#basic-action-part-1).

![Kiwi](./public/images/doc2.png)

#### promisify

Util function used to resolve and manage web3 Promises.

![Kiwi](./public/images/doc3.png)

#### window + nextJs turnaround

NextJs uses SSR and SSG. While serving the frontend, on the SSR phase, there is no `window` element, like on a client's browser.  
Hence the turnaround.

![Kiwi](./public/images/doc4.png)


## Dependencies

<img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" alt="Next" width="30px"/>
<img src="https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png" alt="TypeScript" width="30px"/>
<img src="https://lh3.googleusercontent.com/proxy/iMnwmr24qPpT9gjnR_4xNv97ykdyRKvScr4GGRQ14CJlKy8xwZ0Ev-Aiw4qtQEIu111WmlC0TH4hbsOv0Lp2q7MMX4ZGaqCP" alt="Redux" width="30px"/>
<img src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" alt="TailwindCSS" width="30px"/>
<img src="https://miro.medium.com/max/1400/1*2GHi9FwnyA5UTJpcxPSG7A.jpeg" alt="web3" width="30px"/>
<img src="https://platform.eductx.org/static/media/metamask.5e06983f.png" alt="Metamask" width="30px"/>
