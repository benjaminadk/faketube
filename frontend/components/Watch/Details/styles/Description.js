import styled from 'styled-components'
import { darken } from 'polished'

export const DescriptionStyles = styled.div`
  margin-left: 6rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid ${props => props.theme.grey[2]};
  pre {
    width: 80%;
    height: ${props => (props.expand ? '100%' : '6.9rem')};
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
