import AV from 'leancloud-storage'

const APP_ID = 'u30w6ylce91cpx7bm98wkm5d1h2tr0kn6bknjmjw8c0g9ubj'

const APP_KEY = 'dkryk8xq8xfl705pp4wckim7ru81sebgig1k5szdt28qwyvd'

export const lean = AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})
