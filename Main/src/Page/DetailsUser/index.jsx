import { Tooltip, Zoom } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import jwt_decode from "jwt-decode";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { storage } from "../../app/firebaseApp";
import Footer from "../../components/Footer";
import Iteam from "../../components/Item";
import {
  getBillsId,
  getCustomerById,
  getProducts,
  updateCustomer,
} from "./../../app/ApiResult";
import { context } from "./../../app/Context";
import "./styles.scss";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    opacity: 0.6,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(Id, Address, date, Validated, Note, Total, Status) {
  return { Id, Address, date, Validated, Note, Total, Status };
}

function Bill({ id }) {
  const [dataTable, setDataTable] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await getBillsId(id);

    setDataTable(res);
  }, [id]);
 
  const rows = dataTable?.map((item) =>
    createData(
      item?.Id,
      item?.Address,
      item?.CreatedDate.slice(0, 10),
      item?.Validated,
      item?.Note,
      item?.TotalPrice,
      item?.Status
    )
  );

  return (
    <>
      <h2 className="title">H??a ????n c???a b???n</h2>
      <div style={{ padding: "10px", whiteSpace: "nowrap" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">M?? ????n</StyledTableCell>
                <StyledTableCell align="right">?????a ch???</StyledTableCell>
                <StyledTableCell align="right">Ng??y Mua</StyledTableCell>
                <StyledTableCell align="right">X??c nh???n</StyledTableCell>
                <StyledTableCell align="right">Ghi ch?? </StyledTableCell>
                <StyledTableCell align="right">T???ng ti???n</StyledTableCell>
                <StyledTableCell align="right">Tr???ng th??i</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.Id}>
                  <StyledTableCell component="th" scope="row">
                    {row.Id}
                  </StyledTableCell>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={row?.Address}
                    placement="right-start"
                    arrow
                  >
                    <StyledTableCell align="right">
                      <p
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "185px",
                          margin: 0,
                        }}
                      >
                        {row?.Address}
                      </p>
                    </StyledTableCell>
                  </Tooltip>
                  <StyledTableCell align="right">{row.date}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.Validated ? "???? x??c nh???n" : "Ch??a x??c nh???n"}
                  </StyledTableCell>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={row?.Note}
                    placement="right-start"
                    arrow
                  >
                    <StyledTableCell align="right">
                      <p
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "140px",
                          margin: 0,
                        }}
                      >
                        {row?.Note}
                      </p>
                    </StyledTableCell>
                  </Tooltip>
                  <StyledTableCell align="right">
                    {row?.Total.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}{" "}
                    ??
                  </StyledTableCell>
                  <StyledTableCell align="right">{row?.Status}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
function Favorites() {
  const [list, SetList] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await getProducts();
    SetList(res);
  }, []);
  return (
    <>
      <h2 className="title">S???n ph???m b???n y??u th??ch</h2>
      <div className="SanPhamTuNha">
        <div className="ListItems">
          <Row>
            {list?.map((item, index) => (
              <Col key={index} className="Center_Item" xs={12} sm={6} xl={4}>
                {" "}
                <Iteam Item={item} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}
function UserDetails({ id, setFlagAvata }) {
  const { enqueueSnackbar } = useSnackbar();
  const [urlImage, setUrlimage] = useState(undefined);
  const [image, setImage] = useState();
  const [flag, setFlag] = useState(0);
  const [dataForm, setDataForm] = useState({
    Id: "",
    Name: "",
    Phone: "",
    Gender: 1,
    Email: "",
    Address: "",
    Avata: "",
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const customer = await getCustomerById(id);
    setDataForm({
      Id: customer?.Id,
      Name: customer?.Name,
      Phone: customer?.Phone,
      Gender: customer?.Gender ? 1 : 0,
      Email: customer?.Email,
      Address: customer?.Address,
      Avata: customer?.Avata,
    });
  }, [id]);
  const HandleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  var HandleChangeImg = (e) => {
    const file = e.target?.files[0];
    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!validImageTypes.includes(fileType)) {
        enqueueSnackbar("Sai ?????nh d???ng", { variant: "error" });
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
    if (dataForm?.Id) {
      const Avata = urlImage || dataForm?.Avata;
      const res = await updateCustomer({ ...dataForm, Avata: Avata });
      if (res?.success) {
        setFlagAvata(1);
        enqueueSnackbar("T???i l??n th??nh c??ng", { variant: "success" });
      } else {
        enqueueSnackbar("C?? l???i x???y ra xin h??y th??? l???i", {
          variant: "warning",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlImage, flag]);
  const OnSubmit = async (e) => {
    e.preventDefault();
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
    } else {
      setUrlimage(null);
      setFlag(!flag);
    }
  };

  return (
    <>
      <div className="infoAcc">
        <h2 className="title">Th??ng Tin T??i Kho???n </h2>
        <form onSubmit={OnSubmit}>
          <table className="tableInfoAcc">
            <tr>
              <td>T??n kh??ch h??ng</td>
            </tr>

            <tr className="space-center">
              <td>
                {" "}
                <input
                  className="form-control "
                  id="exampleDataList"
                  placeholder="H??? T??n"
                  name="Name"
                  value={dataForm?.Name}
                  onChange={(e) => HandleChange(e)}
                />
              </td>
              <td>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="inputFile"
                  onChange={HandleChangeImg}
                />

                <label htmlFor="inputFile">
                  <div className="avataPreview">
                    {image?.preview ? (
                      <img src={image?.preview} alt="" />
                    ) : (
                      <i className="fad fa-camera"></i>
                    )}
                  </div>
                </label>
              </td>
            </tr>
            <tr>
              <td>S??? ??i???n tho???i</td>
            </tr>
            <tr>
              <td>
                {" "}
                <input
                  className="form-control "
                  id="exampleDataList"
                  maxLength={11}
                  placeholder="09xxxxxxxx"
                  name="Phone"
                  value={dataForm?.Phone}
                  onChange={(e) => HandleChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td>Gi???i t??nh</td>
            </tr>
            <tr>
              <td>
                <select
                  className="form-control "
                  name="Gender"
                  onChange={(e) => HandleChange(e)}
                >
                  <option selected={dataForm?.Gender && `selected`} value="1">
                    Nam
                  </option>
                  <option selected={!dataForm?.Gender && `selected`} value="0">
                    N???
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Email</td>
            </tr>
            <tr>
              <td>
                {" "}
                <input
                  type="email"
                  className="form-control "
                  id="exampleDataList"
                  placeholder="example@gmail.com"
                  name="Email"
                  value={dataForm?.Email}
                  onChange={(e) => HandleChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td>Address</td>
            </tr>
            <tr>
              <td>
                {" "}
                <input
                  type="text"
                  className="form-control "
                  id="exampleDataList"
                  placeholder="TP.HCM"
                  name="Address"
                  value={dataForm?.Address}
                  onChange={(e) => HandleChange(e)}
                />
              </td>
            </tr>
            <tr style={{ textAlign: "right" }}>
              <button type="submit" className="btn btn-outline-success mt-4">
                C???p nh???t
              </button>
            </tr>
          </table>
        </form>
      </div>
    </>
  );
}
function DetailsUser(props) {
  const { checkToken, flagAvata, setFlagAvata } = useContext(context);
  const [value, setValue] = useState(0);

  const [dataUser, setdataUser] = useState({
    Id: "",
    Name: "",
    Email: "",
    Avata: "",
    Phone:""
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (checkToken) {
      var decoded = jwt_decode(checkToken, { payload: true });
      if (decoded?.Id) {
        const res = await getCustomerById(decoded?.Id);
        if (res)
          setdataUser({
            Id: res?.Id,
            Username: res?.Username,
            Email: res?.Email,
            Avata: res?.Avata,
            Name: res?.Name,
            Phone:res?.Phone
          });
      }
    }
    setFlagAvata(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkToken, flagAvata]);
  return (
    <div className="body_Page">
      <div className="DetailsUser">
        <div className="InfoPerson">
          <div className="Info-Center">
            <div className="avata">
              <img
                src={
                  dataUser?.Avata ||
                  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDRWoasWo6-T5az5H6wDjcykDWbR36J8TUNOrYc95f12Gf9UN1XPoA2kL-VUkgPq-bjp4&usqp=CAU`
                }
                alt=""
              />
            </div>

            <div className="infoUser">
              <div className="name">
                <h3>{dataUser?.Name}</h3>
              </div>
              <div className="email">
                <p>Email: {dataUser?.Email}</p>
              </div>
              <div className="phone">
                <p>Phone: {dataUser?.Phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="InfoDetails">
          <Row>
            <Col className="Center_Item" xs={12}>
              {" "}
              <Box sx={{ width: 500 }}>
                <BottomNavigation
                  showLabels
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                >
                  <BottomNavigationAction
                    label="????n h??ng"
                    icon={
                      <i className="fad icon-tag fa-file-invoice-dollar"></i>
                    }
                  />
                  <BottomNavigationAction
                    label="Y??u t??ch"
                    icon={<i className="fad icon-tag fa-crown"></i>}
                  />
                  <BottomNavigationAction
                    label="Th??ng tin t??i kho???n "
                    icon={<i className="fad icon-tag fa-user-crown"></i>}
                  />
                </BottomNavigation>
              </Box>
            </Col>
          </Row>

          <div className="bodyInfoDetails">
            {value === 0 ? (
              <Bill id={dataUser?.Id} />
            ) : value === 1 ? (
              <Favorites id={dataUser?.Id} />
            ) : (
              <UserDetails id={dataUser?.Id} setFlagAvata={setFlagAvata} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default DetailsUser;
