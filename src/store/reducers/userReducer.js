const defaultState = {
  userInfo: {},
  accessToken: ''
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('accessToken', action.payload.accessToken)
      return {...state, userInfo: action.payload.userInfo, accessToken: action.payload.accessToken}
    case 'LOGOUT':
      localStorage.removeItem('accessToken')
      return {...state, userInfo: {}, accessToken: ''}
    default:
      return state
  }
}

export default reducer