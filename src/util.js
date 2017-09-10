import AV from 'leancloud-storage'
import config from '../config'
import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
import store from './reducers'

let { APP_ID, APP_KEY } = config.leancloud

AV.initialize({
  appId: APP_ID,
  appKey: APP_KEY
})

const middleware = [
  // thunk
]

export const appStore = createStore(
  store,
  applyMiddleware(...middleware)
)

export const dispatch = appStore.dispatch

console.log(appStore.getState())
