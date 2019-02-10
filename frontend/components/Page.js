import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { darken } from 'polished'
import Router from 'next/router'
import NProgress from 'nprogress'
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
  textarea, 
  select {
    &:focus {
      outline: 1px solid ${darken(0.2, theme.secondary)};
    }
  }
  select {
    font-family: 'Roboto';
    font-size: 1.1rem;
    background: ${theme.grey[0]};
    padding: 0.75rem;
  }
  option {
    font-family: 'Roboto';
    font-size: 1.3rem;
  }
`

export default class Page extends React.Component {
  state = {
    drawer: false,
    backdrop: false
  }

  componentDidMount() {
    Router.onRouteChangeStart = () => {
      NProgress.start()
    }

    Router.onRouteChangeComplete = () => {
      NProgress.done()
      this.setState({ backdrop: false })
    }

    Router.onRouteChangeError = () => {
      NProgress.done()
    }
  }

  openDrawer = () => this.setState({ drawer: true, backdrop: true })

  closeDrawer = () => this.setState({ drawer: false, backdrop: false })

  render() {
    const {
      state: { drawer, backdrop },
      props: { pathname }
    } = this
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
                      user: data.me,
                      drawer
                    })
                  )}
                </Inner>
                <Drawer
                  show={drawer}
                  backdrop={backdrop}
                  pathname={pathname}
                  closeDrawer={this.closeDrawer}
                />
              </StyledPage>
            )
          }}
        </User>
      </ThemeProvider>
    )
  }
}
