// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import type {Node} from 'react'

type Props = {|
  id?: string,
  selector?: string,
  children: Node
|}

export default function Portal ({id, selector, children}:Props){
  let element;
  if (id) element = document.getElementById(id)
  else if (selector) element = document.querySelector(selector)
  else return null
  return ReactDOM.createPortal(children, element)
}