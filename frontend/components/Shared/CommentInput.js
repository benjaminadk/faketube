import { InputStyles } from './styles/UnderlinedInput'

export default class TextInput extends React.Component {
  componentDidMount() {
    this.text.addEventListener('input', this.resize)
    this.props.placeholder.includes('reply') && this.text.focus()
  }

  componentWillUnmount() {
    this.text.removeEventListener('input', this.resize)
  }

  resize = () => {
    this.text.style.height = 'auto'
    this.text.style.height = this.text.scrollHeight + 'px'
  }
  render() {
    const { focus, ...rest } = this.props
    return (
      <InputStyles show={true} focus={focus} background="white" underline="light">
        <textarea ref={el => (this.text = el)} rows={1} {...rest} />
        <div className="underline">
          <div />
          <div />
        </div>
      </InputStyles>
    )
  }
}
