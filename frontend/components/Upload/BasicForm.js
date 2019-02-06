import styled from 'styled-components'

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
      & > :first-child,
      textarea {
        width: 100%;
        font-family: 'Roboto';
        font-size: 1.3rem;
        padding: 0.5rem 1rem;
        margin-bottom: 1.5rem;
        border: 1px solid ${props => props.theme.grey[5]};
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
    }
  }
`

const BasicForm = ({ title, description, tag, tags, onChange }) => (
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
      <fieldset className="right">right</fieldset>
    </div>
  </Form>
)

export default BasicForm
