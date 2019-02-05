import styled from 'styled-components'

const Tabs = styled.div`
  align-self: flex-end;
  display: flex;
`

const Tab = styled.div`
  font-family: 'Roboto Bold';
  font-size: 1.1rem;
  padding: 0 1rem 2rem 1rem;
  margin-right: 2rem;
  cursor: pointer;
  border-bottom: 4px solid
    ${props => (props.index === props.tab ? props.theme.primary : 'transparent')};
  &:hover {
    border-bottom: 4px solid ${props => props.theme.primary};
  }
`

const TabBar = ({ tab, onTabClick }) => (
  <Tabs>
    <Tab index={0} tab={tab} onClick={() => onTabClick(0)}>
      Basic info
    </Tab>
    <Tab index={1} tab={tab} onClick={() => onTabClick(1)}>
      Translations
    </Tab>
    <Tab index={2} tab={tab} onClick={() => onTabClick(2)}>
      Advanced settings
    </Tab>
  </Tabs>
)

export default TabBar
