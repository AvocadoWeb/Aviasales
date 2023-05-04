import { connect } from 'react-redux'

import * as actions from '../../actions'

import classes from './Filters.module.scss'

function Filters({ filter, setFilter }) {
  const onChange = (e) => {
    const newFilter = [...filter]

    if (e.target.name === 'all') {
      newFilter.map((item) => {
        item.checked = e.target.checked
        return item
      })
    } else {
      newFilter.map((item) => {
        if (item.name === 'all') {
          item.checked = false
        }
        if (e.target.name === item.name) {
          item.checked = e.target.checked
        }
        return item
      })
    }

    let count = 0
    newFilter.forEach((el) => {
      if (el.checked) {
        count += 1
      }
    })
    if (count >= 4) {
      newFilter.map((item) => {
        item.checked = true
        return item
      })
    }
    setFilter(newFilter)
  }

  const filters = filter?.map((item) => {
    const { label, name, checked } = item
    return (
      <li key={name}>
        <label className={classes.filter__label} htmlFor={name}>
          <input
            className={classes.filter__checkbox}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            name={name}
            id={name}
          />
          {label}
        </label>
      </li>
    )
  })

  return (
    <div className={classes.filter}>
      <span className={classes.filter__title}>Количество пересадок</span>
      <ul className={classes.filter__list}>{filters}</ul>
    </div>
  )
}

const mapStateToProps = ({ filter }) => ({ filter })

export default connect(mapStateToProps, actions)(Filters)
