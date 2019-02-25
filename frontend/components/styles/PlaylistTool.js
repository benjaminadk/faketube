import styled from 'styled-components'
import { darken } from 'polished'

export const PlaylistStyles = styled.div`
  position: absolute;
  bottom: 2.5rem;
  left: 7rem;
  z-index: 3;
  display: ${props => (props.show ? 'block' : 'none')};
  width: 30rem;
  background: ${props => props.theme.white};
  color: ${props => props.theme.black[0]};
  box-shadow: ${props => props.theme.shadows[5]};
  .top {
    padding: 1.5rem;
    border-bottom: 1px solid ${props => props.theme.grey[5]};
  }
  .main {
    border-bottom: 1px solid ${props => props.theme.grey[5]};
  }
  .bottom {
    padding: 1.5rem;
    .initial {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      svg {
        width: 2.5rem;
        height: 2.5rem;
        color: ${props => props.theme.grey[5]};
      }
    }
    .final {
      .create-input {
        margin-bottom: 2rem;
        & > :first-child {
          font-size: 1.2rem;
        }
        & > :last-child {
          font-size: 1.2rem;
          text-align: right;
          padding-top: 0.35rem;
        }
      }
      .create-button {
        text-align: right;
        text-transform: uppercase;
        color: ${props => darken(0.2, props.theme.secondary)};
        font-family: 'Roboto Bold';
        font-size: 1.3rem;
      }
    }
  }
`

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1.75rem 1fr 1.5rem;
  grid-gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 1.5rem;
  .check {
    width: 2.4rem;
    height: 2.4rem;
    color: ${props => props.theme.grey[8]};
  }
  .blue {
    color: ${props => darken(0.2, props.theme.secondary)};
  }
  .globe {
    width: 1.75rem;
    height: 1.75rem;
    color: ${props => props.theme.grey[8]};
    cursor: pointer;
  }
  .item-text {
    max-width: 19rem;
    font-size: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 1;
    white-space: nowrap;
    cursor: pointer;
    padding-left: 1rem;
  }
`
