// @flow
import React from 'react'
import CategoryContextRenderer from 'modules/categories/hocs/CategoryContextRequest'
import Story from 'theme/molecules/Story'
import BootstrapContent from 'theme/molecules/BootstrapContent'

type Props = {
  identifier: string,
  position: 'top' | 'bottom'
}

export default function CategoryContext ({identifier, position}:Props) {
  return (
    <div className='CategoryContext'>
      <CategoryContextRenderer identifier={identifier} children={props => {
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
