const timersPromises = require('timers/promises');

function slowOperation() {
  const ac = new AbortController();
  return {
    exec: () => timersPromises.setTimeout(10000, null, { signal: ac.signal }),
    cancel: () => ac.abort(),
  };
}

class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

function promiseWithTimeout(promiseArg, timeoutMS) {
  const timeoutPromise = new Promise((resolve, reject) =>
    setTimeout(
      () => reject(new TimeoutError(`Timed out after ${timeoutMS} ms.`)),
      timeoutMS
    )
  );

  return Promise.race([promiseArg, timeoutPromise]);
}

(async function doSomethingAsync() {
  const slowOps = slowOperation();
  try {
    await promiseWithTimeout(slowOps.exec(), 2000);
    console.log('Completed slow operation');
  } catch (err) {
    if (err instanceof TimeoutError) {
      slowOps.cancel();
      console.error('Slow operation timed out');
      return;
    }

    console.error('Failed to complete slow operation due to error:', err);
  }
})();
