import styled from 'styled-components'
import { darken } from 'polished'
import { Close } from 'styled-icons/material/Close'

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
        padding-left: 0.25rem;
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

const Tags = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 1rem;
  border: 1px solid ${props => props.theme.grey[5]};
  .tag {
    display: inline-flex;
    align-items: center;
    border: 1px solid ${props => props.theme.grey[5]};
    border-radius: 3px;
    padding: 0.25rem;
    padding-left: 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    span {
      font-family: 'Roboto';
      font-size: 1.3rem;
      margin-right: 0.25rem;
    }
    svg {
      width: 1.35rem;
      height: 1.35rem;
      color: ${props => props.theme.grey[10]};
      cursor: pointer;
    }
  }
`

const TagInput = styled.input.attrs(props => ({
  type: 'text',
  placeholder: props.tags ? '' : 'Tags (e.g. albert einstein, flying pig, mashup)',
  style: {
    display: props.tags ? 'inline' : 'block',
    width: props.tags ? (props.tag.length + 1) * 8 : '100%'
  }
}))`
  border: 0;
  outline: 0;
  font-family: 'Roboto';
  font-size: 1.3rem;
  padding: 0;
  &::placeholder {
    font-family: 'Roboto';
  }
`

const BasicForm = ({
  inputRef,
  title,
  description,
  tag,
  tags,
  isPublic,
  onChange,
  onTagsClick,
  onTagChange,
  onTagDelete,
  onTagKeyDown
}) => (
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
        <Tags onClick={onTagsClick}>
          {tags.map((t, i) => (
            <div key={i} className="tag">
              <span>{t}</span>
              <Close onClick={() => onTagDelete(i)} />
            </div>
          ))}
          <TagInput
            ref={inputRef}
            tag={tag}
            tags={!!tags.length}
            value={tag}
            onChange={onTagChange}
            onKeyDown={onTagKeyDown}
          />
        </Tags>
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
          <li>{'\u00b7'} Schedule your Premiere</li>
          <li>{'\u00b7'} Share your watch page URL with your fans</li>
          <li>{'\u00b7'} Chat with fans before and during the Premiere</li>
          <li>{'\u00b7'} Watch the Premiere with fans in real time</li>
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
