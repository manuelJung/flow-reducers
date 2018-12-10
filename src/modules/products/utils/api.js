

export function fetchProduct(number){
  return fetch('http://localhost:3001/container/'+number)
    .then(res => res.json())
    .then(productNumber => fetch('http://localhost:3001/variants/'+productNumber))
    .then(res => res.json())
    .then(result => result.articles)
}