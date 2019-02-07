import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { darken } from 'polished'
import theme from './styles/Theme'
import User from './User'
import Meta from './Meta'
import Header from './Header'
import Drawer from './Drawer'

const StyledPage = styled.div`
  background: ${props => props.theme.white};
  color: ${props => props.theme.black[0]};
`

const Inner = styled.div`
  height: calc(100vh - 5.5rem);
  overflow: auto;
  margin: 0 auto;
  background: ${props => props.theme.grey[0]};
`

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url('/static/Roboto-Regular.ttf') format('opentype');
    font-display: auto;
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto Bold';
    src: url('/static/Roboto-Bold.ttf') format('opentype');
    font-display: auto;
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto Mono';
    src: url('/static/RobotoMono-Regular.ttf') format('opentype');
    font-display: auto;
    font-weight: normal;
    font-style: normal;
  }
  html {
    scroll-behavior: smooth;
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto';
    font-size: 1.5rem;
  }
  a {
    text-decoration: none;
  }
  input,
  textarea {
    &:focus {
      outline-color: ${darken(0.2, theme.secondary)};
    }
  }
`

export default class Page extends React.Component {
  state = {
    drawer: false
  }

  openDrawer = () => this.setState({ drawer: true })

  closeDrawer = () => this.setState({ drawer: false })

  render() {
    return (
      <ThemeProvider theme={theme}>
        <User>
          {({ loading, data }) => {
            if (loading) return null
            return (
              <StyledPage>
                <GlobalStyle />
                <Meta />
                <Header user={data.me} openDrawer={this.openDrawer} />
                <Inner>
                  {React.Children.map(this.props.children, child =>
                    React.cloneElement(child, {
                      user: data.me
                    })
                  )}
                </Inner>
                <Drawer show={this.state.drawer} closeDrawer={this.closeDrawer} />
              </StyledPage>
            )
          }}
        </User>
      </ThemeProvider>
    )
  }
}
