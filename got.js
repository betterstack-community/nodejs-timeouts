const got = require('got');

(async function getPosts() {
  try {
    const data = await got('https://jsonplaceholder.typicode.com/posts', {
      headers: {
        Accept: 'application/json',
      },
      timeout: {
        request: 2000,
      },
    }).json();

    console.log(data);
  } catch (err) {
    console.error(err);
  }
})();
