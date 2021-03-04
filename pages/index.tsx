import React from 'react';
import Image from 'next/image'

const IndexPage = () => (
  <div>
    <div className={`flex flex-col items-center content-center m-auto text-center mt-20`}>
      <Image src={`/images/logo.png`} alt={"Kiwi"} height={'70px'} width={'70px'}/>
      <span className={`text-4xl`}>Welcome to Kiwi dApp👋</span>
      <p>A site to test <code className={`bg-green-100`}>web3.js</code> and Metamask wallets.</p>
    </div>
  </div>
)

export default IndexPage
