import { InputStyles } from './styles/UnderlinedInput'

export default React.forwardRef(({ show, focus, ...rest }, ref) => (
  <InputStyles show={show} focus={focus} background="grey" underline="dark">
    <input ref={ref} {...rest} />
    <div className="underline">
      <div />
      <div />
    </div>
  </InputStyles>
))
