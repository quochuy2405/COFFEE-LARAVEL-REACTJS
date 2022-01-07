import { useSnackbar } from "notistack";
import React, { memo, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../app/AuthContext";
import "./styles.scss";
function SignIn(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [dataFrom, setDataform] = useState({
    Name: "",
    Username: "",
    password: "",
    email: "",
    Phone: "",
    ConfirmPassword: "",
  });

  var redirect = useHistory();
  const { Username, Phone, password, ConfirmPassword, email, Name } = dataFrom;
  const OnchangedataForm = (event) =>
    setDataform({ ...dataFrom, [event.target.name]: event.target.value });
  const { signUpUser } = useContext(AuthContext);

  const SignIn = async (event) => {
    event.preventDefault();
    if (password.length > 0 && password === ConfirmPassword) {
      try {
        const res = await signUpUser(dataFrom);
        if (res?.success) {
          enqueueSnackbar("Thành công", { variant: "success" });
          redirect.push("/login");
        } else {
          if (res?.data !== 1) {
            JSON.parse(res?.data).forEach((item) => {
              enqueueSnackbar(item + " is used!!!", { variant: "error" });
            });
          } else {
            enqueueSnackbar("Thất bại", { variant: "error" });
          }
        }
      } catch (error) {}
    } else {
      enqueueSnackbar("Mật khẩu không khớp", { variant: "error" });
    }
  };

  return (
    <div className="body_Page">
      <div className="SignIn">
        {" "}
        <div className="signinFrom">
          <div className="img_group">
            <i className="content">Cùng thưởng thức một tách cà phê nào !!!</i>
            <img
              src="https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=2260&h=2750&dpr=1"
              alt=""
            />
          </div>
          <div className="signin">
            <form onSubmit={SignIn}>
              <h2 className="title">Đăng Ký</h2>
              <div className="formSignUp">
                <div className="input_signin input_signin1 input_username">
                  <i className="fad fa-user"></i>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    placeholder="Họ Tên"
                    onChange={OnchangedataForm}
                    value={Name}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("Hãy nhập họ và tên")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    required
                  />
                </div>
                <div className="input_signin input_signin2 input_username">
                  <i className="fad fa-user-shield"></i>
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
                <div className="input_signin input_signin3 input_username">
                  <i className="fad fa-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    onChange={OnchangedataForm}
                    value={email}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("Hãy nhập email")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    required
                  />
                </div>
                <div className="input_signin input_signin4 input_email">
                  <i className="fas fa-mobile-alt"></i>
                  <input
                    type="text"
                    id="Phone"
                    name="Phone"
                    placeholder="Số điện thoại"
                    onChange={OnchangedataForm}
                    value={Phone}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("Hãy nhập số điện thoại")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    required
                  />
                </div>
                <div className="input_signin input_signin5 input_password">
                  <i className="fal fa-lock-alt"></i>
                  <input
                    type="password"
                    className="input_password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={OnchangedataForm}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("Hãy nhập mật khẩu")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    required
                  />
                </div>
                <div className="input_signin input_signin6 input_password">
                  <i className="far fa-check-circle"></i>
                  <input
                    type="password"
                    className="input_password"
                    name="ConfirmPassword"
                    onInvalid={(e) =>
                      e.target.setCustomValidity("Hãy xác nhận lại mật khẩu")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    placeholder="Nhập lại mật khẩu"
                    value={ConfirmPassword}
                    onChange={OnchangedataForm}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success">
                <b>Đăng ký</b>
              </button>
            </form>
          </div>

          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
}
export default memo(SignIn);
