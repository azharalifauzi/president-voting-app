import { Navbar } from 'components';
import { HomePage } from 'pages';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </>
  );
}

export default App;
