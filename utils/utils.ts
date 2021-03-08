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

export {promisify}