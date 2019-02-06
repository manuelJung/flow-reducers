// @flow
import React from 'react'
import {Wrapper} from './style'
import Icon from 'theme/atoms/Icon'
import {Link} from 'react-router-dom'
import Container from 'theme/atoms/Container'

type Props = {}

export default React.memo<Props>(function Header () {
  const handleSearchSubmit = e => {
    e.preventDefault()
    console.log(e.target.querySelector('input').value)
  }
  return (
    <Wrapper className='Header'>
      {/* USP Items */}
      <ul className='usps'>
        <li><Icon icon='home'/> Marktplatz für große Größen</li>
        <li><Icon icon='heart-o'/> Beliebte Shops & Marken</li>
        <li><Icon icon='shopping-cart'/> Riesige Auswahl</li>
        <li><Icon icon='star-o'/> Beratung & Inspiration</li>
      </ul>
      <Container className='menu'>
        {/* Logo */}
        <Link className='logo' to='/'>
          <img src='https://www.wundercurves.de/images/wundercurves_logo.svg' alt='Banner'/>
        </Link>
        {/* Search Form */}
        <form className='search-form' onSubmit={handleSearchSubmit}>
          <input placeholder='Wundercurves durchsuchen...' />
          <button><Icon icon='search'/></button>
        </form>
        {/* Icon List */}
        <div className='icon-list'/>
      </Container>
      {/* Navigation */}
      <section className='navigation'/>
    </Wrapper>
  )
})