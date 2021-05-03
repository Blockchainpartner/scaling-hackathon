import { DialogType } from "./types";

export const DIALOGS: { [key: string]: DialogType } = {
  demoDisclaimer: {
    title: "Demo disclaimer",
    body:
      "This is a demonstrator. For the purpose of this demo (which is generating and verifying proofs using zk models), we are using a fake ID generation API. You can shuffle to generate an ID that you like. This ID will be matched to your account and Torus wallet.\n\nIn a larger scale app we would provide the user a form to enter his real info, that would be verified through a KYC proccess (which is also mocked in this context).\n",
  },
  proofGenLoading: {
    title: "Generating and verifying the proof",
    body: "A proof of your identity feature is being generated and verifying without exposing any of your personal info to the vendor."
  },
  proofGenDone: {
    title: "Proof is ready",
    body: "The proof has been generated successfully. You can now pay your booking."
  }
};
