const timersPromises = require('timers/promises');

function slowOperation() {
  // resolve in 10 seconds
  return timersPromises.setTimeout(10000);
}

function promiseWithTimeout(promiseArg, timeoutMS) {
  const timeoutPromise = new Promise((resolve, reject) =>
    setTimeout(() => reject(`Timed out after ${timeoutMS} ms.`), timeoutMS)
  );

  return Promise.race([promiseArg, timeoutPromise]);
}

(async function doSomethingAsync() {
  try {
    await promiseWithTimeout(slowOperation(), 2000);
    console.log('Completed slow operation in 10 seconds');
  } catch (err) {
    console.error('Failed to complete slow operation due to error:', err);
  }
})();
