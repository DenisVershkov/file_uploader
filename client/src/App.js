import { Route, Switch, useHistory } from 'react-router-dom';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import MainPAge from './components/MainPage/MainPage';
import StartPage from './components/StartPAge/StartPage';
import { useDispatch } from 'react-redux';
import { checkAuth } from './redux/actions/user.ac';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <Switch>
      <Route exact path="/auth">
        <StartPage />
      </Route>
      <PrivateRoute exact path="/main">
        <MainPAge />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
