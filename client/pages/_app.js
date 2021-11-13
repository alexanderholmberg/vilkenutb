import '../styles/globals.css'
//import '../styles/fbDrop.css'
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../utils/themes';
import { AppProvider } from '../context/AppContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ThemeProvider>
  )
}

export default MyApp
