import styled from 'styled-components'

export const Wrapper = styled.div``

export const Options = styled.div`
  list-style: none;
  padding: 0;
  margin-top: 10px;
  max-height: 300px;
  overflow: scroll;
`

export const Option = styled.li`
  padding: 8px;
  margin-bottom: 1px;
  cursor: pointer;
  &:hover { background: lightgrey; }

  ${({selected}) => selected && `background: #993452 !important; color: white;`}
`