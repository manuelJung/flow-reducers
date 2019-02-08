// @flow

import React from 'react'
import Helmet from 'react-helmet'
import Page from 'modules/pages/hocs/Page'

type Props = {}

export default class PageRoute extends React.Component<Props> {
  render(){
    return (
      <Page identifier='berlin-fashion-week' children={props => (
        <div id='PageRoute'>
          <Helmet title='page'/>
          {/* <div>{props.page && props.page.content}</div> */}
        </div>
      )}/>
    )
  }
}