// @flow
import React from 'react'
import Initializer from 'modules/magazin/hocs/ListInitializer'
import ArticleList from 'modules/magazin/hocs/ListRequest'

export default function MagazinListPage () {
  return (
    <div className='MagazinListPage'>
      <Initializer identifier='default' filters={{ category: 'News', page: 3 }}/>
      <ArticleList identifier='default' render={props => (
        <div className='list'>
          {props.data && props.data.map(art => <div>{art.urlKey}</div>)}
        </div>
      )} />
    </div>
  )
}