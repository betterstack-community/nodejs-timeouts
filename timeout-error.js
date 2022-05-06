const timersPromises = require('timers/promises');

function slowOperation() {
  // resolve in 10 seconds
  return timersPromises.setTimeout(10000);
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
  try {
    await promiseWithTimeout(slowOperation(), 2000);
    console.log('Completed slow operation');
  } catch (err) {
    if (err instanceof TimeoutError) {
      console.error('Slow operation timed out');
      return;
    }

    console.error('Failed to complete slow operation due to error:', err);
  }
})();
