export const setFilter = (filter) => ({ type: 'FILTER', filter })

export const setSort = (sort) => ({ type: 'SORT', sort })

export const onError = (error) => ({ type: 'ERROR', error })

export const showMore = () => ({ type: 'SHOW_MORE' })

export function fetchSearchId() {
  return (dispatch) => {
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          type: 'SEARCH_ID',
          searchId: response.searchId,
        })
      })
      .catch((error) => {
        dispatch(onError(error))
      })
  }
}

export function loadingTickets(searchId) {
  return (dispatch) => {
    async function subscribe() {
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)

      if (response.status === 502) {
        await subscribe()
      } else if (response.status !== 200) {
        dispatch(onError(response.statusText))
        await subscribe()
      } else {
        const ticketsJs = await response.json()

        dispatch({
          type: 'TICKETS_LOADED',
          tickets: ticketsJs.tickets,
          loading: ticketsJs.stop,
        })

        if (!ticketsJs.stop) await subscribe()
      }
    }

    subscribe()
  }
}
