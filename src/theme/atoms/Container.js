// @flow
import type {Component, Node} from 'react'
import styled from 'styled-components'
import {ms} from 'theme'

type Props = {
  children: Node
}

const Container:Component<Props> = styled.div`
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
