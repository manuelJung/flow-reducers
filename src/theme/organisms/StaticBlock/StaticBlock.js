// @flow
import React from 'react'
import StaticBlockRenderer from 'modules/staticBlocks/hocs/StaticBlock'
import Story from 'theme/molecules/Story'
import BootstrapContent from 'theme/molecules/BootstrapContent'

type Props = {
  identifier: string
}

export default function StaticBlock ({identifier}:Props) {
  return (
    <div className='StaticBlock'>
      <StaticBlockRenderer identifier={identifier} children={props => {
        if(props.isFetching){
          return <div>loading...</div>
        }
        if(props.fetchError){
          return <div>error</div>
        }
        if(props.data && props.data.useStory){
          return <Story story={props.data.story} />
        }
        if(props.data && !props.data.useStory){
          return <BootstrapContent content={props.data.content} />
        }
        return null
      }} />
    </div>
  )
}