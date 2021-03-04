import React from 'react';
import Image from 'next/image'
import Wallet from '../components/Wallet/Wallet';
import Web3 from "web3";

declare global {
  interface Window { web3: any; ethereum: any; }
}

if (typeof window !== "undefined") {
  window.web3 = window.web3 || {};
  window.ethereum = window.ethereum || {};

  //Check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };


}

const IndexPage = () => (
  <div>
    <div className={`flex flex-col items-center content-center m-auto text-center mt-20`}>
      <Image src={`/images/logo.png`} alt={"Kiwi"} height={'70px'} width={'70px'}/>
      <span className={`text-4xl`}>Welcome to Kiwi dApp👋</span>
      <p className={`font-light`}>An app to test <code className={`bg-green-100`}>web3.js</code> and Metamask integrations.</p>
      <Wallet/>
    </div>
  </div>
)

export default IndexPage
