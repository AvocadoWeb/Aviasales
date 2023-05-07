import { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchSearchId, loadingTickets } from '../../api/api'
import Header from '../Header/Header'
import Filters from '../Filters/Filters'
import TicketList from '../TicketList/TicketList'
import Sort from '../Sort/Sort'
import Loader from '../Loader/Loader'

import classes from './App.module.scss'

function App({ searchId, fetchSearchId, loadingTickets, loading }) {
  useEffect(() => {
    fetchSearchId()
  }, [])

  useEffect(() => {
    if (searchId) {
      loadingTickets(searchId)
    }
  }, [searchId])

  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.app__main}>
        <Filters />
        <div className={classes.content}>
          <Sort />
          {loading ? null : <Loader />}
          <TicketList />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ searchId, loading }) => ({ searchId, loading })

const mapDispatchProps = (dispatch) => ({
  fetchSearchId: (searchId) => dispatch(fetchSearchId(searchId)),
  loadingTickets: (tickets) => dispatch(loadingTickets(tickets)),
})

export default connect(mapStateToProps, mapDispatchProps)(App)
