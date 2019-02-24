import styled from 'styled-components'

export const InputStyles = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  input {
    background: ${props => (props.background === 'grey' ? props.theme.grey[1] : props.theme.white)};
    outline: 0;
    border: 0;
  }
  textarea {
    width: 100%;
    font-family: 'Roboto';
    font-size: 1.4rem;
    color: ${props => props.theme.black[0]};
    border: 0;
    outline: 0;
    padding-bottom: 0.5rem;
    overflow: hidden;
    resize: none;
  }
  .underline {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 0.1rem;
    background: ${props =>
      props.underline === 'light' ? props.theme.grey[2] : props.theme.black[0]};
    & > :first-child,
    & > :last-child {
      opacity: ${props => (props.focus ? 1 : 0)};
      width: ${props => (props.focus ? '50%' : '0%')};
      height: 0.22rem;
      background: ${props =>
        props.underline === 'light' ? props.theme.grey[10] : props.theme.black[2]};
      transition: width 0.3s;
    }
  }
`
