// @flow
import styled from 'styled-components'

export const Wrapper = styled.label`
  /* Customize the label (the container) */
  display: block;
  position: relative;
  padding-left: 35px;
  margin: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  /* Hide the browser's default checkbox */
  > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  /* Create a custom checkbox */
  > span {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    border: 1px solid black;
    &:hover {
      border: 2px solid black;
    }
  }

  /* Active checkbox */
  ${props => props.checked && `
    > span {
      &:after {
        content: "";
        position: absolute;
        display: block;
        left: 8px;
        top: 4px;
        width: 5px;
        height: 10px;
        border: solid black;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
      }
      &:hover { &:after { left: 7px; top: 3px; } }
    }
  `}
  
`