/////////////////////////////////////////////////////////////////////////////////
// Copyright 2019 StarkWare Industries Ltd.                                    //
//                                                                             //
// Licensed under the Apache License, Version 2.0 (the "License").             //
// You may not use this file except in compliance with the License.            //
// You may obtain a copy of the License at                                     //
//                                                                             //
// https://www.starkware.co/open-source-license/                               //
//                                                                             //
// Unless required by applicable law or agreed to in writing,                  //
// software distributed under the License is distributed on an "AS IS" BASIS,  //
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.    //
// See the License for the specific language governing permissions             //
// and limitations under the License.                                          //
/////////////////////////////////////////////////////////////////////////////////

import BN from "bn.js";
import hash from "hash.js";
import { curves as eCurves, ec as EllipticCurve } from "elliptic";
import assert from "assert";
import constantPointsHex from "./constant_points.json";

// Equals 2**251 + 17 * 2**192 + 1.
const prime = new BN(
  "800000000000011000000000000000000000000000000000000000000000001",
  16
);
// Equals 2**251. This value limits msgHash and the signature parts.
const maxEcdsaVal = new BN(
  "800000000000000000000000000000000000000000000000000000000000000",
  16
);

// Generate BN of used constants.
const zeroBn = new BN("0", 16);
const oneBn = new BN("1", 16);

// Create a curve with stark curve parameters.
const starkEc = new EllipticCurve(
  new eCurves.PresetCurve({
    type: "short",
    prime: null,
    p: prime,
    a:
      "00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000001",
    b:
      "06f21413 efbe40de 150e596d 72f7a8c5 609ad26c 15c915c1 f4cdfcb9 9cee9e89",
    n:
      "08000000 00000010 ffffffff ffffffff b781126d cae7b232 1e66a241 adc64d2f",
    hash: hash.sha256,
    gRed: false,
    g: constantPointsHex[1],
  })
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const constantPoints = constantPointsHex.map((coords: any[]) =>
  starkEc.curve.point(new BN(coords[0], 16), new BN(coords[1], 16))
);
const shiftPoint = constantPoints[0];

/*
 Full specification of the hash function can be found here:
   https://starkware.co/starkex/docs/signatures.html#pedersen-hash-function
 shiftPoint was added for technical reasons to make sure the zero point on the elliptic curve does
 not appear during the computation. constantPoints are multiples by powers of 2 of the constant
 points defined in the documentation.
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pedersen(input: string | any[]) {
  let point = shiftPoint;
  for (let i = 0; i < input.length; i++) {
    let x = new BN(input[i], 16);
    assert(x.gte(zeroBn) && x.lt(prime), "Invalid input: " + input[i]);
    for (let j = 0; j < 252; j++) {
      const pt = constantPoints[2 + i * 252 + j];
      assert(!point.getX().eq(pt.getX()));
      if (x.and(oneBn).toNumber() !== 0) {
        point = point.add(pt);
      }
      x = x.shrn(1);
    }
  }
  return point.getX().toString(16);
}

module.exports = {
  prime,
  ec: starkEc,
  constantPoints,
  shiftPoint,
  maxEcdsaVal, // Data.
  pedersen, // Function.
};
