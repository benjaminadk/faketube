import styled from 'styled-components'
import formatCategory from '../../lib/formatCategory'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  .heading {
    font-family: 'Roboto Bold';
    font-size: 1.3rem;
    color: ${props => props.theme.grey[14]};
    margin-bottom: 0.5rem;
  }
  select {
  }
`

const categories = [
  'FILM_ANIMATION',
  'AUTOS_VEHICLES',
  'MUSIC',
  'PETS_ANIMALS',
  'SPORTS',
  'TRAVEL_EVENTS',
  'GAMING',
  'PEOPLE_BLOGS',
  'COMEDY',
  'ENTERTAINMENT',
  'NEWS_POLITICS',
  'HOWTO_STYLE',
  'EDUCATION',
  'SCIENCE_TECHNOLOGY',
  'NONPROFITS_ACTIVISM'
]

const AdvancedForm = ({ category, onChange }) => (
  <Container>
    <div>right</div>
    <div>
      <div className="category">
        <div className="heading">Category</div>
        <select name="category" value={category} onChange={onChange}>
          {categories.map(c => (
            <option key={c} value={c}>
              {formatCategory(c)}
            </option>
          ))}
        </select>
      </div>
    </div>
  </Container>
)

export default AdvancedForm
