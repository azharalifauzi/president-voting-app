import { Box } from '@chakra-ui/layout';
import { Navbar } from 'components';
import { HomePage } from 'pages';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <Box color="blackAlpha.700">
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </Box>
  );
}

export default App;
