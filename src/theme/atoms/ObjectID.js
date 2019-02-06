// @flow
import type {ComponentType} from 'react'
import styled from 'styled-components'
import {adminMode} from 'config'

type Props = {|
  children: string
|}

const ObjectID:ComponentType<Props> = styled.code.attrs({
  onClick: (e:any) => e.stopPropagation()
})`
  &:before { content: "Object-ID: "; }
  display: ${adminMode ? 'block' : 'none'};
  text-align: center;
  color: #993452;
  background: #eeeced;
  font-size: 10px;
  padding: 2px;
`

export default ObjectID