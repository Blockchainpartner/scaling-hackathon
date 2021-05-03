import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import DialogModal from "../../../../components/DialogModal";
import CheckIcon from "../../../../components/icons/CheckIcon";
import InfoIcon from "../../../../components/icons/InfoIcon";
import MockTrainInfo from "../../../../components/MockTrainInfo";
import ScreenTitle from "../../../../components/ScreenTitle";
import SidebarWrapper from "../../../../components/SidebarWrapper";
import TravellerInfo from "../../../../components/TravellerInfo";
import TravelReductions from "../../../../components/TravelReductions";
import { DIALOGS } from "../../../../utils/dialogs";

const bbb: FC = () => {
  const [price, setPrice] = useState(112);

  //TODO: Integrate proof
  const [proof] = useState(true);
  const [generatingProof, setGeneratingProof] = useState(false);
  const [proofGenerated, setProofGenerated] = useState(false);

  //TODO: Integrate proof generation
  const generateProof = () => {
    setGeneratingProof(true);
    // TODO: Remove loader mocking
    setTimeout(() => {
      setGeneratingProof(false);
      setProofGenerated(true);
    }, 4000);
  };

  const cancelButtonRef = useRef(null);
  const closeModal = () => {
    if (proofGenerated) setProofGenerated(false);
  };

  const [reductions, setReductions] = useState<{ [key: string]: boolean }>({
    disability: false,
    young: false,
  });

  const updateReductions = (e: ChangeEvent<HTMLInputElement>) => {
    const tg = e.target;
    const name = tg.name;
    const value = tg.checked;
    setReductions({ ...reductions, [name]: value });
  };

  useEffect(() => {
    if (reductions.disability) {
      setPrice(88);
      generateProof();
    } else if (reductions.young) {
      setPrice(97);
      generateProof();
    } else {
      setPrice(112);
    }
  }, [reductions]);

  const disabledBook =
    (reductions.disability || reductions.young) && proof === undefined;

  return (
    <SidebarWrapper>
      <div
        className={`relative inset-0 ${
          generatingProof || proofGenerated ? "opacity-50 filter blur-sm" : null
        }`}
      >
        <DialogModal
          open={generatingProof || proofGenerated}
          cancelButtonRef={cancelButtonRef}
          closeModal={closeModal}
          title={
            generatingProof
              ? DIALOGS.proofGenLoading.title
              : DIALOGS.proofGenDone.title
          }
          body={
            generatingProof
              ? DIALOGS.proofGenLoading.body
              : DIALOGS.proofGenDone.body
          }
          content={
            generatingProof ? (
              <div className="donutSpinner" />
            ) : (
              <CheckIcon color="#0CAB2C" />
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
          <TravelReductions
            reductions={reductions}
            updateReductions={updateReductions}
          />
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
          >{`BOOK - ${price.toFixed(2)}€`}</button>
          {disabledBook ? (
            <p className="text-xs mt-4">Waiting for proof generation...</p>
          ) : null}
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default bbb;