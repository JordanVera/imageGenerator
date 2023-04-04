import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Form from './Form';
import Appbar from './Appbar';

const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#00BBDC',
        secondary: '#77B6EA',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Appbar />
      <Container>
        <Form />
      </Container>
    </ThemeProvider>
  );
};

export default App;
