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
import UserEditScreen from '../screens/UserEditScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductEditScreen from '../screens/ProductEditScreen';

const AppRouter = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (userInfo) {
      setIsAuthenticated(true);
      if (userInfo.isAdmin) {
        setIsAdmin(true);
      }
    }
  }, [isAdmin, userInfo, isAuthenticated]);
  return (
    <Router>
      <Layout>
        <Route path="/success" component={SuccessScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <PrivateRoute
          path="/shipping"
          component={ShippingScreen}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/payment"
          component={PaymentMethodScreen}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/placeorder"
          component={PlaceOrderScreen}
          isAuthenticated={isAuthenticated}
        />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <PrivateRoute
          path="/admin/productlist"
          component={ProductListScreen}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
        />
        <Route path="/product/:id" component={ProductScreen} />
        <PrivateRoute
          path="/admin/product/:id/edit"
          component={ProductEditScreen}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
        />
        <Route path="/cart" component={CartScreen} />
        <PrivateRoute
          path="/admin/userlist"
          component={UserListScreen}
          isAuthenticated={userInfo}
          isAdmin={isAdmin}
        />
        <PrivateRoute
          path="/admin/user/:id/edit"
          component={UserEditScreen}
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
