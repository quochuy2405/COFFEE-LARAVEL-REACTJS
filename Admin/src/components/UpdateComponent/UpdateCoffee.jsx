/* eslint-disable jsx-a11y/alt-text */
import Fade from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import {
  getProductId,
  getProductTypesSelect,
  getSupplierSelect,
  updateProduct,
} from "../../app/ApiResult";
import { context } from "../../app/Context";
import { storage } from "../../app/firebaseUpload";
import Product from "../Product";
import "./stylesUpdateComponent/UpdateCoffees.scss";
function UpdateCoffee(props) {
  const Context = useContext(context);
  const { id } = props;
  const { setBodyAdmin, setFillerAdmin } = Context;
  const [proType, setProType] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [flag, setFlag] = useState(false);
  const [valueData, setValueData] = useState({
    Id: undefined,
    Name: "",
    Photo: "",
    ProductTypeId: undefined,
    SupplierId: undefined,
    Description: "",
    Price: undefined,
    Size: undefined,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await getProductId(id, "/product");
    const ProType = await getProductTypesSelect();
    if (ProType) setProType(ProType);
    const Supplier = await getSupplierSelect();
    if (Supplier) setSupplier(Supplier);
    if (result) {
      setValueData({
        ...valueData,
        Id: result.Id,
        Name: result?.Name,
        Description: result?.Description,
        Price: result?.Price,
        ProductTypeId: result?.ProductTypeId || ProType[0]?.Id,
        SupplierId: result?.SupplierId || Supplier[0]?.Id,
        Photo: result?.Photo,
        Size: result?.Size,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function Prev() {
    setBodyAdmin(<Product />);
    setFillerAdmin("PRODUCT");
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
    if (valueData?.Id) {
      const photo = urlImage || valueData?.Photo;
      const res = await updateProduct({ ...valueData, Photo: photo });
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
  const HandleUpload = () => {
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
    <div className="UpdateCoffee">
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
          <h2 className="text-center pt-2 ">Cập nhật sản phẩm </h2>
          <p style={{ width: "80%", margin: "0 auto" }}>
            Mã sản phẩm (Coffee):{id}
          </p>
          <div className="dataUpdate">
            <div className="data--short_text">
              <div className="form-floating mb-3 inputData">
                <input
                  type="text"
                  className="form-control "
                  name="Name"
                  color="warning"
                  value={valueData.Name}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingInput">Tiêu đề</label>
              </div>

              <div className="form-floating mb-3 inputData">
                <input
                  type="text"
                  className="form-control"
                  name="Price"
                  color="warning"
                  value={valueData.Price}
                  onChange={(e) => handleChange(e)}
                />

                <label htmlFor="floatingInput">Giá</label>
              </div>
              <div className="form-floating mb-3 inputData">
                <select
                  type="text"
                  className="form-control "
                  name="ProductTypeId"
                  color="warning"
                  value={valueData?.ProductTypeId}
                  onChange={(e) => handleChange(e)}
                >
                  {proType?.map((item, index) => (
                    <option
                      selected={
                        valueData?.ProductTypeId === item?.Id && "seleted"
                      }
                      key={index}
                      value={item?.Id}
                    >
                      {item?.Name}
                    </option>
                  ))}
                </select>

                <label htmlFor="floatingInput">Loại sản phẩm</label>
              </div>
              <div className="form-floating mb-3 inputData">
                <select
                  type="text"
                  className="form-control "
                  name="supplierId"
                  color="warning"
                  value={valueData?.SupplierId}
                  onChange={(e) => handleChange(e)}
                >
                  {supplier?.map((item, index) => (
                    <option
                      selected={valueData?.SupplierId === item?.Id && "seleted"}
                      key={index}
                      value={item?.Id}
                    >
                      {item?.Name}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingInput">Nhà Phân Phối</label>
              </div>
              <div className="form-floating mb-3 inputData">
                <input
                  type="text"
                  className="form-control "
                  name="Size"
                  color="warning"
                  value={valueData.Size}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingInput">Size</label>
              </div>
            </div>
            <div className="data--large_text">
              <input
                type="file"
                id="inputFile"
                onChange={(e) => HandleChangeImg(e)}
              />

              <label className="inputFileLabel inputData " htmlFor="inputFile">
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

              <div className="form-floating inputData">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  name="Description"
                  color="warning"
                  value={valueData.Description}
                  onChange={(e) => handleChange(e)}
                  style={{ height: "170px" }}
                ></textarea>
                <label className="description" htmlFor="floatingTextarea2">
                  Nội dung
                </label>
              </div>
            </div>

            <div className="button--submit">
              <button
                type="submit"
                className="btn btn-success inputData"
                style={{ minWidth: "200px" }}
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

export default UpdateCoffee;
