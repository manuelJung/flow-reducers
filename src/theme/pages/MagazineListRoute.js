// @flow
import React from 'react'
import Initializer from 'modules/magazine/hocs/MagazineListInitializer'
import ArticleList from 'modules/magazine/hocs/MagazineList'

export default function MagazineListPage () {
  return (
    <div className='MagazineListPage'>
      <Initializer identifier='default' filters={{ category: 'News', page: 3 }}/>
      <ArticleList identifier='default' children={props => (
        <div className='list'>
          {props.data && props.data.map(art => <div>{art.urlKey}</div>)}
        </div>
      )} />
    </div>
  )
}