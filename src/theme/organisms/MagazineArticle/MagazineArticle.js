// @flow
import React from 'react'
import ArticleRenderer from 'modules/magazine/hocs/MagazineArticleRequest'
import Story from 'theme/molecules/Story'
import BootstrapContent from 'theme/molecules/BootstrapContent'

type Props = {
  identifier: string
}

export default React.memo<Props>(function MagazineArticle ({identifier}:Props) {
  return (
    <div className='MagazineArticle'>
      <ArticleRenderer identifier={identifier} children={props => {
        if(props.isFetching){
          return <div>loading...</div>
        }
        if(!props.data){
          return <div>not found</div>
        }
        if(props.data.useStory){
          return <Story story={props.data.story}/>
        }
        if(!props.data.useStory){
          return <BootstrapContent content={props.data.body}/>
        }
        return null
      }} />
    </div>
  )
})