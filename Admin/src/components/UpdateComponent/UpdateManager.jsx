/* eslint-disable jsx-a11y/alt-text */
import Fade from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import {
  getManagerId, getStoreWithoutmagerId,
  updateManager
} from "../../app/ApiResult";
import { context } from "../../app/Context";
import Managers from "../Managers";
import "./stylesUpdateComponent/UpdateManager.scss";
function UpdateManager(props) {
  const { id } = props;
  const Context = useContext(context);
  const { enqueueSnackbar } = useSnackbar();
  const { setBodyAdmin, setFillerAdmin } = Context;
  const [valueData, setValueData] = useState({
    Id: "",
    Name: "",
    Email: "",
    Phone: "",
    Age: "",
    Gender: "",
    City: "",
    Country: "",
    Address: "",
    StoreId: null,
    Salary: "",
    Bonus: "",
  });
  const [listStoreId, setListStoreId] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await getStoreWithoutmagerId(id, "/stores/withoutmanager");
    if(res)
    setListStoreId(res);
  }, [id]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await getManagerId(id, "/manager");
    if (result) {
      setValueData({
        ...valueData,
        Id: result?.Id,
        Name: result?.Name,
        Email: result?.Email,
        Phone: result?.Phone,
        Age: result?.Age,
        Gender: result?.Gender,
        Address: result?.Address,
        City: result?.City,
        Country: result?.Country,
        StoreId: result?.StoreId || listStoreId[0]?.Id,
        Salary: result?.Salary,
        Bonus: result?.Bonus,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, listStoreId]);
  function Prev() {
    setBodyAdmin(<Managers />);
    setFillerAdmin("MANAGERS");
  }
  const HandleUpload = async () => {
    const res = await updateManager(valueData);
    if (res.success && res.message === "Yes") {
      enqueueSnackbar("Đã xác nhận", { variant: "success" });
    } else {
      enqueueSnackbar("Có lỗi xảy ra xin hãy thử lại!", { variant: "warning" });
    }
  };
  const handleChange = (event) => {
    setValueData({ ...valueData, [event.target.name]: event.target.value });
  };
  return (
    <div className="UpdateManager">
      <Fade in={true} timeout={200} style={{ height: "100%" }}>
        <Paper>
          <button
            style={{ width: "fit-content", position: "absolute" }}
            type="button"
            className="btn btn-success d-flex gap-2"
            onClick={() => Prev()}
          >
            <i
              style={{ fontSize: "1.5rem" }}
              className="fad fa-chevron-circle-left"
            ></i>
            <p className> Quay lại</p>
          </button>
          <h2 className="text-center pt-4">Cập nhật quản lý </h2>
          <p style={{ width: "60%", margin: "0 auto" }}>Mã quản lý:{id}</p>
          <div className="dataUpdate">
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Name"
                color="warning"
                value={valueData?.Name}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="floatingInput">Họ và Tên</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Email"
                color="warning"
                value={valueData?.Email}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Phone"
                color="warning"
                value={valueData?.Phone}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="floatingInput">Số điện thoại</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Age"
                color="warning"
                value={valueData?.Age}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="floatingInput">Tuổi</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <select
                className="form-control "
                name="Gender"
                color="warning"
                value={valueData?.Gender}
                onChange={(e) => handleChange(e)}
              >
                {valueData?.Gender ? (
                  <>
                    {" "}
                    <option value="1">Nam</option> <option value="0">Nữ</option>
                  </>
                ) : (
                  <>
                    {" "}
                    <option value="0">Nữ</option> <option value="1">Nam</option>{" "}
                  </>
                )}
              </select>

              <label htmlFor="floatingInput">Giới tính</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Salary"
                color="warning"
                value={valueData?.Salary}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="floatingInput">Lương</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Bonus"
                color="warning"
                value={valueData?.Bonus}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="floatingInput">Thưởng</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Address"
                color="warning"
                value={valueData?.Address}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="floatingInput">Địa chỉ</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="City"
                color="warning"
                value={valueData?.City}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="floatingInput">Thành phố</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Country"
                color="warning"
                value={valueData?.Country}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="floatingInput">Đất nước</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <select
                type="text"
                className="form-control "
                name="StoreId"
                color="warning"
                value={valueData?.StoreId}
                onChange={(e) => handleChange(e)}
              >
                {listStoreId&&listStoreId?.map((item, index) => (
                  <option key={index} value={item?.Id}>
                    {item.StoreName}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingInput">Cửa hàng trực thuộc</label>
            </div>
            <div className="inputData">
              <button
                type="submit"
                className="btn btn-success inputData"
                style={{ width: "100%", margin: "0 auto" }}
                onClick={HandleUpload}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </Paper>
      </Fade>
    </div>
  );
}

export default UpdateManager;
