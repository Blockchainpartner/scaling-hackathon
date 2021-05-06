import React, { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import axios from "axios";
import useSWR from "swr";
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
import { hashData, modCairoPrime } from '../utils/utils';
import dynamic from "next/dynamic";
import MathIcon from "../components/icons/MathIcon";
// import OpenLogin from "@toruslabs/openlogin";

const RANDOMUSER_URI = "https://randomuser.me/api/";
const userFetcher = () => axios.get(RANDOMUSER_URI).then((res) => res.data);
const revalOptions = { revalidateOnFocus: false, revalidateOnReconnect: false };

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

function  NewUserProfile() {
	const { addToast } = useToasts();
	const accountCtx = useAccount() as AccountCtx;
	const address = accountCtx?.account?.address;
	const { data, error, mutate } = useSWR("/api/user", userFetcher, revalOptions);
	const user = data?.results[0] as UserId
	const cancelButtonRef = useRef(null);
	const [open, setOpen] = useState(true);


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
				name: `${user.name.first} ${user.name.last}`,
				nat: user.nat,
				phone: user.phone,
				cell: user.cell,
				email: user.email,
				gender: user.gender,
				disabled: true,
				picture: user.picture.thumbnail,
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

	if (error)
		return errorContent();
	if (!data)
		return loadingContent();

	return (
		<div className={`relative inset-0 ${open ? "opacity-50 filter blur-sm" : null}`}>
			<div className="flex items-center xl:items-start flex-col xl:flex-row">
				<DialogModal
					open={open}
					cancelButtonRef={cancelButtonRef}
					closeModal={() => setOpen(false)}
					title={DIALOGS["demoDisclaimer"].title}
					body={DIALOGS["demoDisclaimer"].body}
				/>
				<div className="board w-full mb-8 xl:mb-0 xl:w-3/5 relative bg-white">
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
						<code className="text-md">{address}</code>

						<div className="mt-10">
							<IdInfoItem label="Title" info={user.name.title} />
							<IdInfoItem label="Name" info={`${user.name.first} ${user.name.last}`} />
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
						{'SAVE IDENTITY'}
					</button>
					{true ? (
						<div 
							className="flex items-center mt-4 underline cursor-pointer"
							onClick={() => mutate()}>
							<MathIcon color="#1F169C" />
							<p className="underline sm text-brand ml-2">Generate another random identity</p>
						</div>)
					 : null}
				</div>
			</div>
		</div>
	)
}
function  ExistingUserProfil() {
	const { addToast, removeAllToasts } = useToasts();
	const accountCtx = useAccount() as AccountCtx;
	const user = accountCtx?.user;
	const address = accountCtx?.account?.address;

	async function validateUser() {
		addToast('Please wait for the validation (~1-2mn)', {appearance: 'info', autoDismiss: false});
		const res = await axios.post(`http://localhost:8080/user/validate/${accountCtx.user.UUID}`);
		if (res.status === 200) {
			removeAllToasts();
			addToast('Your identity is now validated !', {appearance: 'success'});
			const	_user = accountCtx.user;
			_user.isVerified = true;
			accountCtx.set_user(_user);
		} else {
			removeAllToasts();
			addToast('Impossible to process your identity', {appearance: 'error'});
		}
	}

	return (
		<div className={`relative inset-0`}>
			<div className="flex items-center xl:items-start flex-col xl:flex-row">
				<div className="board w-full mb-8 xl:mb-0 xl:w-3/5 relative bg-white">
					<div>
						<div className="flex items-center">
							<img
								src={user.KYC.picture}
								alt="Profile picture"
								className="rounded-full"
							/>
							<p className="text-3xl ml-4">{user.KYC.name}</p>
							<div className="px-2 py-0.5 rounded-3xl bg-brand text-xs text-white ml-4">
								individual
							</div>
						</div>
						<code className="text-md">{address}</code>
						
						{user.isVerified ? (
							<div className="absolute top-4 right-4">
								<VerifiedBadge />
							</div>
						) : null}

						<div className="mt-10">
							<IdInfoItem label="Title" info={user.KYC.gender === 'female' ? 'Mrs' : 'Mr'} />
							<IdInfoItem label="Name" info={user.KYC.name} />
							<IdInfoItem label="Date of birth" info={new Date(user.KYC.dob.date).toDateString()} />
							<IdInfoItem label="Nationality" info={user.KYC.nat} />
							<IdInfoItem label="Gender" info={user.KYC.gender} />
							<IdInfoItem label="Mobile" info={user.KYC.phone} />
							<IdInfoItem label="Email" info={user.KYC.email} />
							<IdInfoItem
								label="Address"
								info={`${user.KYC.location.street.number}, ${user.KYC.location.street.name}`}
							/>
							<IdInfoItem label="Postcode" info={user.KYC.location.postcode} />
							<IdInfoItem
								label="City, State"
								info={`${user.KYC.location.city}, ${user.KYC.location.state}`}
							/>
							<IdInfoItem label="Country" info={user.KYC.location.country} />
							<IdInfoItem label="Disabled" info={user.KYC.disabled ? "Yes" : "No"} />
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

					{user.isVerified ? 
						<Link href={'/proof'}>
							<button
								className={'btn-primary mt-8 py-6 w-full'}>
								{'ACCESS SHOP'}
							</button>
						</Link>
					:
						<button
							onClick={validateUser}
							className={'btn-primary mt-8 py-6 w-full'}>
							{'CONFIRM IDENTITY'}
						</button>
					}

				</div>
			</div>
		</div>
	)
}

const Identity = () => {
	const OpenLoginWindow = dynamic( () => import('../utils/openLogin'), { ssr: false } )
	const accountCtx = useAccount() as AccountCtx;

	return (
		<SidebarWrapper>
			<OpenLoginWindow />
			<ScreenTitle
				title="Identity Board"
				subTitle="You can manage your ID and KYC data through this board"
			/>
			{accountCtx.user ? <ExistingUserProfil /> : <NewUserProfile />}
		</SidebarWrapper>
	);
};

export default Identity;
