// @flow
import React from 'react'
import {Link} from 'react-router-dom'
import {isMultiLocale} from 'config'
import {getLocale} from 'AppRouter/locale'

type Props = {
  to: string
}

export default React.memo<Props>(function MaybeLink (props:Props) {
  const isRelativeLink = props.to[0] === '/'
  const isExternalLink = props.to.startsWith('http')
  const isNoFollowLink = props.to.startsWith('nofollow:')
  let {to, ...aProps} = props

  if(isNoFollowLink){
    return <a {...aProps} rel='nofollow' href={props.to.replace('nofollow:','')} target='_blank' /> // eslint-disable-line jsx-a11y/anchor-has-content
  }

  if(isExternalLink){
    return <a {...aProps} href={props.to} target='_blank' /> // eslint-disable-line jsx-a11y/anchor-has-content
  }

  // for every unknown protokol like "javascript:"
  if(!isRelativeLink){
    return <a {...aProps} href={props.to} /> // eslint-disable-line jsx-a11y/anchor-has-content
  }

  return <Link {...props} to={withMaybeLocale(props.to)} />
})

const withMaybeLocale = (url='/') => {
  const locale = getLocale() // de-at
  return (isMultiLocale && url.startsWith('/') && !url.startsWith('/'+locale)) ? '/' + locale + url : url
}