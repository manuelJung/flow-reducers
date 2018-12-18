// @flow

export type SearchKey = string

export type FilterKey = 'brand' | 'color' | 'shop' | 'size'

export type FilterValue = string

export type Product = {
  imageMediumURL: string,
  productPrice: number,
  productPriceOld?: number,
  productName: string,
  merchantName: string,
  isOnSale: boolean,
  salePercentage: number,
  deliveryTime: string,
  groupedId?: string
}