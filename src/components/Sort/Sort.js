import { connect } from 'react-redux'

import * as actions from '../../actions'
import { cheapest, fastest, optimal } from '../../types'

import classes from './Sort.module.scss'

function Sort({ sort, setSort }) {
  return (
    <ul className={classes.sort}>
      <li className={classes.sort__item}>
        <input type="radio" id="cheapest" checked={sort === 'cheapest'} onChange={() => setSort(cheapest)} />
        <label htmlFor="cheapest">Самый дешевый</label>
      </li>
      <li className={classes.sort__item}>
        <input type="radio" id="fastest" checked={sort === 'fastest'} onChange={() => setSort(fastest)} />
        <label htmlFor="fastest">Самый быстрый</label>
      </li>
      <li className={classes.sort__item}>
        <input type="radio" id="optimal" checked={sort === 'optimal'} onChange={() => setSort(optimal)} />
        <label htmlFor="optimal">Оптимальный</label>
      </li>
    </ul>
  )
}

const mapStateToProps = ({ sort }) => ({ sort })

export default connect(mapStateToProps, actions)(Sort)
