class TextInput extends React.Component {
  componentDidMount() {
    this.text.addEventListener('input', this.resize)
  }

  componentWillUnmount() {
    this.text.removeEventListener('input', this.resize)
  }

  resize = () => {
    this.text.style.height = 'auto'
    this.text.style.height = this.text.scrollHeight + 'px'
  }
  render() {
    return <textarea ref={el => (this.text = el)} rows={1} {...this.props} />
  }
}

export default TextInput
