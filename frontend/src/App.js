import { ChakraProvider, theme } from '@chakra-ui/react';
import NavBar from './components/NavBar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
    </ChakraProvider>
  );
}

export default App;
