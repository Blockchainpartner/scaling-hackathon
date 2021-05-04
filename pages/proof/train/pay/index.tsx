import React, { FC, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import DialogModal from "../../../../components/DialogModal";
import InfoIcon from "../../../../components/icons/InfoIcon";
import MockTrainInfo from "../../../../components/MockTrainInfo";
import ScreenTitle from "../../../../components/ScreenTitle";
import SidebarWrapper from "../../../../components/SidebarWrapper";
import TravelPayment from "../../../../components/TravelPayment";
import { DIALOGS } from "../../../../utils/dialogs";

const PayScreen: FC = () => {
  const router = useRouter();

  //TODO: Integrate from context
  const contextData = {
    price: 88,
    reduction: "disability",
  };

  const { price, reduction } = contextData;

  const disabledBook = false;

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const pay = () => {
    setOpen(true);
  };

  return (
    <SidebarWrapper>
      <div
        className={`relative inset-0 ${
          open ? "opacity-50 filter blur-sm" : null
        }`}
      >
        <DialogModal
          open={open}
          cancelButtonRef={cancelButtonRef}
          closeModal={closeModal}
          title={DIALOGS.paymentSuccess.title}
          body={DIALOGS.paymentSuccess.body}
        />
        <ScreenTitle
          title="Train tickets"
          subTitle="Book a train ticket and get a discounted price with the generate proof"
          hasBack
        />
        <div>
          <MockTrainInfo />
          {/* <TravellerInfo /> */}
          <div className="board border-2 border-brand w-1/5 p-3 mt-8">
            <p className="font-semibold text-lg">
              {reduction === "young"
                ? "12-27 yo reduced fare"
                : "Disability reduced fare"}
            </p>
          </div>
          <div className="flex items-center mt-6">
            <InfoIcon color="black" />
            <p className="text-sm ml-2">
              This proof has been generated and lets the vendor know you are
              disabled without revealing more info about your ID.
            </p>
          </div>
        </div>
        <TravelPayment />
        <div className="mt-8 w-full flex flex-col items-center justify-center">
          <button
            disabled={disabledBook}
            className="btn-primary w-1/6 h-12"
            onClick={pay}
          >{`PAY - ${price.toFixed(2)}€`}</button>
          {disabledBook ? (
            <p className="text-xs mt-4">Waiting for proof generation...</p>
          ) : null}
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default PayScreen;
