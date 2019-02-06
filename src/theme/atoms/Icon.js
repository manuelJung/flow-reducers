// @flow
import type {ComponentType} from 'react'
import styled from 'styled-components'

type Props = {|
  icon: string
|}

export const Icon:ComponentType<Props> = styled.i.attrs({
  className: props => `fa fa-${props.icon} Icon`
})``

export default Icon