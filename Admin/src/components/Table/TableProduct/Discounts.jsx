import { Tooltip, Zoom } from "@mui/material";
import Fade from "@mui/material/Grow";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { DeleteId } from "../../../app/ApiResult";
import { context } from "../../../app/Context";
import DiscountDetails from "../../DiscountDetails";
import UpdateDiscounts from "../../UpdateComponent/UpdateDiscounts";
import "../stylesTable.scss";
import AddDiscounts from "./../../AddComponents/AddDiscounts/AddDiscounts";
TableDiscounts.propTypes = {
  List: PropTypes.array,
};
TableDiscounts.defaultProps = {
  List: [],
};

export default function TableDiscounts(props) {
  const Context = useContext(context);
  const { List, paginate, setPaginate, setFlag } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { setBodyAdmin, userRole } = Context;
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({});
  const ListTitleHead = [
    { Name: "Mã số" },
    { Name: "Tên loại" },
    { Name: "Giá trị" },
    { Name: "Số lượng" },
    { Name: "Ngày hết hạn" },
    { Name: "Ảnh" },
    userRole?.promotion?.button?.delete && { Name: "Xóa" },
    userRole?.promotion?.button?.update && { Name: "Cập nhật" },
    { Name: "Chi tiết" },
  ];

  function handleDetaits(params) {
    setOpen(true);
    setDetails(params);
  }
  const HandleDelete = async (id) => {
    if (window.confirm("Bạn đã chắc chắn muốn xóa?")) {
      const response = await DeleteId(id, "/discount/delete");
      if (response.status === 200) {
        setFlag(true);
        enqueueSnackbar("Xóa thành công", { variant: "success" });
      } else {
        enqueueSnackbar("Xóa thất bại", { variant: "warning" });
      }
    }
  };
  function changePage(page) {
    setFlag(true);
    setPaginate({
      ...paginate,
      page: page,
    });
  }
  function HandelUpdate(id) {
    userRole?.promotion?.button?.update &&
      setBodyAdmin(<UpdateDiscounts id={id} />);
  }
  function HandelAdd() {
    userRole?.promotion?.button?.add && setBodyAdmin(<AddDiscounts />);
  }
  return (
    <>
      {userRole?.promotion?.button?.add && (
        <button
          type="button"
          onClick={() => HandelAdd()}
          className="btn btn-outline-success"
          style={{ position: "absolute", right: "5%", top: "2%" }}
        >
          Thêm khuyến mãi mới
        </button>
      )}

      <Stack className="mt-4" spacing={2}>
        <Pagination
          color="primary"
          count={paginate?.count}
          onChange={(e, value) => changePage(value)}
        />
      </Stack>
      <Fade in={true} timeout={400} className="body_page">
        <Paper>
          <div>
            <table className="itemTable">
              <thead className="headerTable">
                <tr>
                  <th>STT</th>
                  {ListTitleHead?.map(
                    (item, index) =>
                      item?.Name && <th key={index}>{item?.Name}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {List?.map((item, index) => (
                  <tr key={index} id={item?.Id}>
                    <td>{index + 1}</td>
                    <td>{item?.Id}</td>

                    <td>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title={item?.Name}
                        placement="right-start"
                        arrow
                      >
                        <p className="text_over">{item?.Name}</p>
                      </Tooltip>
                    </td>
                    <td>{item?.Value}</td>
                    <td>{item?.Quantity}</td>
                    <td>
                      <p>{item?.ExpiredDate?.slice(0, 10)}</p>
                    </td>
                    <td>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title={item?.Photo}
                        placement="right-start"
                        arrow
                      >
                        <p className="text_over">{item?.Photo}</p>
                      </Tooltip>
                    </td>
                    {userRole?.promotion?.button?.delete && (
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          data-set={item?.Id}
                          onClick={() => HandleDelete(item?.Id)}
                        >
                          Xóa
                        </button>
                      </td>
                    )}
                    {userRole?.promotion?.button?.update && (
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => HandelUpdate(item?.Id)}
                          data-set={item?.Id}
                        >
                          Cập nhật
                        </button>
                      </td>
                    )}
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-warning"
                        data-set={item?.Id}
                        onClick={() => handleDetaits(item)}
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <DiscountDetails open={open} setOpen={setOpen} Item={details} />
          </div>
        </Paper>
      </Fade>
    </>
  );
}
