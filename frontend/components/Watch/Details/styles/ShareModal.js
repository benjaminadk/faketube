import styled from 'styled-components'
import { darken } from 'polished'

export const ShareModalStyles = styled.div`
  position: relative;
  width: 50rem;
  height: 30rem;
  background: ${props => props.theme.white};
  box-shadow: ${props => props.theme.shadows[2]};
  padding: 2rem;
  overflow: hidden;
  .heading {
    margin-bottom: 3rem;
  }
  .icon-row {
    display: flex;
    transform: ${props => (props.shift ? 'translateX(-40rem)' : 'translateX(0)')};
    transition: all 0.5s;
    margin-bottom: 3rem;
    .icon {
      display: grid;
      grid-template-rows: 6rem auto;
      grid-template-columns: 6rem;
      grid-gap: 0.5rem;
      justify-items: center;
      cursor: pointer;
      margin-right: 2rem;
      & > :last-child {
        font-size: 1.3rem;
      }
      .embed {
        width: 6rem;
        height: 6rem;
        display: grid;
        justify-items: center;
        align-items: center;
        background: ${props => props.theme.grey[1]};
        border-radius: 50%;
        svg {
          width: 3rem;
          height: 3rem;
          color: ${props => props.theme.grey[14]};
        }
      }
    }
  }
  .shift {
    position: absolute;
    top: 7.5rem;
    z-index: 2;
    width: 4rem;
    height: 4rem;
    justify-items: center;
    align-items: center;
    background: ${props => props.theme.white};
    border-radius: 50%;
    box-shadow: ${props => props.theme.shadows[5]};
    cursor: pointer;
    svg {
      width: 2.5rem;
      height: 2.5rem;
      color: ${props => props.theme.grey[10]};
    }
  }
  .shift.right {
    display: ${props => (props.shift ? 'none' : 'grid')};
    right: 0.5rem;
  }
  .shift.left {
    display: ${props => (props.shift ? 'grid' : 'none')};
    left: 0.5rem;
  }
  .url-input {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    border: 1px solid ${props => props.theme.grey[2]};
    background: ${props => props.theme.grey[0]};
    margin-bottom: 2rem;
    input {
      width: 75%;
      border: 0;
      outline: 0;
      font-family: 'Roboto';
      background: ${props => props.theme.grey[0]};
    }
    & > :last-child {
      font-family: 'Roboto Bold';
      font-size: 1.3rem;
      color: ${props => darken(0.2, props.theme.secondary)};
      text-transform: uppercase;
      cursor: pointer;
    }
  }
`

export const TimeCheck = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${props => props.theme.grey[2]};
  padding-top: 2rem;
  & > :first-child {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    cursor: pointer;
    svg {
      width: 2.5rem;
      height: 2.5rem;
      color: ${props => props.theme.grey[10]};
      margin-right: 1.5rem;
    }
    .checked {
      color: ${props => props.theme.secondary};
    }
  }
  input {
    width: 5rem;
    outline: 0;
    font-family: 'Roboto';
    margin-left: 1rem;
    border: 0;
    border-bottom: 1px solid ${props => props.theme.grey[5]};
    transition: all 0.25s;
    &:disabled {
      background: ${props => props.theme.white};
      color: ${props => props.theme.grey[3]};
      border: 0;
    }
    &:focus {
      border-bottom: 1px solid ${props => props.theme.black[0]};
    }
  }
`
