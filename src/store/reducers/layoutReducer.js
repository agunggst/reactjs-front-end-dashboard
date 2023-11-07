const defaultState = {
  pageTitle: '',
  breadcrumbs: []
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PAGE_TITLE':
      return {...state,  pageTitle: action.payload.pageTitle}
    case 'SET_BREADCRUMBS':
      return {...state,  breadcrumbs: action.payload.breadcrumbs}
    default:
      return state
  }
}

export default reducer