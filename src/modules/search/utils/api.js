// @flow
import type {Product} from '../entities'

export type SearchResult = {
  hits: Product[],
  page: number,
  exhaustiveNBHits:boolean,
  exhausitve:boolean,
  numPages:number,
  numHits:number,
  tags:string[],
  colorOptions:string[],
  sizeOptions:string[],
  brandOptions:string[],
  shopOptions:string[],
  categories:mixed[],
  maxPrice:number,
  minPrice:number
}

// import type {Identifier, StaticBlock} from '../entities'

// const wait = (ms:number) => new Promise(resolve => setTimeout(() => resolve(),ms))

// export function fetchBlock(identifier:Identifier):Promise<StaticBlock> {
//   return wait(6000)
//     .then(() => dict[identifier])
//     .then(result => result ? result : Promise.reject(`could not find cms with identifier "${identifier}"`))
// }

// const dict = {
//   'sale-top': {
//     identifier: 'sale-top',
//     content: 'cms for sale page (top)'
//   },
//   'sale-bottom': {
//     identifier: 'sale-bottom',
//     content: 'cms for sale page (bottom)'
//   }
// }