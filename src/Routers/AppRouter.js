import { BrowserRouter as Router, Route } from 'react-router-dom';

import React from 'react';
import Layout from '../components/ui-layout/Layout';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/product/:id" component={ProductScreen} />
      </Layout>
    </Router>
  );
};

export default AppRouter;
