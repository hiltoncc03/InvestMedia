import posts from './posts.json';

export default (page, perPage = 1) => {
  return new Promise((resolve, reject) => {
    const range = [page * perPage - perPage, page * perPage];
    setTimeout(() => {
      if (range[0] >= posts.length) {
        reject('Pagina indisponivel');
        return;
      }

      resolve(posts.slice(range[0], range[1]));
      return;
    }, (Math.random() + 0.1) * 3000);
  });
};