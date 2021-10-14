import { Box } from '@chakra-ui/layout';
import { Navbar } from 'components';
import { AdminPage, GetTokenPage, HomePage } from 'pages';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <Box color="blackAlpha.700">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/get-token" component={GetTokenPage} />
        <Route path="/admin" component={AdminPage} />
      </Switch>
    </Box>
  );
}

export default App;
