// @flow
import React from 'react'
import {CategoryContext as CategoryContextFetcher} from 'modules/navigation/hocs/withCategoryContext'
import Story from 'theme/molecules/Story'
import BootstrapContent from 'theme/molecules/BootstrapContent'

import type {CategoryId} from 'modules/navigation/entities'

type Props = {
  categoryId: CategoryId,
  position: 'top' | 'bottom'
}

export default function CategoryContext ({categoryId, position}:Props) {
  return (
    <div className='CategoryContext'>
      <CategoryContextFetcher categoryId={categoryId} render={props => {
        if(props.isFetching){
          return <div>loading...</div>
        }
        if(!props.data){
          return <div>not found</div>
        }
        if(position === 'top' && props.data.useStory){
          return <Story story={props.data.story}/>
        }
        if(position === 'top' && !props.data.useStory){
          return (
            <React.Fragment> {/* $FlowFixMe */}
              <BootstrapContent content={props.data.categoryText1}/>
              <BootstrapContent content={props.data.seoText1}/>
            </React.Fragment>
          )
        }
        if(position === 'bottom'){
          return (
            <React.Fragment>
              <BootstrapContent content={props.data.seoText2}/>
              <BootstrapContent content={props.data.seoText3}/>
            </React.Fragment>
          )
        }
        return <span/>
      }}/>
    </div>
  )
}
