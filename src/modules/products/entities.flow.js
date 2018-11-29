// @flow

export type ProductNumber = string

export type ProductId = string

export type Ordernumber = string

export type Number = ProductNumber | Ordernumber

export type FilterKey = 'color' | 'brand' | 'variant' | 'style'

export type FilterType = 'EMPTY' | 'DROPDOWN' | 'TEXT' | 'IMAGE'

export type FilterValue = {
  label: string,
  image?:string
}

export type FilterOption = {
  value: FilterValue,
  selectable: boolean,
  sale: boolean
}

export type Filter = {
  value: FilterValue | null,
  options: FilterOption[],
  key: FilterKey,
  type: FilterType,
  productId: string
}

export type Article = {
  ordernumber: string,
  filterValues: {[filterKey:FilterKey]: FilterValue},
  productNumber: string
}