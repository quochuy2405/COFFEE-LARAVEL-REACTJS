/* eslint-disable jsx-a11y/alt-text */
import { Fade, Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { getDiscountId, updateDicounts } from "../../app/ApiResult";
import { storage } from "../../app/firebaseUpload";
import Discount from "../Product/Discount/index.";
import { context } from "./../../app/Context";
import "./stylesUpdateComponent/UpdateDiscounts.scss";
function UpdateDiscounts({ id }) {
  const Context = useContext(context);
  const { setBodyAdmin, setFillerAdmin } = Context;
  const [valueData, setValueData] = useState({
    Id: "",
    Name: "",
    Photo: "",
    Value: "",
    Quantity: "",
    ExpiredDate: "",
    MinPrice: "",
  });
  const getDiscountById = async () => {
    const res = await getDiscountId(id);
    if (res)
      setValueData({
        Id: res?.Id,
        Name: res?.Name,
        Photo: res?.Photo,
        Value: res?.Value,
        Quantity: res?.Quantity,
        ExpiredDate: res?.ExpiredDate,
        MinPrice: res?.MinPrice,
      });
  };
  useEffect(() => {
    getDiscountById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  function Prev() {
    setBodyAdmin(<Discount />);
    setFillerAdmin("DISCOUNTS");
  }

  const handleChange = (event) => {
    setValueData({ ...valueData, [event.target.name]: event.target.value });
  };

  const { enqueueSnackbar } = useSnackbar();
  const [flag, setFlag] = useState(false);
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
    if (valueData?.Id) {
      const Photo = urlImage || valueData?.Photo;
      const res = await updateDicounts({ ...valueData, Photo: Photo });
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
  const DateNow = new Date(Date.now());
  const getMindate=`${DateNow.getFullYear()}-${DateNow.getMonth().toString().length===1&&"0"}${DateNow.getMonth()+1}-${DateNow.getDate().toString().length===1&&"0"}${DateNow.getDate()}`;
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
    } else {
      setUrlimage(null);
      setFlag(!flag);
    }
  };
  return (
    <div className="UpdateDiscounts">
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
          <h2 className="text-center pt-2">Cập nhật khuyến mãi </h2>
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
                Cập nhật
              </button>
            </div>
          </div>
        </Paper>
      </Fade>
    </div>
  );
}

export default UpdateDiscounts;
