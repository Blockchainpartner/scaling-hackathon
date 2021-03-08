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

export {promisify, atFormat}