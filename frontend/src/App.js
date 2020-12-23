import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import CartScreen from "./Screen/CartScreen";
import HomeScreen from "./Screen/HomeScreen";
import OrderHistoryScreen from "./Screen/OrderHistoryScreen";
import OrderScreen from "./Screen/OrderScreen";
import PaymentMethodScreen from "./Screen/PaymentMethodScreen";
import PlaceOrderScreen from "./Screen/PlaceOrderScreen";
import ProductScreen from "./Screen/ProductScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import RegisterScreen from "./Screen/RegisterScreen";
import ShippingAddressScreen from "./Screen/ShippingAddressScreen";
import SigninScreen from "./Screen/SigninScreen";
import ProductListScreen from "./Screen/ProductListScreen";
import ProductEditScreen from "./Screen/ProductEditScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./Screen/SearchScreen";
import { listProductCategories } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import ProductCreateScreen from "./Screen/ProductCreateScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <Router>
      <div className="container-fluid">
        <header className="row">
          <div className="col-sm-4 justify-content-center">
            <button type="button" className="open-sidebar" onClick={() => setSidebarIsOpen(true)}>
              <i className="menu-icon fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              BePretty.com
            </Link>
          </div>
          <div className="col-sm-4 text-center fn align-self-center">
            <Route render={({ history }) => <SearchBox history={history}></SearchBox>}></Route>
          </div>
          <div className="col-sm-4 text-right align-self-center">
            <Link to="/cart">
              <i className="cart-icon fa fa-shopping-cart"></i>
              {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link to={`/search/category/${c}`} onClick={() => setSidebarIsOpen(false)}>
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>

        <main className="row">
          <switch className="col-sm-12">
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen} exact></Route>
            <AdminRoute path="/product/:id/edit" component={ProductEditScreen} exact></AdminRoute>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <PrivateRoute path="/order/:id" component={OrderScreen}></PrivateRoute>
            <PrivateRoute path="/orderhistory" component={OrderHistoryScreen} exact></PrivateRoute>
            <PrivateRoute
              path="/orderhistory/pageNumber/:pageNumber"
              component={OrderHistoryScreen}
              exact
            ></PrivateRoute>
            <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
            <Route path="/search/category/:category" component={SearchScreen} exact></Route>
            <Route
              path="/search/category/:category/name/:name"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              component={SearchScreen}
              exact
            ></Route>
            <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
            <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
            <AdminRoute
              path="/productlist/pageNumber/:pageNumber"
              component={ProductListScreen}
              exact
            ></AdminRoute>
            <AdminRoute path="/productcreate" component={ProductCreateScreen} exact></AdminRoute>
            <Route exact path="/" component={HomeScreen}></Route>
            <Route exact path="/pageNumber/:pageNumber" component={HomeScreen}></Route>
          </switch>
        </main>
        <footer className="row fixed-bottom">
          <div className="col-12 center pt-2">All right reserved</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
