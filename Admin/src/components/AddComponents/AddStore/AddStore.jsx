/* eslint-disable jsx-a11y/alt-text */
import Fade from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { addStore } from "../../../app/ApiResult";
import { context } from "../../../app/Context";
import { storage } from "../../../app/firebaseUpload";
import Store from "./../../Store/index.";
import "./styles.scss";
function AddStore() {
  const Context = useContext(context);
  const { setBodyAdmin, setFillerAdmin } = Context;
  const { enqueueSnackbar } = useSnackbar();
  const [valueData, setValueData] = useState({
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (urlImage) {
      const res = await addStore({ ...valueData, Photo: urlImage });

      if (res?.success) {
        enqueueSnackbar("Tải lên thành công", { variant: "success" });
      } else {
        enqueueSnackbar("Có lỗi xảy ra xin hãy thử lại!", {
          variant: "warning",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlImage]);
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
    }
  };
  return (
    <div className="AddStore">
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
          <h2 className="text-center pt-4 ">Thêm cửa hàng mới</h2>

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
                <label htmlFor="floatingInput">Tên của hàng</label>
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
            </div>
            <div className="textRight">
              <input
                type="file"
                id="inputFile"
                onChange={(e) => HandleChangeImg(e)}
              />
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
                  name="LinkGG"
                  color="warning"
                  value={valueData?.LinkGG}
                  onChange={(e) => handleChangeData(e)}
                />
                <label htmlFor="floatingInput">Địa chỉ GoogleMap</label>
              </div>
              <div className="form-floating mb-3 inputData">
                <input
                  type="text"
                  className="form-control "
                  name="District"
                  color="warning"
                  value={valueData?.District}
                  onChange={(e) => handleChangeData(e)}
                />
                <label htmlFor="floatingInput">Quận (Số quận)</label>
              </div>
            </div>

            <div className="button__submit">
              <button
                type="submit"
                className="btn btn-success"
                style={{ minWidth: "200px", width: "100%", flex: "2" }}
                onClick={HandeladdStore}
              >
                Thêm cửa hàng
              </button>
            </div>
          </div>
        </Paper>
      </Fade>
    </div>
  );
}

export default AddStore;
