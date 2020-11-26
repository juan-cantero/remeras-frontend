import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

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
import UserEditScreen from '../screens/UserEditScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductEditScreen from '../screens/ProductEditScreen';
import OrderListScreen from '../screens/OrderListScreen';
import useAuth from '../hooks/useAuth';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import Switch from 'react-bootstrap/esm/Switch';
import FilteredByGenreScreen from '../screens/FilteredByGenreScreen';

const AppRouter = () => {
  const [isAuthenticated, isAdmin] = useAuth();
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/success" component={SuccessScreen} />
          <Route path="/detail/order/:id" component={OrderDetailScreen} />
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
            path="/admin/orderList"
            component={OrderListScreen}
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
          />
          <PrivateRoute
            path="/admin/productlist"
            exact
            component={ProductListScreen}
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
          />
          <PrivateRoute
            path="/admin/productlist/:page"
            exact
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
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
          />
          <PrivateRoute
            path="/admin/user/:id/edit"
            component={UserEditScreen}
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
          />
          <Route path="/search/:keyword" exact component={HomeScreen} />
          <Route
            path="/search/:keyword/page/:page"
            exact
            component={HomeScreen}
          />
          <Route
            path="/genre/:genre/page/:page"
            exact
            component={FilteredByGenreScreen}
          />
          <Route path="/genre/:genre" component={FilteredByGenreScreen} exact />
          <Route path="/page/:page" component={HomeScreen} exact />
          <Route path="/" exact component={HomeScreen} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </Router>
  );
};

export default AppRouter;
