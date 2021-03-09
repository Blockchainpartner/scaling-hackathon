const promisify = (inner: any) =>
  new Promise((resolve, reject) =>
    inner((err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  );

const atFormat = (str: string, n: number) => {
  return (str.length > n) ? str.substr(0, n+1) + '....' + str.substr(str.length-n+1, str.length) : str;
};

const	ERC20_JSON = [{"constant": true,"inputs": [{"name": "_owner","type": "address"}],"name": "balanceOf","outputs": [{"name": "balance","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "src","type": "address"}, {"indexed": true,"internalType": "address","name": "dst","type": "address"}, {"indexed": false,"internalType": "uint256","name": "wad","type": "uint256"}],"name": "Transfer","type": "event"}];
async function checkERC20Amount(web3: any, userAddress: string, erc20Address: string) {
  const	erc20Json = new web3.eth.Contract(ERC20_JSON, erc20Address);
  const	balanceRightNow = await erc20Json.methods.balanceOf(userAddress).call().then((e: any) => e);
  return web3.utils.fromWei(balanceRightNow);
}

const wbtcAdd = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
const usdcAdd = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';

export {promisify, atFormat, checkERC20Amount, wbtcAdd, usdcAdd}