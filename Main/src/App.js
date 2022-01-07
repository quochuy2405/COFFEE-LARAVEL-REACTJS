import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { memo, useEffect, useContext } from "react";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { Route, Switch, Redirect } from "react-router";
import "./App.css";
import Header from "./components/Header";
import Checkout from "./Page/Checkout";
import Home from "./Page/Home";
import Login from "./Page/Login";
import News from "./Page/News";
import NotFound from "./Page/NotFound";
import { default as Product } from "./Page/Product";
import SignUp from "./Page/SignUp";
import Store from "./Page/Store/index.";
import "./responsive.css";
import DetailsUser from "./Page/DetailsUser/index";
import DetailNews from "./Page/DetailNews/DetailNews";
import { context } from "./app/Context";

function App() {
  const { checkToken } = useContext(context);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/product" component={Product} exact />
          <Route path="/news" component={News} exact />
          <Route path="/news/:id" component={DetailNews} />
          <Route path="/store" component={Store} exact />
          <Route
            path="/checkout"
            exact
            render={(props) =>
              checkToken ? <Checkout /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/login"
            exact
            render={(props) => (!checkToken ? <Login /> : <Redirect to="/" />)}
          />
          <Route
            path="/signin"
            exact
            render={(props) => (!checkToken ? <SignUp /> : <Redirect to="/" />)}
          />
          <Route
            path="/user"
            exact
            render={(props) =>
              checkToken ? <DetailsUser /> : <Redirect to="/" />
            }
          />
          <Route path="/:slug" component={NotFound} />
        </Switch>
      </div>
      <MessengerCustomerChat pageId="111223271362400" appId="477337363536411" />
    </>
  );
}

export default memo(App);
