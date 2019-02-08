// @flow

export type ListIdentifier = string

export type ProductIdentifier = string

export type FilterKey = 'brand' | 'color' | 'shop' | 'size'

export type FilterValue = string

export type FilterOption = FilterValue

export type Filter = {
  key: FilterKey,
  value: FilterValue[],
  options: FilterOption[],
  identifier: ListIdentifier
}

export type CategoryOption = {
  name: string,
  selected: boolean,
  options: CategoryOption[]
}

export type Product = {
  _tags: string[],
  deliveryTime: string,
  imageMediumURL: string,
  isOnSale: boolean,
  merchantName: string,
  productColor: string,
  productManufacturerBrand: string,
  productName: string,
  productPrice: number,
  productPriceOld?: number,
  salePercentage: number,
  shippingAndHandling: string,
  wunderSizes: string[],
  groupedId?: string,
  objectID: ProductIdentifier
}

export type FilterValues = {|
  page: number,
  query: string,
  tags: string[],
  color: string[],
  brand: string[],
  size: string[],
  shop: string[],
  category: string,
  price: any, //null | [number,number],
  context: string
|}