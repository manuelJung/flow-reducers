// @flow

import React from 'react'
import Helmet from 'react-helmet'
import Page from 'modules/pages/hocs/Page'

type Props = {}

export default class PageRoute extends React.Component<Props> {
  render(){
    return (
      <Page urlKey='berlin-fashion-week' render={props => (
        <div id='PageRoute'>
          <Helmet title='page'/>
          {console.log(props)}
          {/* <div>{props.page && props.page.content}</div> */}
        </div>
      )}/>
    )
  }
}