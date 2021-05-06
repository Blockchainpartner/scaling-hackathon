/******************************************************************************
 **	@Author:				Thomas Bouder <Tbouder>
 **	@Email:					Tbouder@protonmail.com
 **	@Date:					Tuesday April 27th 2021
 **	@Filename:				🔮.js
 ******************************************************************************/

import React, { FC } from "react";
import Head from "next/head";
import Web3 from "web3";
import axios from "axios";
import { pedersen } from "../utils/pedersen";

const IndexPage: FC = () => {
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

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div
            onClick={() => {
              const outputs = [
                "1",
                "-307539572955118350718880860395119943660313796352848841712661292173759557171",
              ];
              const program_hash =
                "5f0920fb1bcc1ec41d1aa2b2524fe3f08e0ac0d08d751d5b10985ae600d770d";
              const program_output = Web3.utils.soliditySha3(...outputs);
              const cairoFact = Web3.utils.soliditySha3(
                program_hash,
                program_output
              );
              console.log(cairoFact);

              const outputHash = Web3.utils.isBN(
                "-1397522753299492751557547967820826962898231398543673030347416450104778351221"
              );
              console.log(outputHash);
            }}
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 w-full"
          >
            <h3 className="text-2xl font-bold">Retrieve Cairo fact &rarr;</h3>
            <p className="mt-4 text-xl">
              Perform the `soliditySha3(programHash, programOuput)` function to
              get the Cairo Fact
            </p>
          </div>

          <div
            onClick={async () => {
              console.log(
                Web3.utils.toBN(Web3.utils.toHex("Thomas")).toString()
              );
              console.log(
                Web3.utils.toBN(Web3.utils.toHex("Maxime")).toString()
              );
              console.log(
                Web3.utils.toBN(Web3.utils.toHex("Wassim")).toString()
              );
            }}
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 w-full"
          >
            <h3 className="text-2xl font-bold">Name as Int &rarr;</h3>
            <p className="mt-4 text-xl">
              Get the Int value for Thomas, Maxime, Wassim
            </p>
          </div>

          <div
            onClick={async () => {
              console.log(
                Web3.utils
                  .toBN(Web3.utils.toHex("39xq5&!CeXk6LrsRoEBxxsY776"))
                  .toString()
              );
              console.log(
                Web3.utils
                  .toBN(Web3.utils.toHex("SQ7XK#jp&9Tkcm5rccY#eaFYGBSNEe4"))
                  .toString()
              );
              console.log(
                Web3.utils
                  .toBN(Web3.utils.toHex("9@#96$3779?93&#6#@3$9!@5#5??66#"))
                  .toString()
              );
            }}
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 w-full"
          >
            <h3 className="text-2xl font-bold">Secret as Int &rarr;</h3>
            <p className="mt-4 text-xl">
              Generate the Int for 3 specific secrets
            </p>
          </div>

          <div
            onClick={async () => {
              console.log(
                `0x${pedersen([
                  Web3.utils.toBN(Web3.utils.toHex("Thomas")),
                  Web3.utils.toBN(
                    Web3.utils.toHex("39xq5&!CeXk6LrsRoEBxxsY776")
                  ),
                ])}`
              );

              console.log(
                `0x${pedersen([
                  Web3.utils.toBN(Web3.utils.toHex("Maxime")),
                  Web3.utils.toBN(
                    Web3.utils.toHex("SQ7XK#jp&9Tkcm5rccY#eaFYGBSNEe4")
                  ),
                ])}`
              );

              console.log(
                `0x${pedersen([
                  Web3.utils.toBN(Web3.utils.toHex("Wassim")),
                  Web3.utils.toBN(
                    Web3.utils.toHex("9@#96$3779?93&#6#@3$9!@5#5??66#")
                  ),
                ])}`
              );

              const outputHash =
                "-307539572955118350718880860395119943660313796352848841712661292173759557171";
              let itsemimario = Web3.utils.toBN(outputHash);
              itsemimario = itsemimario.add(
                Web3.utils.toBN(2).pow(Web3.utils.toBN(251))
              );
              itsemimario = itsemimario.add(
                Web3.utils
                  .toBN(17)
                  .mul(Web3.utils.toBN(2).pow(Web3.utils.toBN(192)))
              );
              itsemimario = itsemimario.add(Web3.utils.toBN(1));
              console.warn(itsemimario.toString(16));
            }}
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 w-full"
          >
            <h3 className="text-2xl font-bold">Registry Hash &rarr;</h3>
            <p className="mt-4 text-xl">
              Generate the final hash for the registry
            </p>
          </div>

          <div
            onClick={async () => {
              const res = await axios.post("/api", {
                secret:
                  "101152944081768961028299795000875165791532754706696033127263999267930781219",
                missa: "0x2854a6d2c60e46b2f176659ccbffdddc3db9e2d1",
                registry: {
                  "0x99024878Cbd7eea4661F5E49A22BB9410c847a74": {
                    name:
                      "0x3a646bedfb4112756bc037772a80537f92a6f54865ee75fedc132ce7f3be535",
                  },
                  "0x4cb42f213ed6dcfadb7b987fd31b2260334cbe40": {
                    name:
                      "0x69ee2a6ff62a0ef669cd3f7248c782f82a267c23765ad670b7f288996375ed",
                  },
                  "0x2854a6d2c60e46b2f176659ccbffdddc3db9e2d1": {
                    name:
                      "0x30d42826e0b944b9db59a44222b3b92743801f20bcf0c210acd83715c1cf2c0",
                  },
                },
                passengers: [
                  "85081027341669",
                  "96076060387693",
                  "92807522771315",
                ],
              });

              alert(res.data);
            }}
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 w-full"
          >
            <h3 className="text-2xl font-bold">Test Cairo Program 🔮 &rarr;</h3>
            <p className="mt-4 text-xl">Call the API with a specific input</p>
          </div>
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
