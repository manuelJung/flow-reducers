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
  imageMediumURL: string,
  productPrice: number,
  productPriceOld?: number,
  productName: string,
  merchantName: string,
  isOnSale: boolean,
  salePercentage: number,
  deliveryTime: string,
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
  price: [number,number] | null,
  context: string
|}