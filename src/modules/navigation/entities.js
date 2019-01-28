// @flow

export type CategoryPath = string

export type Category = {
  id: string,
  label: string,
  link: CategoryPath,
  category: string,
  searchQueryString: string,
  type: 'submenu' | 'default',
  subItems: CategoryPath[]
}

export type Context = {
  name: string,
  internalDescription: string,
  seoTitle: string,
  metaDescription: string,
  metaRobotsNoindex: string,
  canonicalUrl: string,
  seoText1: string,
  seoText2: string,
  seoText3: string,
  hideProducts: string,
  searchQueryString: string,
  story: mixed,
  useStory: boolean,
  womanmenunisex: string,
  assignedLevel1Category: string,
  xyx: string,
  categoryImageUrl: string,
  categoryImage: string,
  featuredInDropdownMenu: boolean,
  productSearchQueries: string,
  assignedLevel2Category: string,
  topCategory: string,
  categoryLevel: string,
  assignedLevel3Category: string,
  type: string,
  menuItems: string,
  title: string,
  url: string,
  dropdownContent: string,
  page: string,
  magazineArticle: string,
  magazineCategory: string,
  productCategoryL1: string,
  productCategoryL2: string,
  productCategoryL3: string,
  _id: string,
  contentType: string,
  createdAt: string,
  updatedAt: string,
  parentId: string,
  objectID: string
}