// @flow
import React from 'react'
import type {Node, Component} from 'react'
import { injectIntl } from 'react-intl'

type Intl = {
  formatMessage: (
    {id:string},
    values: {[key:string]: string}
  ) => string
}

type Props = {| 
  children: (intl:Intl) => Node 
|} | {| 
  id: string, 
  values?: {[key:string]: string} 
|}

const IntlComponent:Component<Props> = injectIntl(function Intl(props:{...Props, intl:Intl}){
  if(props.children) return props.children(props.intl)
  return props.intl.formatMessage({id: props.id}, props.values)
})

export default IntlComponent