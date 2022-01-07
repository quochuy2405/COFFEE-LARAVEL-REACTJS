/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import Fade from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import {
  addAccount,
  getListRoleId,
  getManagerWithoutAccount,
} from "../../../app/ApiResult";
import { context } from "./../../../app/Context";
import Account from "./../../Account/index";
import "./styles.scss";
function AddAccount(props) {
  const Context = useContext(context);
  const { setBodyAdmin, setFillerAdmin } = Context;
  const { enqueueSnackbar } = useSnackbar();

  const [valueData, setValueData] = useState({
    Name: "",
    Username: "",
    password: "",
    RoleId: "",
    ManagerId: "",
  });
  const [listRoleId, setListRoleId] = useState();
  const [listManager, setListManager] = useState([]);
  useEffect(async () => {
    const res = await getListRoleId("/role");
    setListRoleId(res);
    setValueData({ ...valueData, RoleId: res[0]?.Id });
  }, []);
  useEffect(() => {
    if (Number(valueData?.RoleId) === 2) {
      const Managers = async () => {
        const response = await getManagerWithoutAccount();
        if (response) {
          setListManager(response);
          setValueData({ ...valueData, ManagerId: response[0]?.Id });
        }
      };
      Managers();
    } else {
      setValueData({ ...valueData, ManagerId: "" });
      setListManager([]);
    }
  }, [valueData?.RoleId]);
  const handleChangeData = (event) => {
    setValueData({
      ...valueData,
      [event.target.name]: event.target.value,
    });
  };
  const HandleUpload = async () => {
    const res = await addAccount(valueData);
    if (res.success && res.message === "Yes") {
      enqueueSnackbar("Thành công", { variant: "success" });
    } else {
      enqueueSnackbar("Có lỗi xảy ra xin hãy thử lại!", { variant: "warning" });
    }
  };
  function Prev() {
    setBodyAdmin(<Account />);
    setFillerAdmin("ACCOUNT");
  }
  return (
    <div className="AddAccount">
      <Fade in={true} timeout={200} style={{ height: "100%" }}>
        <Paper>
          <button
            type="button"
            className="btn btn-success d-flex gap-2"
            style={{ position: "absolute" }}
            onClick={() => Prev()}
          >
            <i
              style={{ fontSize: "1.5rem" }}
              className="fad fa-chevron-circle-left"
            ></i>
            <p className> Quay lại</p>
          </button>
          <h2 className="text-center pt-4">Tạo tài khoản mới a</h2>

          <div className="dataAdd">
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Name"
                color="warning"
                value={valueData?.Name}
                onChange={(e) => handleChangeData(e)}
              />
              <label htmlFor="floatingInput">Họ Tên</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Username"
                color="warning"
                value={valueData?.Username}
                onChange={(e) => handleChangeData(e)}
              />
              <label htmlFor="floatingInput">Username</label>
            </div>

            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control"
                name="password"
                color="warning"
                value={valueData?.password}
                onChange={(e) => handleChangeData(e)}
              />

              <label htmlFor="floatingInput">password</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <select
                type="text"
                className="form-control "
                name="RoleId"
                color="warning"
                value={valueData?.RoleId}
                onChange={(e) => handleChangeData(e)}
              >
                {listRoleId?.map((item, index) => (
                  <option key={index} value={item?.Id}>
                    {item?.RoleName}
                  </option>
                ))}
              </select>

              <label htmlFor="floatingInput">Quyền hạn</label>
            </div>
            {listManager?.length > 0 && (
              <div className="form-floating mb-3 inputData">
                <select
                  type="text"
                  className="form-control "
                  name="ManagerId"
                  color="warning"
                  value={valueData?.ManagerId}
                  onChange={(e) => handleChangeData(e)}
                >
                  {listManager?.map((item, index) => (
                    <option key={index} value={item?.Id}>
                      {item?.Name}
                    </option>
                  ))}
                </select>

                <label htmlFor="floatingInput">Chọn quản lý</label>
              </div>
            )}

            <div className="inputData">
              <button
                type="submit"
                className="btn btn-success inputData"
                style={{ width: "100%", margin: "0 auto" }}
                onClick={HandleUpload}
              >
                Tạo tài khoản
              </button>
            </div>
          </div>
        </Paper>
      </Fade>
    </div>
  );
}

export default AddAccount;
