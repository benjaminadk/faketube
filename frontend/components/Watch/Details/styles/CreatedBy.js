import styled from 'styled-components'

export const CreatedByStyles = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
  .author-info {
    & > :first-child {
      display: flex;
      font-family: 'Roboto Bold';
      font-size: 1.4rem;
      margin-bottom: 0.25rem;
      svg {
        width: 1.5rem;
        height: 1.5rem;
        color: ${props => props.theme.grey[10]};
        margin-left: 0.5rem;
      }
    }
    & > :last-child {
      font-size: 1.3rem;
      color: ${props => props.theme.grey[10]};
    }
  }
`
