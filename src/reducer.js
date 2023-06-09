import { FILTER, SORT, SEARCH_ID, TICKETS_LOADED, ERROR, SHOW_MORE, cheapest } from './types'

const initialState = {
  filter: [
    { label: 'Все', name: 'all', checked: true },
    { label: 'Без пересадок', name: '0', checked: true },
    { label: '1 пересадка', name: '1', checked: true },
    { label: '2 пересадка', name: '2', checked: true },
    { label: '3 пересадка', name: '3', checked: true },
  ],
  sort: cheapest,
  searchId: undefined,
  tickets: [],
  loading: false,
  error: null,
  showMoreCount: 5,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      return { ...state, filter: action.filter }

    case SORT:
      return { ...state, sort: action.sort }

    case SEARCH_ID:
      return { ...state, searchId: action.searchId }

    case TICKETS_LOADED:
      return { ...state, tickets: [...state.tickets, ...action.tickets], loading: action.loading }

    case ERROR:
      return { ...state, error: action.error }

    case SHOW_MORE:
      return { ...state, showMoreCount: state.showMoreCount + 5 }

    default:
      return state
  }
}

export default reducer
