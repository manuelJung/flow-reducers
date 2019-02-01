// @flow
import * as React from 'react'
import Modal from 'theme/atoms/Modal'


export default function Component(){
  
  return (
    <div id='Component'>
      <Modal label='label'>
        <div style={{
          background: 'white',
          width: '40%',
          height: 400
        }}/>
      </Modal>
    </div>
  )
}