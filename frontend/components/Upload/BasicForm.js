import styled from 'styled-components'
import { darken } from 'polished'

const Form = styled.form`
  .basic-top {
    display: grid;
    grid-template-columns: 45rem 1fr;
    fieldset {
      margin: 0;
      padding: 0;
      border: 0;
    }
    .left {
      padding-right: 1.5rem;
      & > :first-child,
      textarea {
        width: 100%;
        font-family: 'Roboto';
        font-size: 1.3rem;
        padding: 0.5rem 1rem;
        margin-bottom: 1.5rem;
        border: 1px solid ${props => props.theme.grey[5]};
        &:focus {
          outline: 1px solid ${props => darken(0.2, props.theme.secondary)};
        }
      }
      .tags-wrapper {
        width: 100%;
        padding: 1rem 1rem;
        border: 1px solid ${props => props.theme.grey[5]};
        input {
          width: inherit;
          border: 0;
          outline: 0;
          font-family: 'Roboto';
          font-size: 1.3rem;
        }
      }
    }
    .right {
      height: 55rem;
      padding-left: 1.5rem;
      .premiere-banner {
        width: 100%;
      }
      .premiere-heading {
        font-family: 'Roboto Bold';
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
      }
      .premiere-text {
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
      }
      ul {
        font-size: 1.3rem;
        padding-left: 0.5rem;
        margin: 0;
        list-style: none;
      }
      select {
        width: 100%;
        font-family: 'Roboto';
        font-size: 1.1rem;
        background: ${props => props.theme.grey[0]};
        padding: 0.75rem;
        margin-top: 1rem;
        &:focus {
          outline: 1px solid ${props => darken(0.2, props.theme.secondary)};
        }
        option {
          font-family: 'Roboto';
          font-size: 1.3rem;
        }
      }
    }
  }
`

const BasicForm = ({ title, description, tag, tags, isPublic, onChange }) => (
  <Form>
    <div className="basic-top">
      <fieldset className="left">
        <input type="text" name="title" placeholder="Title" value={title} onChange={onChange} />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={onChange}
          rows={5}
        />
        <div className="tags-wrapper">
          <input
            type="text"
            name="tag"
            placeholder={tags.length ? '' : 'Tags (e.g. albert einstein, flying pig, mashup)'}
            value={tag}
            onChange={onChange}
          />
        </div>
      </fieldset>
      <fieldset className="right">
        <img
          className="premiere-banner"
          src="https://s3-us-west-1.amazonaws.com/faketube/assets/upload-premiere-promo.png"
        />
        <div className="premiere-heading">New! Premieres</div>
        <div className="premiere-text">
          Make it a moment! Build the hype and get fans excited about your next video.
        </div>
        <ul>
          <li>Schedule your Premiere</li>
          <li>Share your watch page URL with your fans</li>
          <li>Chat with fans before and during the Premiere</li>
          <li>Watch the Premiere with fans in real time</li>
        </ul>
        <select name="isPublic" value={isPublic} onChange={onChange}>
          <option value={true}>Public</option>
          <option value={false}>Private</option>
        </select>
      </fieldset>
    </div>
  </Form>
)

export default BasicForm
