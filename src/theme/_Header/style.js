import styled from 'styled-components'

export const Wrapper = styled.div`
  background: #eeeced;

  > .usps {
    background: #993452;
    color: #e9bfcd;
    padding: 5px;
    margin: 0;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    display: flex;
    font-size: 12px;
    font-weight: bold;
    list-style: none;
    > li {margin: 0 5px;}
  }

  > .menu {
    padding: 20px 0;
    display: flex;
    align-items: center;
    
    > .logo {
      img { max-width: 300px;}
    }

    > .search-form {
      background: white;
      border-radius: 5px;
      padding: 5px;
      display: flex;
      height: 40px;
      margin-top: 10px;
      margin-left: 10px;
      width: 100%;
      max-width: 300px;
      > input {
        font-size: 14px;
        border: none;
        outline: none;
        width: 100%;
        padding-left: 10px;
      }
      > button {
        border: none;
        background: transparent;
        color: #993452;
        > .Icon {font-size: 14px;}
      }
    }
  }
`