// @flow
import React from 'react'
import Page from 'modules/pages/hocs/Page'
import Story from 'theme/molecules/Story'
import BootstrapContent from 'theme/molecules/BootstrapContent'

type Props = {
  urlKey: string
}

export default function PageArticle ({urlKey}:Props) {
  return (
    <div className='PageArticle'>
      <Page identifier={urlKey} render={props => {
        if(props.isFetching){
          return <div>laoding...</div>
        }
        if(props.fetchError){
          return <div>error</div>
        }
        if(props.data && props.data.useStory){
          return (
            <React.Fragment>
              <div className='title'>{props.data.title}</div>
              <Story story={props.data.story} />
            </React.Fragment>
          )
        }
        if(props.data && !props.data.useStory){
          return (
            <React.Fragment>
              <div className='title'>{props.data.title}</div>
              <BootstrapContent content={props.data.body} />
              <BootstrapContent content={props.data.bodyOverflow} />
            </React.Fragment>
          )
        }
        return null
      }} />
    </div>
  )
}