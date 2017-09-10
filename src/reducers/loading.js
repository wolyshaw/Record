const loading = (state = {visible: false, data: {}}, action) => {
  switch (action.type) {
    case 'loading':
      return action.data
      break
    default:
      return state
  }
}

export default loading
