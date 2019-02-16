import styled from 'styled-components'
import { darken, transparentize } from 'polished'
import { Sort } from 'styled-icons/material/Sort'

const Container = styled.div`
  .comments-top {
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
  }
  .comments-action {
    display: grid;
    grid-template-columns: 4rem 1fr;
    grid-gap: 3rem;
    margin-bottom: 3rem;
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
    & > :last-child {
      display: grid;
      grid-template-rows: 1fr 1fr;
      input {
        width: 100%;
        font-family: 'Roboto';
        font-size: 1.4rem;
        border: 0;
        outline: 0;
        padding-bottom: 0.5rem;
      }
    }
  }
`

const Underline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 0.1rem;
  background: ${props => props.theme.grey[2]};
  & > :first-child,
  & > :last-child {
    opacity: ${props => (props.focus ? 1 : 0)};
    width: ${props => (props.focus ? '50%' : '0%')};
    height: 0.2rem;
    background: ${props => props.theme.grey[10]};
    transition: width 0.25s;
  }
`

const CommentButtons = styled.div`
  justify-self: flex-end;
  display: ${props => (props.show ? 'flex' : 'none')};
  align-items: center;
  & > * {
    text-transform: uppercase;
    font-family: 'Roboto Bold';
    font-size: 1.4rem;
    border-radius: 2px;
    cursor: pointer;
  }
  & > :first-child {
    color: ${props => props.theme.grey[10]};
    padding: 1rem 2rem;
    margin-right: 0.5rem;
  }
  & > :last-child {
    background: ${props =>
      props.text
        ? darken(0.2, props.theme.secondary)
        : transparentize(0.8, darken(0.2, props.theme.secondary))};
    color: ${props => props.theme.white};
    padding: 1rem 2rem;
  }
`

class Comments extends React.Component {
  state = {
    focus: false,
    text: '',
    buttons: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.text.length === 0 && this.state.text.length === 1) {
      this.setState({ buttons: true })
    }
  }

  onChange = e => {
    this.setState({ text: e.target.value })
  }

  onFocus = () => this.setState({ focus: true })

  onBlur = () => this.setState({ focus: false })

  onCancelClick = () => this.setState({ text: '', buttons: false })

  render() {
    const {
      props: { comments, user },
      state: { focus, text, buttons }
    } = this
    return (
      <Container focus={focus}>
        <div className="comments-top">
          <div>{comments.length} Comments</div>
          <div className="comments-sort">
            <Sort />
            <div>sort by</div>
          </div>
        </div>
        <div className="comments-action">
          <img src={user.image} />
          <div>
            <div className="comments-input">
              <input
                type="text"
                placeholder="Add a public comment..."
                value={text}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
              <Underline focus={focus}>
                <div />
                <div />
              </Underline>
            </div>
            <CommentButtons show={buttons} text={Boolean(text)}>
              <div onClick={this.onCancelClick}>cancel</div>
              <div>comment</div>
            </CommentButtons>
          </div>
        </div>
      </Container>
    )
  }
}

export default Comments
