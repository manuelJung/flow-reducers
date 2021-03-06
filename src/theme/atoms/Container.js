// @flow
import type {ComponentType, Node} from 'react'
import styled from 'styled-components'
// import {ms} from 'theme'

const ms = {
	MOBILE_M: 0,
  MOBILE_L: 375,
  TABLET: 525,
  LAPTOP: 768,
  LAPTOP_L: 990,
  LAPTOP_XL: 1200,
  CONTAINER_S: 690,
  CONTAINER: 910,
  CONTAINER_L: 1110
}

type Props = {|
  children: Node,
  className?: string
|}

const Container:ComponentType<Props> = styled.div`
  margin: 0 auto;

  @media (max-width: ${ms.TABLET-1}px) {
    padding: 10px;
  }
  @media (min-width: ${ms.TABLET}px) {
    padding: 20px;
  }
  @media (min-width: ${ms.LAPTOP}px) {
    padding: 0px;
    width: ${ms.CONTAINER_S}px;
  }
  @media (min-width: ${ms.LAPTOP_L}px) {
    width: ${ms.CONTAINER}px;
  }
  @media (min-width: ${ms.LAPTOP_XL}px) {
    width: ${ms.CONTAINER_L}px;
  }
`

export default Container
