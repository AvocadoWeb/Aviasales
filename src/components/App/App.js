import { useEffect } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'
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

export default connect(mapStateToProps, actions)(App)
