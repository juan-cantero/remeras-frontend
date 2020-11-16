import { BrowserRouter as Router, Route } from 'react-router-dom';

import React from 'react';
import Layout from '../components/ui-layout/Layout';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShippingScreen from '../screens/ShippingScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import OrderScreen from '../screens/OrderScreen';
import SuccessScreen from '../screens/SucessScreen';

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Route path="/success" component={SuccessScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentMethodScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart" component={CartScreen} />
        <Route path="/" exact component={HomeScreen} />
      </Layout>
    </Router>
  );
};

export default AppRouter;
