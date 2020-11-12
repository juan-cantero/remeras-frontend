import { BrowserRouter as Router, Route } from 'react-router-dom';

import React from 'react';
import Layout from '../components/ui-layout/Layout';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart" component={CartScreen} />
        <Route path="/" exact component={HomeScreen} />
      </Layout>
    </Router>
  );
};

export default AppRouter;
