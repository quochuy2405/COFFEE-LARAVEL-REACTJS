/* eslint-disable jsx-a11y/alt-text */
import Fade from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import {
  addProduct,
  getProductTypesSelect,
  getSupplierSelect,
} from "../../../app/ApiResult";
import { storage } from "../../../app/firebaseUpload";
import "./styles/AddCoffees.scss";
function AddCoffee(props) {
  const [proType, setProType] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [valueData, setValueData] = useState({
    Name: "",
    Photo: "",
    ProductTypeId: "",
    SupplierId: "",
    Description: "",
    Price: "",
    Size: "",
  });

  const handleChangeData = (event) => {
    setValueData({ ...valueData, [event.target.name]: event.target.value });
  };
  const fetch = async () => {
    const ProType = await getProductTypesSelect();
    if (ProType) setProType(ProType);
    const Supplier = await getSupplierSelect();
    if (Supplier) setSupplier(Supplier);
    setValueData({
      ...valueData,
      ProductTypeId: ProType[0]?.Id,
      SupplierId: Supplier[0]?.Id,
    });
  };
  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { enqueueSnackbar } = useSnackbar();
  const [urlImage, setUrlimage] = useState(undefined);
  const [image, setImage] = useState();
  var HandleChange = (e) => {
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
      const res = await addProduct({ ...valueData, Photo: urlImage });
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
      await UploadTask.on(
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
    <div className="AddCoffee">
      <Fade in={true} timeout={200} style={{ height: "100%" }}>
        <Paper>
          <h2 className="text-center pt-2">Thêm Coffee mới</h2>

          <div className="dataAdd">
            <div className="data--short_text">
              <div className="form-floating mb-3 inputData">
                <input
                  type="text"
                  className="form-control "
                  name="Name"
                  color="warning"
                  value={valueData.Name}
                  onChange={(e) => handleChangeData(e)}
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
                  onChange={(e) => handleChangeData(e)}
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
                  onChange={(e) => handleChangeData(e)}
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
                  onChange={(e) => handleChangeData(e)}
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
                  onChange={(e) => handleChangeData(e)}
                />
                <label htmlFor="floatingInput">Size</label>
              </div>
            </div>
            <div className="data--large_text">
              <input type="file" id="inputFile" onChange={HandleChange} />

              <label className="inputFileLabel inputData " htmlFor="inputFile">
                <div className="box_input">
                  <p className="text-center textUpload ">Hình ảnh mô tả</p>
                  {image && <img className="img_preview" src={image.preview} />}
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
                  onChange={(e) => handleChangeData(e)}
                  style={{ height: "165px" }}
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
                Thêm sản phẩm
              </button>
            </div>
          </div>
        </Paper>
      </Fade>
    </div>
  );
}

export default AddCoffee;
