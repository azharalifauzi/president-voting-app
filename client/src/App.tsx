import { Box } from '@chakra-ui/layout';
import { Navbar } from 'components';
import { GetTokenPage, HomePage } from 'pages';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <Box color="blackAlpha.700">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/get-token" component={GetTokenPage} />
      </Switch>
    </Box>
  );
}

export default App;
