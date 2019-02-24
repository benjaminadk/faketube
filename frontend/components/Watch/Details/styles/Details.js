import styled from 'styled-components'

export const DetailsStyles = styled.div`
  .title-row {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  .actions-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.grey[10]};
    margin-bottom: 2rem;
    border-bottom: 1px solid ${props => props.theme.grey[2]};
    .views {
      font-size: 1.6rem;
    }
    .actions {
      display: flex;
      .more-horiz {
        width: 2rem;
        height: 2rem;
        color: ${props => props.theme.grey[8]};
        cursor: pointer;
      }
    }
  }
  .author-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    .subscribe {
      font-family: 'Roboto Bold';
      background: ${props => props.theme.primary};
      color: ${props => props.theme.white};
      text-transform: uppercase;
      padding: 1rem 1.5rem;
      border-radius: 2px;
      cursor: pointer;
    }
  }
`
