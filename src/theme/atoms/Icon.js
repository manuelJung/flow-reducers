// @flow
import type {Component} from 'react'
import styled from 'styled-components'

type Props = {|
  icon: string
|}

export const Icon:Component<Props> = styled.i.attrs({
  className: props => `fa fa-${props.icon} Icon`
})``

export default Icon