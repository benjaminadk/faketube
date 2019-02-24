import styled from 'styled-components'

export const TopRowStyles = styled.div`
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
