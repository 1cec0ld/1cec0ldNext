import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../styles/index.scss'
import Global from '../components/global.js'

export default function MyApp({ Component, pageProps }) {

  const [theme, setTheme] = useState(createTheme({palette: {mode: 'dark'}}))

  useEffect(() => {
    import( '../utilities/theme.js' )
      .then( () => {
        if( document.color !== theme.palette.mode ) {
          setTheme(
            createTheme({
              palette: {
                mode: document.color || 'dark',
              },
            })
          )
        }
      })
  })

  return (
    <ThemeProvider theme={theme}>
      <Global>
        <Component {...pageProps} />
      </Global>
    </ThemeProvider>
  )
}