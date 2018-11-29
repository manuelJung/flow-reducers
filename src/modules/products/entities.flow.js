// @flow

export type ProductNumber = string

export type ProductId = string

export type Ordernumber = string

export type Number = ProductNumber | Ordernumber

export type FilterKey = 'color' | 'brand' | 'variant' | 'style'

export type FilterType = 'EMPTY' | 'DROPDOWN' | 'TEXT' | 'IMAGE'

export type FilterValues = {[filterKey:FilterKey]: FilterValue}

export type FilterValue = {
  label: string,
  image?:string
} | null

export type FilterOption = {
  value: FilterValue,
  selectable: boolean,
  sale: boolean
}

export type Filter = {
  value: FilterValue,
  options: FilterOption[],
  key: FilterKey,
  type: FilterType,
  productId: ProductId
}

export type Article = {
  ordernumber: Ordernumber,
  filterValues: FilterValues,
  productNumber: ProductNumber
}