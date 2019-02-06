// @flow
import React from 'react'
import {Wrapper} from './style'
import memoEqual from 'utils/memoEqual'

type Props = {
  price: [number, number],
  min: number,
  max: number,
  onChange: (price:[number,number]) => void
}

type State = {
  valMin: number,
  valMax: number
}

export default class Slider extends React.Component<Props,State> {
  shouldComponentUpdate = memoEqual('Slider', ['price', 'min', 'max'], ['onChange'], this)

  state = {
    valMin: this.props.price[0],
    valMax: this.props.price[1]
  }

  handleChange = (price:[number, number]) => this.setState({
    valMin: price[0],
    valMax: price[1]
  })

  handleAfterChange = (price:[number,number]) => this.props.onChange(price)

  render(){
    const {valMin, valMax} = this.state
    const {price, min, max} = this.props
    const sliderConfig = {
      min: Math.floor(min),
      max: Math.ceil(max),
      defaultValue: [price[0], price[1]],
      onChange: this.handleChange,
      onAfterChange: this.handleAfterChange
    }
    return (
      <Wrapper className='Slider' {...sliderConfig}>
        <div className='handle'/>
        <div className='handle'/>
      </Wrapper>
    )
  }
}