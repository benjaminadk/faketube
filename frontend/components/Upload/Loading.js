import styled from 'styled-components'
import { LoaderCircle as Spinner } from 'styled-icons/boxicons-regular/LoaderCircle'

const Container = styled.span`
  svg {
    width: ${props => props.size + 'rem'};
    height: ${props => props.size + 'rem'};
    color: ${props => props.theme.grey[props.color]};
    & > :nth-child(${props => props.child}) {
      color: ${props => props.theme.grey[props.color + 5]};
    }
  }
`

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

  render() {
    const {
      props: { size, color },
      state: { count }
    } = this
    return (
      <Container size={size} color={color} child={order[count % 8]}>
        <Spinner />
      </Container>
    )
  }
}

export default Loading
