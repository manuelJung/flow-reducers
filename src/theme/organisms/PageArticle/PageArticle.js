// @flow
import React from 'react'
import {Page} from 'modules/pages/hocs/withPage'
import Story from 'theme/molecules/Story'
import BootstrapContent from 'theme/molecules/BootstrapContent'

type Props = {
  urlKey: string
}

export default function PageArticle ({urlKey}:Props) {
  return (
    <div className='PageArticle'>
      <Page urlKey={urlKey} render={props => {
        if(props.isFetching){
          return <div>laoding...</div>
        }
        if(props.fetchError){
          return <div>error</div>
        }
        if(props.page && props.page.useStory){
          return (
            <React.Fragment>
              <div className='title'>{props.page.title}</div>
              <Story story={props.page.story} />
            </React.Fragment>
          )
        }
        if(props.page && !props.page.useStory){
          return (
            <React.Fragment>
              <div className='title'>{props.page.title}</div>
              <BootstrapContent content={props.page.body} />
              <BootstrapContent content={props.page.bodyOverflow} />
            </React.Fragment>
          )
        }
        return null
      }} />
    </div>
  )
}