import AV from 'leancloud-storage'
import config from '../config'

let { APP_ID, APP_KEY } = config.leancloud

AV.initialize({
  appId: APP_ID,
  appKey: APP_KEY
})
