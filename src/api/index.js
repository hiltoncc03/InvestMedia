import posts from '../pages/Home/index';


export default (page, perPage = 1) => {
  return new Promise((resolve, reject) => {
    const range = [page * perPage - perPage, page * perPage];
    setTimeout(() => {
      if (range[0] >= Object.keys(posts).length) {
        reject('Pagina indisponivel');
        return;
      }

      resolve(posts.slice(range[0], range[1]));
      return;
    }, (Math.random() + 0.1) * 3000);
  });
};