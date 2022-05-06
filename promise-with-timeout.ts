function promiseWithTimeout<T>(
  promiseArg: Promise<T>,
  timeoutMS: number
): Promise<T> {
  let timeout: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((resolve, reject) => {
    timeout = setTimeout(() => {
      reject(new TimeoutError(`Timed out after ${timeoutMS} ms.`));
    }, timeoutMS);
  });

  return Promise.race([promiseArg, timeoutPromise]).finally(() =>
    clearTimeout(timeout)
  );
}
