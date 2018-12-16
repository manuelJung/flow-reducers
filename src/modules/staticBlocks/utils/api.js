// @flow
import type {Identifier, StaticBlock} from '../entities'

const wait = (ms:number) => new Promise(resolve => setTimeout(() => resolve(),ms))

export function fetchBlock(identifier:Identifier):Promise<StaticBlock> {
  return wait(600)
    .then(() => dict[identifier])
    .then(result => result ? result : Promise.reject(`could not find cms with identifier "${identifier}"`))
}

const dict = {
  'sale-top': {
    identifier: 'sale-top',
    content: 'cms for sale page (top)'
  },
  'sale-bottom': {
    identifier: 'sale-bottom',
    content: 'cms for sale page (bottom)'
  }
}