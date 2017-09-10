import { combineReducers } from 'redux'
import user from './user'
import loading from './loading'
import HomeScreen from '../screens/homeScreen'

const initialState = HomeScreen.router.getStateForAction(
  HomeScreen.router.getActionForPathAndParams('Home')
)

const navReducer = (state = initialState, action) => {
  const nextState = HomeScreen.router.getStateForAction(action, state)
  return nextState || state
}

const reducers = {
  nav: navReducer,
  user,
  loading
}

export default combineReducers(reducers)
