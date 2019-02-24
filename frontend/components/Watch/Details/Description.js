import { DescriptionStyles } from './styles/Description'
import { linkifyDescription } from '../../../lib/linkify'

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
      <DescriptionStyles expand={expand}>
        <pre
          ref={el => (this.description = el)}
          dangerouslySetInnerHTML={{ __html: linkifyDescription(video) }}
        />
        {showExpand ? (
          <div onClick={this.toggleExpand}>show {expand ? 'less' : 'more'}</div>
        ) : (
          <div />
        )}
      </DescriptionStyles>
    )
  }
}
