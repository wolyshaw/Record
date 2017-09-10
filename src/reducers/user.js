const user = (state = {}, action) => {
  switch (action.type) {
    case 'userinfo':
      return action.data
      break
    default:
      return state
  }
}

export default user
