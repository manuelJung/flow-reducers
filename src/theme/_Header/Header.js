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
      <ul className='usps'>
        {/* $FlowFixMe */}
        <li><Icon icon='home'/> Marktplatz für große Größen</li>{/* $FlowFixMe */}
        <li><Icon icon='heart-o'/> Beliebte Shops & Marken</li>{/* $FlowFixMe */}
        <li><Icon icon='shopping-cart'/> Riesige Auswahl</li>{/* $FlowFixMe */}
        <li><Icon icon='star-o'/> Beratung & Inspiration</li>
      </ul>
      <Container className='menu'>
        <Link className='logo' to='/'>
          <img src='https://www.wundercurves.de/images/wundercurves_logo.svg' alt='Banner'/>
        </Link>
        <form className='search-form' onSubmit={handleSearchSubmit}>
          <input placeholder='Wundercurves durchsuchen...' />
          <button><Icon icon='search'/></button>
        </form>
        <div className='icon-list'/>
      </Container>
      <section className='navigation'/>
    </Wrapper>
  )
})