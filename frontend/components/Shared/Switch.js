import { Switch, RedSwitch } from './styles/Switch'

export default ({ color, on, onClick }) => {
  if (color === 'blue') {
    return (
      <Switch on={on} onClick={onClick}>
        <div className="switch-handle" />
      </Switch>
    )
  } else if (color === 'red') {
    return (
      <RedSwitch on={on} onClick={onClick}>
        <div className="switch-handle" />
      </RedSwitch>
    )
  } else {
    return null
  }
}
