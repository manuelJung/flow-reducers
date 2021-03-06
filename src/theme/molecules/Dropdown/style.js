import styled from 'styled-components'

export const Wrapper = styled.div``

export const Content = styled.div`
  border: 1px solid grey;
  border-top: none;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  padding: 8px;
  padding-top: 12px;
  position: absolute;
  width: 100%;
  background: white;
  z-index: 100;

  > .search {
    display: flex;
    border-bottom: 1px solid black;
    padding-bottom: 3px;
    input {
      flex: 1;
      border: none;
      outline: none;
    }
  }

  > .button-wrapper {
    margin-top: 15px;
  }
`

export const Label = styled.div`
  padding: 8px;
  border: 1px solid grey;
  border-radius: 3px;
  color: #333;
  cursor: pointer;

  ${({open}) => open && `
    border-bottom: none;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  `}

  display: flex;
  
  > .text { flex: 1; }

  > .Icon { font-size: 12px; padding-top: 4px; }
`

