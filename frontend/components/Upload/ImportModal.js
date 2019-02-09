import styled from 'styled-components'
import { Close } from 'styled-icons/material/Close'
import { CheckCircle } from 'styled-icons/boxicons-solid/CheckCircle'
import { darken, lighten } from 'polished'
import Modal from '../Modal'

const Container = styled.div`
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.grey[10]};
  .import-top {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    box-shadow: ${props => props.theme.shadows[1]};
    & > :first-child {
      font-family: 'Roboto Bold';
    }
    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: ${props => props.theme.grey[10]};
      cursor: pointer;
    }
  }
  .import-middle {
    height: calc(90vh - 12rem);
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 1.5rem 3rem;
  }
  .import-bottom {
    height: 7rem;
    display: flex;
    align-items: center;
    border-top: 1px solid ${props => props.theme.grey[3]};
    button {
      width: 7rem;
      font-family: 'Roboto Bold';
      font-size: 1.1rem;
      border: 0;
      border-radius: 2px;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      cursor: pointer;
    }
    & > :first-child {
      background: ${props => darken(0.2, props.theme.secondary)};
      color: ${props => props.theme.white};
      border: 1px solid ${props => darken(0.25, props.theme.secondary)};
      margin-right: 1.5rem;
      margin-left: 1.5rem;
      &:disabled {
        background: ${props => lighten(0.2, props.theme.secondary)};
        border: 1px solid ${props => lighten(0.1, props.theme.secondary)};
      }
    }
    & > :last-child {
      background: ${props => props.theme.grey[0]};
      color: ${props => props.theme.grey[10]};
      border: 1px solid ${props => props.theme.grey[5]};
    }
  }
`

const Video = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2rem;
  margin-bottom: 2rem;
  img {
    width: 16rem;
    height: 12rem;
    outline: 5px solid ${props => (props.selected ? props.theme.secondary : 'transparent')};
    cursor: pointer;
  }
  span {
    font-size: 1.2rem;
    color: ${props => props.theme.grey[5]};
    margin-top: 0.5rem;
  }
  .check {
    display: ${props => (props.selected ? 'block' : 'none')};
    opacity: ${props => (props.selected ? 1 : 0.5)};
    position: absolute;
    top: 5px;
    left: 5px;
    background: ${props => props.theme.white};
    border-radius: 50%;
    svg {
      width: 2.25rem;
      height: 2.25rem;
      color: ${props => (props.selected ? props.theme.secondary : props.theme.black[0])};
    }
  }
  &:hover .check {
    display: block !important;
  }
`

class ImportModal extends React.Component {
  state = {
    selected: []
  }

  onVideoClick = index => {
    const { selected } = this.state
    if (selected.includes(index)) {
      let x = selected.filter(s => s !== index)
      this.setState({ selected: x })
    } else {
      selected.push(index)
      this.setState({ selected })
    }
  }

  render() {
    const {
      props: { show, videos, onClose },
      state: { selected }
    } = this
    return (
      <Modal show={show}>
        <Container>
          <div className="import-top">
            <div>All Videos</div>
            <Close onClick={onClose} />
          </div>
          <div className="import-middle">
            {videos &&
              videos.map((v, i) => (
                <Video key={v.id} selected={selected.includes(i)}>
                  <div className="check">
                    <CheckCircle />
                  </div>
                  <img src={v.baseUrl} onClick={() => this.onVideoClick(i)} />
                  <span>{v.mediaMetadata.creationTime}</span>
                </Video>
              ))}
          </div>
          <div className="import-bottom">
            <button disabled={!selected.length}>Select</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </Container>
      </Modal>
    )
  }
}

export default ImportModal
