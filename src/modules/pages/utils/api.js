// @flow
import type {Slug, Page} from '../entities'

const wait = (ms:number) => new Promise(resolve => setTimeout(() => resolve(),ms))

export function fetchPage(slug:Slug):Promise<Page> {
  return wait(600)
    .then(() => dict[slug])
    .then(result => result ? result : Promise.reject(`could not find page with slug "${slug}"`))
}

const dict = {
  'page1': {
    slug: 'page1',
    content: 'page1'
  },
  'page2': {
    slug: 'page2',
    content: 'page2'
  }
}