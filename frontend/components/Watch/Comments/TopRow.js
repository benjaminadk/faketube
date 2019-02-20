import styled from 'styled-components'
import { Sort } from 'styled-icons/material/Sort'
import Popup from '../../styles/Popup'

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  margin-bottom: 3rem;
  .comments-sort {
    display: flex;
    align-items: center;
    color: ${props => props.theme.grey[10]};
    margin-left: 4rem;
    cursor: pointer;
    svg {
      width: 2rem;
      height: 2rem;
      color: inherit;
      margin-right: 0.5rem;
    }
    & > :last-child {
      font-family: 'Roboto Bold';
      font-size: 1.4rem;
      text-transform: uppercase;
    }
  }
`

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
      <Container>
        <div>{count} Comments</div>
        <div ref={el => (this.anchor = el)} className="comments-sort">
          <Popup show={show} x={x} y={y + 40}>
            <div onClick={() => setOrderBy('top')}>Top comments</div>
            <div onClick={() => setOrderBy('date')}>Newest first</div>
          </Popup>
          <Sort onClick={this.onMenuOpen} />
          <div onClick={this.onMenuOpen}>sort by</div>
        </div>
      </Container>
    )
  }
}

export default TopRow
