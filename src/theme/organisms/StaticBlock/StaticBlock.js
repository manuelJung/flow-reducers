// @flow
import React from 'react'
import {StaticBlock as StaticBlockRenderer} from 'modules/staticBlocks/hocs/withStaticBlock'
import Story from 'theme/molecules/Story'
import BootstrapContent from 'theme/molecules/BootstrapContent'

type Props = {
  identifier: string
}

export default function StaticBlock ({identifier}:Props) {
  return (
    <div className='StaticBlock'>
      <StaticBlockRenderer identifier={identifier} render={props => {
        if(props.isFetching){
          return <div>loading...</div>
        }
        if(props.fetchError){
          return <div>error</div>
        }
        if(props.block && props.block.useStory){
          return <Story story={props.block.story} />
        }
        if(props.block && !props.block.useStory){
          return <BootstrapContent content={props.block.content} />
        }
        return null
      }} />
    </div>
  )
}