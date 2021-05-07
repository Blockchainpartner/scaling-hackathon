import React, { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import DialogModal from "../../../../components/DialogModal";
import InfoIcon from "../../../../components/icons/InfoIcon";
import MockTrainInfo from "../../../../components/MockTrainInfo";
import ScreenTitle from "../../../../components/ScreenTitle";
import SidebarWrapper from "../../../../components/SidebarWrapper";
import TravelReductions from "../../../../components/TravelReductions";
import { DIALOGS } from "../../../../utils/dialogs";
import ProofVerificationContent from "../../../../components/ProofVerificationContent";

const BookingScreen: FC = () => {
  const router = useRouter();
  const [price, setPrice] = useState(112);
  const [proof] = useState(true);
  const [generatingProof, setGeneratingProof] = useState(false);
  const [proofGenerated, setProofGenerated] = useState(false);
  const [proofFailed, setProofFailed] = useState(false);
  const [proofStatus, setProofStatus] = useState<string | undefined>();

  const generateProof = (success?: string, error?: string) => {
    if (!generatingProof) {
      setGeneratingProof(true);
    }
    if (success && success?.length > 0) {
      setProofGenerated(true);
      setProofStatus(success);
    }
    if (error && error?.length > 0) {
      setProofFailed(true);
      setProofStatus(error);
    }
  };

  const cancelButtonRef = useRef(null);
  const closeModal = () => {
    if (proofGenerated || proofFailed) {
      setGeneratingProof(false);
      setProofGenerated(false);
      setProofFailed(false);
      setProofStatus(undefined);
    }
  };

  const [reductions] = useState<{ [key: string]: boolean }>({
    disability: false,
    young: false,
  });

  useEffect(() => {
    if (reductions.disability) {
      setPrice(88);
    } else if (reductions.young) {
      setPrice(97);
    } else {
      setPrice(112);
    }
  }, [reductions]);

  const book = () => router.push("/proof/train/pay");

  const disabledBook =
    (reductions.disability || reductions.young) && proof === undefined;

  return (
    <SidebarWrapper>
      <div
        className={`relative inset-0 ${
          generatingProof ? "opacity-50 filter blur-sm" : null
        }`}
      >
        <DialogModal
          open={generatingProof}
          cancelButtonRef={cancelButtonRef}
          closeModal={closeModal}
          title={
            generatingProof
              ? DIALOGS.proofGenLoading.title
              : proofGenerated
              ? DIALOGS.proofGenDone.title
              : ""
          }
          body={
            generatingProof
              ? DIALOGS.proofGenLoading.body
              : proofGenerated
              ? DIALOGS.proofGenDone.body
              : ""
          }
          content={
            proofFailed ? (
              <ProofVerificationContent
                error={proofFailed ? proofStatus : undefined}
              />
            ) : proofGenerated ? (
              <ProofVerificationContent
                success={proofGenerated ? proofStatus : undefined}
              />
            ) : (
              <ProofVerificationContent />
            )
          }
        />
        <ScreenTitle
          title="Train tickets"
          subTitle="Book a train ticket and get a discounted price with the generate proof"
          hasBack
        />
        <div>
          <MockTrainInfo />
          {/* <TravellerInfo /> */}
          <TravelReductions generateProof={generateProof} />
          <div className="flex items-center mt-6">
            <InfoIcon color="black" />
            <p className="text-sm ml-2">
              Before payment a proof of your situation will be generated based
              on your identification
            </p>
          </div>
        </div>
        <div className="mt-8 w-full flex flex-col items-center justify-center">
          <button
            disabled={disabledBook}
            className="btn-primary w-1/6"
            onClick={book}
          >{`BOOK - ${price.toFixed(2)}€`}</button>
          {disabledBook ? (
            <p className="text-xs mt-4">Waiting for proof generation...</p>
          ) : null}
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default BookingScreen;
