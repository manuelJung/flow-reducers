// @flow
import React from 'react'
import type {Node} from 'react'
import {hoc as withMediaSize} from 'modules/browser/hocs/MediaSize'
import type {MediaSizeProps} from 'modules/browser/hocs/MediaSize'
import type {MediaSize} from 'modules/browser/entities'
import {connect} from 'react-redux'
import {greaterThan} from 'modules/browser/selectors'

type Props = MediaSizeProps & {
  children: Node
}

export default withMediaSize(function MediaSize (props:Props) {
  return props.mediaSize ? props.children : 'null'
})

type SwitchProps = {
  children: Node,
  greaterThan: (mediaSize:MediaSize) => boolean
}

export const MediaSizeSwitch = connect<SwitchProps,{},_,_,_,_>(
  state => ({ greaterThan: (size) => greaterThan(state.browser, size) })
)(function MediaSizeSwitch (props:SwitchProps) {
  let element = null
  React.Children.forEach(props.children, child => {
    if (element === null && React.isValidElement(child)) {
      const {minSize, maxSize} = child.props
      if(minSize && props.greaterThan(minSize)) return (element = child)
      if(maxSize && !props.greaterThan(maxSize)) return (element = child)
      if(!minSize && !maxSize) return (element = child)
    }
  })
  return element
})