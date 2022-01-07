import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { memo, useEffect } from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import "./App.css";
import { context } from "./app/Context";
import Admin from "./Page/Admin/index";
import Login from "./Page/Login";
import NotFound from "./Page/NotFound/index";
import "./responsive.css";

function App() {
  const { checkToken } = useContext(context);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <div className="App">
        <Switch>
          <Route
            path="/auth/admin"
            exact
            render={(props) => (checkToken ? <Admin /> : <Redirect to="/" />)}
          />
          <Route
            path="/"
            exact
            render={(props) =>
              checkToken ? <Redirect to="/auth/admin" /> : <Login />
            }
          />
          <Route path="/:slug" component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

export default memo(App);
