import format from 'date-fns/format'

import classes from './TicketCard.module.scss'

export default function Ticket({ ticket }) {
  const { price, carrier, segments } = ticket

  const startTime = (date) => {
    return format(new Date(date), 'HH:mm')
  }

  const endTime = (date, duration) => {
    return format(new Date(new Date(date).getTime() + duration * 60000), 'HH:mm')
  }

  const travelTime = (duration) => {
    return `${Math.trunc(duration / 60)}ч ${duration % 60}м`
  }

  const declOfNum = (number, words) =>
    words[number % 100 > 4 && number % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]]

  return (
    <article className={classes.card}>
      <header className={classes.card__header}>
        <span className={classes.card__header__price}>{price.toLocaleString('ru-RU')} P</span>
        <img className={classes.card__header__logo} src={`//pics.avs.io/99/36/${carrier}.png`} alt="logo" />
      </header>
      {segments.map(({ origin, destination, stops, date, duration }) => (
        <div className={classes.card__details} key={origin + duration + date}>
          <div className={classes.card__details__way}>
            <span className={classes.card__details__way__text}>
              {origin}-{destination}
            </span>
            <span className={classes.card__details__way__data}>
              {startTime(date)} – {endTime(date, duration)}
            </span>
          </div>
          <div className={classes.card__details__way}>
            <span className={classes.card__details__way__text}>В пути</span>
            <span className={classes.card__details__way__data}>{travelTime(duration)}</span>
          </div>
          <div className={classes.card__details__way}>
            <span className={classes.card__details__way__text}>
              {stops.length > 0
                ? `${stops.length} ${declOfNum(stops.length, ['пересадка', 'пересадки'])}`
                : 'Без пересадок'}
            </span>
            <span className={classes.card__details__way__data}>{stops.length ? stops.join(', ') : null}</span>
          </div>
        </div>
      ))}
    </article>
  )
}
