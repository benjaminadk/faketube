import styled from 'styled-components'

export const NameDateStyles = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  .user-name {
    font-family: 'Roboto Bold';
    margin-right: 0.5rem;
  }
  .user-created {
    color: ${props => props.theme.grey[10]};
    margin-right: 0.5rem;
    &:hover {
      color: ${props => props.theme.black[0]};
    }
  }
`
