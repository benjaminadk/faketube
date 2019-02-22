import styled from 'styled-components'
import { darken } from 'polished'
import { linkifyDescription } from '../../../lib/linkify'

const Container = styled.div`
  margin-left: 6rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid ${props => props.theme.grey[2]};
  pre {
    width: 80%;
    height: ${props => (props.expand ? '100%' : '7rem')};
    font-family: 'Roboto';
    font-size: 1.4rem;
    white-space: pre-wrap;
    overflow: hidden;
    a {
      color: ${props => darken(0.2, props.theme.secondary)};
    }
    & > :last-child {
      display: flex;
      margin-top: 2rem;
      font-family: 'Roboto Bold';
      & > :first-child {
        color: ${props => props.theme.grey[10]};
        margin-right: 5rem;
      }
    }
  }
  & > :last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    color: ${props => props.theme.grey[10]};
    margin-top: 2rem;
    padding-bottom: 2rem;
    cursor: pointer;
  }
`

export default class Description extends React.Component {
  state = {
    expand: false,
    showExpand: false
  }

  componentDidMount() {
    this.setShowExpand()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.video.id !== this.props.video.id) {
      console.log(this.description.scrollHeight)
      this.setShowExpand()
      this.setState({ expand: false })
    }
  }

  setShowExpand = () => this.setState({ showExpand: this.description.scrollHeight > 70 })

  toggleExpand = () => this.setState(({ expand }) => ({ expand: !expand }))

  render() {
    const {
      props: { video },
      state: { expand, showExpand }
    } = this
    return (
      <Container expand={expand}>
        <pre
          ref={el => (this.description = el)}
          dangerouslySetInnerHTML={{ __html: linkifyDescription(video) }}
        />
        {showExpand ? (
          <div onClick={this.toggleExpand}>show {expand ? 'less' : 'more'}</div>
        ) : (
          <div />
        )}
      </Container>
    )
  }
}
