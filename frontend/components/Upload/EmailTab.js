import styled from 'styled-components'
import { darken } from 'polished'
import { PriorityHigh } from 'styled-icons/material/PriorityHigh'
import { Check } from 'styled-icons/octicons/Check'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const EMAIL_VIDEO_MUTATION = gql`
  mutation EMAIL_VIDEO_MUTATION($data: EmailVideoInput) {
    emailVideo(data: $data) {
      success
    }
  }
`

const EmailForm = styled.div`
  display: flex;
  flex-direction: column;
  textarea {
    font-family: 'Roboto';
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    &:focus {
      outline: 1px solid ${props => darken(0.2, props.theme.secondary)};
    }
  }
  .email-error {
    display: ${props => (props.error ? 'flex' : 'none')};
    align-items: center;
    background: ${props => darken(0.1, props.theme.primary)};
    color: ${props => props.theme.white};
    font-family: 'Roboto Bold';
    font-size: 1.3rem;
    padding: 0.75rem;
    svg {
      width: 3rem;
      height: 3rem;
      color: ${props => props.theme.white};
      margin-right: 10rem;
    }
  }
  .email-subheading {
    font-size: 1.3rem;
    color: ${props => props.theme.grey[10]};
    margin-bottom: 0.5rem;
  }
  .email-preview {
    font-size: 1.3rem;
    background: ${props => props.theme.grey[1]};
    padding: 1rem;
    margin-bottom: 1rem;
    .email-highlight,
    .email-link {
      color: ${props => darken(0.2, props.theme.secondary)};
      &:hover {
        text-decoration: underline;
      }
    }
    .email-message {
      margin: 0.5rem 0 0.5rem 1rem;
    }
    .email-link {
      font-family: 'Roboto Bold';
      margin-left: 0.5rem;
    }
  }
  button {
    align-self: flex-start;
    font-family: 'Roboto Bold';
    font-size: 1.1rem;
    border: 0;
    border-radius: 2px;
    padding: 0.85rem 1rem;
    background: ${props => darken(0.2, props.theme.secondary)};
    color: ${props => props.theme.white};
    cursor: pointer;
    &:focus {
      outline: 0;
    }
  }
`

const EmailSuccess = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => darken(0.2, props.theme.secondary)};
  padding: 0.75rem 2rem;
  svg {
    width: 2.5rem;
    height: 2.5rem;
    color: ${props => props.theme.white};
  }
  .message {
    font-family: 'Roboto Bold';
    font-size: 1.3rem;
    color: ${props => props.theme.white};
  }
  button {
    background: ${props => props.theme.grey[0]};
    color: ${props => props.theme.black[0]};
    border: 1px solid ${props => props.theme.grey[5]};
    border-radius: 2px;
    font-family: 'Roboto Bold';
    font-size: 1.1rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    &:hover {
      background: ${props => props.theme.grey[1]};
    }
  }
`

const EmailTab = ({
  emailSent,
  emailError,
  title,
  to,
  message,
  user,
  onChange,
  onSendEmail,
  onResetEmail
}) => {
  if (emailSent) {
    return (
      <EmailSuccess>
        <Check />
        <div className="message">Email sent successfully!</div>
        <button onClick={onResetEmail}>Send another</button>
      </EmailSuccess>
    )
  } else {
    return (
      <EmailForm error={emailError}>
        <div className="email-error">
          <PriorityHigh />
          <span>Please enter a valid email address in the Email Addresses field </span>
        </div>
        <textarea name="to" placeholder="To" value={to} onChange={onChange} />
        <textarea
          name="message"
          placeholder="Optional message"
          value={message}
          onChange={onChange}
          maxLength={300}
        />
        <div className="email-subheading">Message preview:</div>
        <div className="email-preview">
          <div>
            <span className="email-highlight">{user.name}</span> has shared a video with you on
            FooTube
          </div>
          <div className="email-message">{message}</div>
          <div className="email-link">"{title}"</div>
        </div>
        <Mutation mutation={EMAIL_VIDEO_MUTATION}>
          {(emailVideo, { loading }) => (
            <button onClick={() => onSendEmail(emailVideo)}>Send email</button>
          )}
        </Mutation>
      </EmailForm>
    )
  }
}

export default EmailTab
