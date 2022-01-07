/* eslint-disable jsx-a11y/alt-text */
import Fade from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { addManager, getStoreWithoutmagerId } from "../../../app/ApiResult";
import { context } from "../../../app/Context";
import Managers from "../../Managers";
import "./styles.scss";
function AddManagers(props) {
  const Context = useContext(context);
  const { setBodyAdmin, setFillerAdmin } = Context;
  const { enqueueSnackbar } = useSnackbar();
  const [valueData, setValueData] = useState({
    Name: "",
    Age: "",
    Gender: 1,
    Phone: "",
    Email: "",
    Address: "",
    City: "",
    Country: "",
    Salary: "",
    Bonus: "",
    StoreId: "",
  });
  const [listStoreId, setListStoreId] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await getStoreWithoutmagerId(-1,"/stores/withoutmanager");
    setListStoreId(res);
    setValueData({ ...valueData, StoreId: res[0]?.Id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangeData = (event) => {
    setValueData({
      ...valueData,
      [event.target.name]: [event.target.value].toString(),
    });
  };

  const HandleUpload = async () => {
    const res = await addManager(valueData);
    if (res.success && res.message === "Yes") {
      enqueueSnackbar("Thành công", { variant: "success" });
    } else {
      enqueueSnackbar("Có lỗi xảy ra xin hãy thử lại!", { variant: "warning" });
    }
  };
  function Prev() {
    setBodyAdmin(<Managers />);
    setFillerAdmin("MANAGERS");
  }
  return (
    <div className="AddManagers">
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
          <h2 className="text-center pt-4 ">Thêm quản lý mới</h2>

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
              <label htmlFor="floatingInput">Họ và tên</label>
            </div>

            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control"
                name="Age"
                color="warning"
                value={valueData?.Age}
                onChange={(e) => handleChangeData(e)}
              />

              <label htmlFor="floatingInput">Tuổi</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Phone"
                color="warning"
                value={valueData?.Phone}
                onChange={(e) => handleChangeData(e)}
              />
              <label htmlFor="floatingInput">Số điện thoại</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="Email"
                className="form-control "
                name="Email"
                color="warning"
                value={valueData?.Email}
                onChange={(e) => handleChangeData(e)}
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <select
                className="form-control "
                name="Gender"
                color="warning"
                value={valueData?.Gender}
                onChange={(e) => handleChangeData(e)}
              >
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
              </select>

              <label htmlFor="floatingInput">Giới tính</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Address"
                color="warning"
                value={valueData?.Address}
                onChange={(e) => handleChangeData(e)}
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
                onChange={(e) => handleChangeData(e)}
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
                onChange={(e) => handleChangeData(e)}
              />
              <label htmlFor="floatingInput">Đất nước</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Salary"
                color="warning"
                value={valueData?.Salary}
                onChange={(e) => handleChangeData(e)}
              />
              <label htmlFor="floatingInput">Mức lương</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <input
                type="text"
                className="form-control "
                name="Bonus"
                color="warning"
                value={valueData?.Bonus}
                onChange={(e) => handleChangeData(e)}
              />
              <label htmlFor="floatingInput">Thưởng</label>
            </div>
            <div className="form-floating mb-3 inputData">
              <select
                type="text"
                className="form-control "
                name="StoreId"
                color="warning"
                value={valueData?.StoreId}
                onChange={(e) => handleChangeData(e)}
              >
                {listStoreId?.map((item, index) => (
                  <option key={index} value={item?.Id}>
                    {item.StoreName}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingInput">Cửa hàng trực thuộc</label>
            </div>

            <div className="button__submit">
              <button
                type="submit"
                className="btn btn-success"
                style={{ minWidth: "200px", width: "100%" }}
                onClick={HandleUpload}
              >
                Thêm quản lý
              </button>
            </div>
          </div>
        </Paper>
      </Fade>
    </div>
  );
}

export default AddManagers;
