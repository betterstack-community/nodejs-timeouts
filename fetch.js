(async function getDadJoke() {
  try {
    const response = await fetch('https://icanhazdadjoke.com', {
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
