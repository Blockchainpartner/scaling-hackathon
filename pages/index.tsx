import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const IndexPage = () => {
  const DynamicComponentWithNoSSR = dynamic(
    // @ts-ignore
    () => import("../components/Torus.tsx"),
    { ssr: false }
  );

  console.log(DynamicComponentWithNoSSR);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            ScalingETH!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Sandbox to test{" "}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            Torus
          </code>
        </p>

        <div className="my-8">
          <DynamicComponentWithNoSSR />
        </div>

      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
};

export default IndexPage;
