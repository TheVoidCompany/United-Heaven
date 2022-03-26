import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import Map from './components/map/Map';
import NavBar from './components/NavBar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <Box w='100vw' h='92vh'>
        <Map />
      </Box>
    </ChakraProvider>
  );
}

export default App;
