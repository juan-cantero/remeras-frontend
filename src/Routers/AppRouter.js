import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
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
import UserListScreen from '../screens/UserListScreen';
import { PrivateRoute } from './PrivateRoute';
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      setIsAdmin(true);
    }
  }, [isAdmin, userInfo]);
  return (
    <Router>
      <Layout>
        <Route path="/success" component={SuccessScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <PrivateRoute
          path="/shipping"
          component={ShippingScreen}
          isAuthenticated={userInfo}
        />
        <PrivateRoute
          path="/payment"
          component={PaymentMethodScreen}
          isAuthenticated={userInfo}
        />
        <PrivateRoute
          path="/placeorder"
          component={PlaceOrderScreen}
          isAuthenticated={userInfo}
        />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart" component={CartScreen} />
        <PrivateRoute
          path="/admin/userlist"
          component={UserListScreen}
          isAuthenticated={userInfo}
          isAdmin={isAdmin}
        />
        <Route path="/" exact component={HomeScreen} />
        <Redirect to="/" />
      </Layout>
    </Router>
  );
};

export default AppRouter;
