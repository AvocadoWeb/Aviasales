import logo from '../../images/Logo.svg'

import classes from './Header.module.scss'

function Header() {
  return (
    <header className={classes.header}>
      <img className={classes.header__logo} src={logo} alt="logo" />
    </header>
  )
}

export default Header
