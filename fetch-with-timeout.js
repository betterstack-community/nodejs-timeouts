async function fetchWithTimeout(resource, options = {}) {
  const { timeoutMS = 3000 } = options;

  const response = await fetch(resource, {
    ...options,
    signal: AbortSignal.timeout(timeoutMS),
  });

  return response;
}

(async function getDadJoke() {
  try {
    const response = await fetchWithTimeout('https://icanhazdadjoke.com', {
      headers: {
        Accept: 'application/json',
      },
    });

    const json = await response.json();
    console.log(json);
  } catch (err) {
    console.error(err);
  }
})();
