import styled from 'styled-components'
import type {Component} from 'react'

type Props = {
  secondary?: boolean,
  filled?: boolean,
  flat?: boolean,
  bold?: boolean,
  rounded?: boolean,
  roundedRight?: boolean,
  fullWidth?: boolean,
  disable?: boolean
}

const Button:Component<Props> = styled.button`
  font-size: 1em;
  padding: 0.25em 1em;
  cursor: pointer;

  width: ${props => props.fullWidth ? '100%' : 'auto'};

  background: white;
  color: ${props => props.secondary ? 'gray' : 'red'};
  border: 2px solid ${props => props.secondary ? 'gray' : 'red'};

  &:focus { outline:0; }

  ${props => props.filled && `
    background: ${props.secondary ? 'gray' : 'red'};
    color: white;
  `}

  ${props => props.bold && `
    font-weight: bold;
  `}

  ${props => props.flat && `
    background: none;
    border: none;
  `}

  ${props => props.rounded && `
    border-radius: 30px;
  `}

  ${props => props.roundedRight && `
    border-radius: 0 30px 30px 0;
  `}

  ${props => props.disable && `
    cursor: not-allowed;
  `}
`

export default Button