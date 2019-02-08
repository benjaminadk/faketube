import styled from 'styled-components'

const Spinner = styled.svg.attrs(props => ({
  style: {
    width: props.size + 'rem',
    height: props.size + 'rem'
  }
}))``

const Circle = styled.circle.attrs(props => ({
  style: {
    fill: props.highlight ? props.theme.grey[props.color + 5] : props.theme.grey[props.color]
  }
}))``

const order = [1, 3, 5, 7, 2, 4, 6, 8]

class Loading extends React.Component {
  state = {
    count: 1
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(({ count }) => ({ count: count + 1 }))
    }, 100)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.stop && this.props.stop) {
      clearInterval(this.timer)
    }
  }

  render() {
    const {
      props: { size, color },
      state: { count }
    } = this
    return (
      <div>
        <Spinner size={size} viewBox="0 0 24 24">
          <Circle highlight={order[count % 8] === 1} color={color} cx="12" cy="20" r="2" />
          <Circle highlight={order[count % 8] === 2} color={color} cx="12" cy="4" r="2" />
          <Circle highlight={order[count % 8] === 3} color={color} cx="6.343" cy="17.657" r="2" />
          <Circle highlight={order[count % 8] === 4} color={color} cx="17.657" cy="6.343" r="2" />
          <Circle highlight={order[count % 8] === 5} color={color} cx="4" cy="12" r="2.001" />
          <Circle highlight={order[count % 8] === 6} color={color} cx="20" cy="12" r="2" />
          <Circle highlight={order[count % 8] === 7} color={color} cx="6.343" cy="6.344" r="2" />
          <Circle highlight={order[count % 8] === 8} color={color} cx="17.657" cy="17.658" r="2" />
        </Spinner>
      </div>
    )
  }
}

export default Loading
