import './App.css';
import React from 'react';
import { BrowserRouter, Switch,Redirect, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Quotation from './pages/Quotation';
import Transaction from './pages/Transaction';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import ModalTransactionProvider from './components/modalStartTransactionProvider';
import PrivateRoute from './components/routeTypes/PrivateRoute'
import PublicRoute from './components/routeTypes/PublicRoute'
import Activities from './pages/Activities';
import Users from './pages/Users';

const App = () => {

    const theme = createTheme({
        status: {
          danger: "red",
        },
      });


  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <ModalTransactionProvider>
          <Switch>
              <PublicRoute path="/register" component={Register} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/quotations" component={Quotation} />
              <PrivateRoute path="/transactions/negociate/:userId/activity/:activityId" component={Transaction}/>
              <PrivateRoute path="/activities/:type/cripto/:cripto" component={Activities}/>
              <PrivateRoute path="/users" component={Users} />
              <Redirect from="/" to="/login" />
          </Switch>
          </ModalTransactionProvider>
      </BrowserRouter>
      </ThemeProvider>
  );

}

export default App;
