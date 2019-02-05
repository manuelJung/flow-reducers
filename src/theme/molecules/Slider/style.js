import styled from 'styled-components'
import Slider from 'react-slider'

export const Wrapper = styled(Slider)`
  padding: 20px 10px;
  width: 100%;
  margin-top: -10px;

  > .bar {
    height: 11px;
    background: silver;
    border-radius: 4px;
  }

  > .bar-1 {
    background: #993452;
  }

  > .handle {
    width: 19px;
    height: 19px;
    margin-top: -4px;
    border-radius: 100%;
    border: 1px solid black;
    background: silver;
    cursor: pointer;
    position: relative;
  }
`