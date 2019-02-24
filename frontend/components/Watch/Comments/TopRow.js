import { Sort } from 'styled-icons/material/Sort'
import Popup from '../../styles/Popup'
import { TopRowStyles } from './styles/TopRow'

class TopRow extends React.Component {
  state = {
    show: false,
    x: null,
    y: null
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onMenuClose)
  }

  onMenuOpen = () => {
    const { offsetLeft: x, offsetTop: y } = this.anchor
    this.setState({ show: true, x, y })
    document.body.addEventListener('click', this.onMenuClose)
  }

  onMenuClose = () => {
    document.body.removeEventListener('click', this.onMenuClose)
    this.setState({ show: false })
  }

  render() {
    const {
      props: { count, setOrderBy },
      state: { show, x, y }
    } = this
    return (
      <TopRowStyles>
        <div>
          {count} Comment{count === 1 ? '' : 's'}
        </div>
        <div ref={el => (this.anchor = el)} className="comments-sort">
          <Popup show={show} x={x} y={y + 40}>
            <div onClick={() => setOrderBy('top')}>Top comments</div>
            <div onClick={() => setOrderBy('date')}>Newest first</div>
          </Popup>
          <Sort onClick={this.onMenuOpen} />
          <div onClick={this.onMenuOpen}>sort by</div>
        </div>
      </TopRowStyles>
    )
  }
}

export default TopRow
