/* eslint-disable jsx-a11y/alt-text */
import Fade from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import {
  getManagerWithoutStore,
  getStoreByDistrict,
  getStoreId,
  updateStore,
} from "../../app/ApiResult";
import { context } from "../../app/Context";
import { storage } from "../../app/firebaseUpload";
import Store from "../Store/index.";
import "./stylesUpdateComponent/UpdateStore.scss";
function UpdateStore({ id }) {
  const Context = useContext(context);
  const { setBodyAdmin, setFillerAdmin } = Context;
  const { enqueueSnackbar } = useSnackbar();
  const [manager, setManager] = useState([]);
  const [district, setDistrict] = useState([]);
  const [flag, setFlag] = useState(false);
  const [valueData, setValueData] = useState({
    Id: "",
    StoreName: "",
    Description: "",
    Address: "",
    Country: "",
    Phone: "",
    Photo: "",
    LinkGG: "",
    District: "",
    ManagerId: "",
  });
  const Fetch = async () => {
    const storeId = await getStoreId(id, "/store");
    const Manager = await getManagerWithoutStore();
    const District = await getStoreByDistrict();

    setValueData({
      Id: storeId?.Id,
      StoreName: storeId?.StoreName,
      Description: storeId?.Description,
      Address: storeId?.Address,
      Country: storeId?.Country,
      Phone: storeId?.Phone,
      Photo: storeId?.Photo,
      LinkGG: storeId?.LinkGG,
      District: storeId?.District || District[0]?.District,
      ManagerId: storeId?.ManagerId || Manager[0]?.Id,
    });
    setManager(Manager);
    setDistrict(District);
  };
  useEffect(() => {
    Fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangeData = (event) => {
    setValueData({ ...valueData, [event.target.name]: event.target.value });
  };
  function Prev() {
    setBodyAdmin(<Store />);
    setFillerAdmin("STORE");
  }
  const [urlImage, setUrlimage] = useState(undefined);
  const [image, setImage] = useState();
  var HandleChangeImg = (e) => {
    const file = e.target?.files[0];

    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!validImageTypes.includes(fileType)) {
        enqueueSnackbar("Sai định dạng", { variant: "error" });
        setImage(undefined);
      } else {
        if (file) {
          setImage(file);
          file.preview = URL.createObjectURL(file);
        }
      }
    }
  };

  const HandeladdStore = async () => {
    if (image) {
      const UploadTask = storage.ref(`imageProducts/${image.name}`).put(image);
      UploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setUrlimage(null);
        },
        () => {
          storage
            .ref("imageProducts")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrlimage(url);
            })
            .catch((error) => {
              setUrlimage(null);
            });
        }
      );
    } else {
      setUrlimage(null);
      setFlag(!flag);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (valueData?.Id) {
      const Photo = urlImage || valueData?.Photo;
      const res = await updateStore({ ...valueData, Photo: Photo });
      if (res?.success) {
        enqueueSnackbar("Tải lên thành công", { variant: "success" });
      } else {
        enqueueSnackbar("Có lỗi xảy ra xin hãy thử lại", {
          variant: "warning",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlImage, flag]);
  return (
    <div className="UpdateStore">
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
          <h2 className="text-center pt-4 ">Cập nhật hàng mới</h2>

          <div className="dataAdd">
            <div className="textLeft">
              <div className="form-floating mb-3 inputData">
                <input
                  type="text"
                  className="form-control "
                  name="StoreName"
                  color="warning"
                  value={valueData?.StoreName}
                  onChange={(e) => handleChangeData(e)}
                />
                <label htmlFor="floatingInput">Tên cửa hàng</label>
              </div>
              <div className="form-floating mb-3 inputData">
                <select
                  className="form-control "
                  name="ManagerId"
                  color="warning"
                  value={valueData.ManagerId}
                  onChange={(e) => handleChangeData(e)}
                >
                  {manager?.map((item, index) => (
                    <option
                      selected={item?.Id === valueData?.ManagerId && "selected"}
                      key={index}
                      value={item?.Id}
                    >
                      {item?.Name}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingInput">Quản lý</label>
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
                  type="text"
                  className="form-control"
                  name="Description"
                  color="warning"
                  value={valueData?.Description}
                  onChange={(e) => handleChangeData(e)}
                />

                <label htmlFor="floatingInput">Mô tả cửa hàng</label>
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
            </div>
            <div className="textRight">
              <input type="file" id="inputFile" onChange={HandleChangeImg} />
              <label
                className="inputFileLabel label--input inputData "
                htmlFor="inputFile"
              >
                <div className="box_input">
                  <p className="text-center textUpload ">Hình ảnh mô tả</p>
                  {image ? (
                    <img className="img_preview" src={image.preview} />
                  ) : (
                    valueData?.Photo && (
                      <img className="img_preview" src={valueData?.Photo} />
                    )
                  )}
                  <i className="fad fa-plus-circle iconUpLoad"></i>
                </div>
              </label>

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
                  name="LinkGG"
                  color="warning"
                  value={valueData?.LinkGG}
                  onChange={(e) => handleChangeData(e)}
                />
                <label htmlFor="floatingInput">Địa chỉ GoogleMap</label>
              </div>
              <div className="form-floating mb-3 inputData">
                <select
                  className="form-control "
                  name="District"
                  color="warning"
                  value={valueData?.District}
                  onChange={(e) => handleChangeData(e)}
                >
                  {district?.map((item, index) => (
                    <option
                      selected={
                        item?.District === valueData?.District && "selected"
                      }
                      key={index}
                      value={item.District}
                    >
                      Quận {item.District}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingInput">Quận</label>
              </div>
            </div>

            <div className="button__submit">
              <button
                type="submit"
                className="btn btn-success"
                style={{ minWidth: "200px", width: "100%", flex: "2" }}
                onClick={HandeladdStore}
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

export default UpdateStore;
