/******************************************************************************
**	@Author:				Thomas Bouder <Tbouder>
**	@Email:					Tbouder@protonmail.com
**	@Date:					Friday January 22nd 2021
**	@Filename:				useUI.js
******************************************************************************/

import	{useState, useContext, createContext, useEffect}	from	'react';
import { AccountCtx, BackendUserID } from '../utils/types';
import	{ethers} from 'ethers';
import OpenLogin from '@toruslabs/openlogin';

const	Account = createContext(undefined as any);
export const AccountApp = (props: any) => {
	const	[account, set_account] = useState<ethers.Wallet>();
	const	[openLogin, set_openLogin] = useState<OpenLogin>();
	const	[user, set_user] = useState<BackendUserID>();

	useEffect(() => {
		console.dir(openLogin)
		if (openLogin && openLogin?.privKey) {
			const	_account = new ethers.Wallet(openLogin.privKey);
			set_account(_account)
		}
	}, [openLogin])

	return (
		<Account.Provider
			children={props.children}
			value={{
				account,
				user, set_user,
				openLogin, set_openLogin
			} as AccountCtx} />
	)
}

export const useAccount = () => useContext(Account)
export default useAccount;
