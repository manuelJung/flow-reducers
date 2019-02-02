// @flow
import {createResponsiveStateReducer} from 'redux-responsive'

export type State = {}

const reducer:(state:State)=>State = createResponsiveStateReducer({
  extraSmall: ms.MOBILE_M-1,
  small: ms.TABLET-1,
  medium: ms.LAPTOP-1,
  large: ms.LAPTOP_L-1,
  extraLarge: ms.LAPTOP_XL-1
})

export default reducer