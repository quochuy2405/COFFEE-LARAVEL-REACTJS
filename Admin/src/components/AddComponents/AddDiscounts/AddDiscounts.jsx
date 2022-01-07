/* eslint-disable jsx-a11y/alt-text */
import { Fade, Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { context } from "../../../app/Context";
import { storage } from "../../../app/firebaseUpload";
import { addDiscount } from "./../../../app/ApiResult";
import Discount from "./../../Product/Discount/index.";
import "./UpdateDiscounts.scss";
function AddDiscounts(props) {
  const Context = useContext(context);
  const DateNow = new Date(Date.now());
  const getMindate=`${DateNow.getFullYear()}-${DateNow.getMonth().toString().length===1&&"0"}${DateNow.getMonth()+1}-${DateNow.getDate().toString().length===1&&"0"}${DateNow.getDate()}`;
  const { setBodyAdmin, setFillerAdmin } = Context;
  const [valueData, setValueData] = useState({
    Name: "",
    Photo: "",
    Value: "",
    Quantity: "",
    ExpiredDate: "",
    MinPrice: "",
  });
  function Prev() {
    setBodyAdmin(<Discount />);
    setFillerAdmin("DISCOUNTS");
  }
  const handleChange = (event) => {
    setValueData({ ...valueData, [event.target.name]: event.target.value });
  };
  const { enqueueSnackbar } = useSnackbar();
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
      const res = await addDiscount({ ...valueData, Photo: urlImage });
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

  const HandleUpload = async () => {
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
    <div className="AddDiscounts">
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
          <h2 className="text-center pt-2">Thêm khuyến mãi mới </h2>
          <div className="dataAdd">
            <div className="shortText">
              <div className="form-floating mb-3 inputData">
                <input
                  type="text"
                  className="form-control "
                  name="Name"
                  color="warning"
                  value={valueData?.Name}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingInput">Tiêu đề</label>
              </div>
              <div className="form-floating mb-3 inputData">
                <input
                  type="number"
                  className="form-control "
                  name="Value"
                  color="warning"
                  value={valueData?.Value}
                  onChange={(e) => handleChange(e)}
                  min={1}
                />
                <label htmlFor="floatingInput">Giá trị</label>
              </div>
              <div className="form-floating mb-3 inputData">
                <input
                  type="number"
                  className="form-control "
                  name="Quantity"
                  color="warning"
                  value={valueData?.Quantity}
                  onChange={(e) => handleChange(e)}
                  min={1}
                />
                <label htmlFor="floatingInput">Số lượng</label>
              </div>

              <div className="form-floating mb-3 inputData">
                <input
                  type="text"
                  className="form-control "
                  name="MinPrice"
                  color="warning"
                  value={valueData?.MinPrice}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingInput">Giá tối thiểu</label>
              </div>
            </div>
            <div className="largeText">
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
                    <img className="img_preview" src={image?.preview} />
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
                  type="date"
                  className="form-control "
                  name="ExpiredDate"
                  color="warning"
                  value={valueData?.ExpiredDate.slice(0, 10)}
                  onChange={(e) => handleChange(e)}
                  min={getMindate}
                />
                <label htmlFor="floatingInput">Hạn sử dụng</label>
              </div>
            </div>
            <div className="button__submit ">
              <button
                type="submit"
                className="btn btn-success inputData"
                style={{ minWidth: "200px", flex: 2 }}
                onClick={HandleUpload}
              >
                Thêm khuyến mãi mới
              </button>
            </div>
          </div>
        </Paper>
      </Fade>
    </div>
  );
}

export default AddDiscounts;
