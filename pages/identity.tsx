import React, { useRef, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Web3 from "web3";
import BN from 'bn.js';
import { useToasts } from 'react-toast-notifications';
import ScreenTitle from "../components/ScreenTitle";
import SidebarWrapper from "../components/SidebarWrapper";
import FireIcon from "../components/icons/HelpIcon";
import { AccountCtx, BackendUserID, UserId } from "../utils/types";
import VerifiedBadge from "../components/icons/VerifiedBadge";
import IdInfoItem from "../components/IdInfoItem";
import MockDoc from "../components/MockDoc";
import DialogModal from "../components/DialogModal";
import { DIALOGS } from "../utils/dialogs";
import useAccount from "../contexts/account";
import { pedersen } from '../utils/pedersen';


const RANDOMUSER_URI = "https://randomuser.me/api/";

const userFetcher = () => axios.get(RANDOMUSER_URI).then((res) => res.data);

const revalOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const errorContent = () => (
  <div className="m-auto w-full">
    <FireIcon color="#17181C" />
    <p>An error occured while generating a random user... please refresh.</p>
  </div>
);

const loadingContent = () => (
  <div className="m-auto w-full">
    <FireIcon color="#17181C" />
    <p>Loading...</p>
  </div>
);

async function hashData(_nullifier: string, _data: string, _secret: string) {
	const	data = Web3.utils.toBN(Web3.utils.toHex(_data))
	const	nullifier = Web3.utils.toBN(Web3.utils.toHex(_nullifier))
	const	secret = Web3.utils.toBN(Web3.utils.toHex(_secret))
	const	pSecret = Web3.utils.toBN(`0x${pedersen([nullifier, secret])}`)
	return `0x${pedersen([data, pSecret])}`
}
function	modCairoPrime(str: string) {
	const	prime = new BN('800000000000011000000000000000000000000000000000000000000000001', 16);
	const	value = new BN(str, 16)
	const	result = value.mod(prime)
	return result.toString(10)
}

const Identity = () => {
  const accountCtx = useAccount() as AccountCtx;
  const { addToast, removeAllToasts } = useToasts();
  const { data, error } = useSWR("/api/user", userFetcher, revalOptions);
  const user = data?.results[0] as UserId;

  const [verified] = useState(false);

  // Modal Management
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  function closeModal() {
    setOpen(false);
  }
  function openModal() {
    setOpen(true);
  }

  async function addUser() {
    const {data: registries} = await axios.get(`http://localhost:8080/registries`)

    const registry0 = await hashData(registries[0], accountCtx?.account?.address, modCairoPrime(accountCtx?.account?.privateKey))
    const registry1 = await hashData(registries[1], accountCtx?.account?.address, modCairoPrime(accountCtx?.account?.privateKey))
    const registry2 = await hashData(registries[2], accountCtx?.account?.address, modCairoPrime(accountCtx?.account?.privateKey))
    const newUser = {
      UUID: user.login.uuid,
      password: user.login.sha256,
      isVerified: false,
      KYC: {
        name: user.name.first,
        nat: user.nat,
        phone: user.phone,
        cell: user.cell,
        email: user.email,
        gender: user.gender,
        disabled: true,
        dob: {
          date: user.dob.date,
          age: user.dob.age
        },
        location: {
          city: user.location.city,
          country: user.location.country,
          postcode: String(user.location.postcode),
          state: user.location.state,
          street: {
            name: user.location.street.name,            
            number: user.location.street.number            
          }
        }
      }
    } as BackendUserID

    const res = await axios.post(`http://localhost:8080/user/add`, {
      ...newUser,
      registries: [
        {key: registries[0], secret: registry0},
        {key: registries[1], secret: registry1},
        {key: registries[2], secret: registry2}
      ]
    });
    if (res.status === 200) {
      addToast('New identity added. Validation needed', {appearance: 'success'});
      accountCtx.set_user(newUser)
    } else {
      addToast('Impossible to process your identity', {appearance: 'error'});
    }
  }

  async function validateUser() {
    addToast('Please wait for the validation (~1-2mn)', {appearance: 'info', autoDismiss: false});
    const res = await axios.post(`http://localhost:8080/user/validate/${accountCtx.user.UUID}`);
    if (res.status === 200) {
      removeAllToasts();
      addToast('Your identity is now validated !', {appearance: 'success'});
    } else {
      removeAllToasts();
      addToast('Impossible to process your identity', {appearance: 'error'});
    }
  }

  return (
    <SidebarWrapper>
      <ScreenTitle
        title="Identity Board"
        subTitle="You can manage your ID and KYC data through this board"
      />
      {error ? errorContent() : null}
      {!data ? loadingContent() : null}
      {data ? (
        <div
          className={`relative inset-0 ${
            open ? "opacity-50 filter blur-sm" : null
          }`}
        >
          <DialogModal
            open={open}
            cancelButtonRef={cancelButtonRef}
            closeModal={closeModal}
            title={DIALOGS["demoDisclaimer"].title}
            body={DIALOGS["demoDisclaimer"].body}
          />
          <div className="flex items-center xl:items-start flex-col xl:flex-row">
            <div className="board w-full mb-8 xl:mb-0 xl:w-3/5 relative">
              <div>
                <div className="flex items-center">
                  <img
                    src={user.picture.thumbnail}
                    alt="Profile picture"
                    className="rounded-full"
                  />
                  <p className="text-3xl ml-4">{`${user.name.first} ${user.name.last}`}</p>
                  <div className="px-2 py-0.5 rounded-3xl bg-brand text-xs text-white ml-4">
                    individual
                  </div>
                </div>
                <code className="text-md">{accountCtx?.account?.address}</code>

                {verified ? (
                  <div className="absolute top-4 right-4">
                    <VerifiedBadge />
                  </div>
                ) : null}

                <div className="mt-10">
                  <IdInfoItem label="Title" info={user.name.title} />
                  <IdInfoItem label="First name" info={user.name.first} />
                  <IdInfoItem label="Last name" info={user.name.last} />
                  <IdInfoItem
                    label="Date of birth"
                    info={new Date(user.dob.date).toDateString()}
                  />
                  <IdInfoItem label="Nationality" info={user.nat} />
                  <IdInfoItem label="Gender" info={user.gender} />
                  <IdInfoItem label="Mobile" info={user.phone} />
                  <IdInfoItem label="Email" info={user.email} />
                  <IdInfoItem
                    label="Address"
                    info={`${user.location.street.number}, ${user.location.street.name}`}
                  />
                  <IdInfoItem label="Postcode" info={user.location.postcode} />
                  <IdInfoItem
                    label="City, State"
                    info={`${user.location.city}, ${user.location.state}`}
                  />
                  <IdInfoItem label="Country" info={user.location.country} />
                </div>
              </div>
            </div>

            <div className="flex-grow flex flex-col justify-between w-full xl:w-min xl:ml-8">
              <div className="board h-5/6">
                <p className="text-2xl mb-4">Files and documents</p>
                <MockDoc filename="passport.pdf" size="2.1Mb" />
                <MockDoc filename="disabilty_certificate.pdf" size="4.3Mb" />
                <MockDoc filename="IdCard.png" size="0.4Mb" />
              </div>
              <button
                onClick={addUser}
                className="btn-primary mt-8 py-6 w-full">
                {'VERIFY & SAVE IDENTITY'}
              </button>

              <button
                onClick={() => accountCtx.user == undefined ? null : validateUser()}
                disabled={accountCtx.user == undefined}
                className={`mt-2 py-2 w-full text-sm font-sans rounded-md ${accountCtx.user == undefined ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-success text-gray-700 hover:text-white'}`}>
                {'CONFIRM IDENTITY'}
              </button>

            </div>
          </div>
        </div>
      ) : null}
    </SidebarWrapper>
  );
};

export default Identity;
