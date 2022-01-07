import jwt_decode from "jwt-decode";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { context } from "../../app/Context";
import { AuthContext } from "./../../app/AuthContext";
import "./styles.scss";
function Login(props) {
  let history = useHistory();
  const [dataFrom, setDataform] = useState({
    Username: "",
    password: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const { Username, password } = dataFrom;
  const OnchangedataForm = (event) =>
    setDataform({ ...dataFrom, [event.target.name]: event.target.value });
  const { loginUser } = useContext(AuthContext);
  const { setCheckToken } = useContext(context);
  useEffect(() => {
    if (localStorage?.getItem("TokenAdminCoffee")) {
      const token = localStorage?.getItem("TokenAdminCoffee");
      var decoded = jwt_decode(token);
      if (decoded?.Id) {
        setCheckToken(token);
        history.push("/auth/admin");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
  const Login = async (event) => {
    event.preventDefault();
    try {
      const logindata = await loginUser(dataFrom);
      if (logindata?.Token) {
        var decoded = jwt_decode(logindata?.Token);
        if (decoded?.Id) {
          localStorage.setItem("TokenAdminCoffee", logindata?.Token);
          history.push("/auth/admin");
        }
      } else {
        enqueueSnackbar("Đăng nhâp không thành công", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Đăng nhâp không thành công", { variant: "error" });
    }
  };

  return (
    <div className="Login">
      {" "}
      <div className="loginFrom">
        <div className="img_group">
          <i className="content">Cùng thưởng thức một tách cà phê nào !!!</i>
          <img
            src="https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=2260&h=2750&dpr=1"
            alt=""
          />
        </div>
        <div className="login">
          <form onSubmit={Login}>
            <h2 className="title">Đăng nhập</h2>
            <div className="input_login input_username">
              <i className="fas fa-user-astronaut"></i>
              <input
                type="text"
                id="username"
                name="Username"
                placeholder="Tên đăng nhập"
                onChange={OnchangedataForm}
                value={Username}
                onInvalid={(e) =>
                  e.target.setCustomValidity("Hãy nhập tên đăng nhập")
                }
                onInput={(e) => e.target.setCustomValidity("")}
                required
              />
            </div>

            <div className="input_login input_password">
              <i className="fal fa-lock-alt"></i>
              <input
                type="password"
                className="input_password"
                name="password"
                placeholder="Mật khẩu"
                value={password}
                onInvalid={(e) =>
                  e.target.setCustomValidity("Hãy nhập mật khẩu")
                }
                onInput={(e) => e.target.setCustomValidity("")}
                onChange={OnchangedataForm}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <b>Đăng nhập</b>
            </button>
          </form>
        </div>

        <div className="dot"></div>
      </div>
    </div>
  );
}
export default Login;
