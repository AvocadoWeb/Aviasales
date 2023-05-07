import { connect } from 'react-redux'
import { useCallback } from 'react'

import TicketCard from '../TicketCard/TicketCard'
import * as actions from '../../actions'
import { cheapest, fastest, optimal } from '../../types'

import classes from './TicketList.module.scss'

function TicketList({ tickets, showMoreCount, sort, filter, showMore }) {
  const filteredTickets = useCallback(
    (filterDetails) => {
      return filterDetails.filter((ticket) => {
        if (filter[0].checked) return ticket
        if (filter[1].checked && ticket.segments[0].stops.length === 0 && ticket.segments[1].stops.length === 0)
          return true
        if (filter[2].checked && ticket.segments[0].stops.length === 1 && ticket.segments[1].stops.length === 1)
          return true
        if (filter[3].checked && ticket.segments[0].stops.length === 2 && ticket.segments[1].stops.length === 2)
          return true
        if (filter[4].checked && ticket.segments[0].stops.length === 3 && ticket.segments[1].stops.length === 3)
          return true
        return false
      })
    },
    [filter]
  )

  const sortingTickets = (arr, sort) => {
    switch (sort) {
      case cheapest:
        return arr.sort((a, b) => (a.price > b.price ? 1 : -1))
      case fastest:
        return arr.sort((a, b) =>
          a.segments[0].duration + a.segments[1].duration > b.segments[0].duration + b.segments[1].duration ? 1 : -1
        )
      case optimal:
        return arr.sort((a, b) =>
          a.segments[0].duration + a.segments[1].duration + a.price >
          b.segments[0].duration + b.segments[1].duration + b.price
            ? 1
            : -1
        )
      default:
        return arr
    }
  }

  const viewTickets = sortingTickets(filteredTickets(tickets), sort).slice(0, showMoreCount)

  return (
    <>
      <ul className={classes.ticketlist}>
        {viewTickets.map((ticket, index) => (
          <li key={index}>
            <TicketCard ticket={ticket} />
          </li>
        ))}
      </ul>
      {viewTickets.length >= showMoreCount ? (
        <button className={classes.ticketlist__showmore} onClick={showMore}>
          Показать еще 5 билетов!
        </button>
      ) : null}
      {viewTickets.length === 0 ? (
        <span className={classes.result}>Рейсов, подходящих под заданные фильтры, не найдено</span>
      ) : null}
    </>
  )
}

const mapStateToProps = ({ tickets, showMoreCount, sort, filter }) => ({ tickets, showMoreCount, sort, filter })

export default connect(mapStateToProps, actions)(TicketList)
