// @flow
import React from 'react'
import {Wrapper} from './style'

type Props = {}

export default React.memo<Props>(function Header () {
  return (
    <Wrapper className='Header'>
      <ul className='usps'>
        <li>Marktplatz für große Größen</li>
        <li>Beliebte Shops & Marken</li>
        <li>Riesige Auswahl</li>
        <li>Beratung & Inspiration</li>
      </ul>
      <section className='menu'>
        <div className='logo'/>
        <div className='search-form'/>
        <div className='icon-list'/>
      </section>
      <section className='navigation'/>
    </Wrapper>
  )
})