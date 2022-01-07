import { Tooltip, Zoom } from "@mui/material";
import Fade from "@mui/material/Grow";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { DeleteId } from "../../../app/ApiResult";
import { context } from "../../../app/Context";
import AddManagers from "../../AddComponents/AddManagers/AddManagers";
import UpdateManager from "../../UpdateComponent/UpdateManager";
import "../stylesTable.scss";

TableManagers.propTypes = {
  List: PropTypes.array,
};
TableManagers.defaultProps = {
  List: [],
};
export default function TableManagers(props) {
  const { List, paginate, setPaginate, setFlag } = props;
  const Context = useContext(context);
  const { setBodyAdmin, userRole } = Context;
  const { enqueueSnackbar } = useSnackbar();
  const ListTitleHead = [
    { Name: "Mã số" },
    { Name: "Họ tên" },
    { Name: "Tuổi" },
    { Name: "Giới tính" },
    { Name: "Email" },
    { Name: "Số điện thoại" },
    { Name: "Địa chỉ" },
    { Name: "Lương" },
    { Name: "Thưởng" },
    { Name: "Mã cửa hàng" },
    userRole?.manager?.button?.delete && { Name: "Xóa" },
    userRole?.manager?.button?.update && { Name: "Cập nhật" },
  ];
  
  const HandleDelete = async (id) => {
    if (window.confirm("Bạn đã chắc chắn muốn xóa?")) {
      const response = await DeleteId(id, "/manager/delete");
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
    userRole?.manager?.button?.update &&
      setBodyAdmin(<UpdateManager id={id} />);
  }
  function HandelAddManagers() {
    userRole?.manager?.button?.add && setBodyAdmin(<AddManagers />);
  }
  return (
    <>
      {userRole?.manager?.button?.add && (
        <button
          type="button"
          onClick={() => HandelAddManagers()}
          className="btn btn-outline-success"
          style={{ position: "absolute", right: "5%", top: "2%" }}
        >
          Thêm quản lý mới
        </button>
      )}
      <Stack className="mt-4" spacing={2}>
        <Pagination
          count={paginate?.count}
          color="primary"
          onChange={(e, value) => changePage(value)}
        />
      </Stack>{" "}
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
                  <tr key={index} id={index}>
                    <td>{index + 1}</td>
                    <td>{item?.Id}</td>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title={item?.Name}
                      placement="right-start"
                      arrow
                    >
                      <td className="text_over">{item?.Name}</td>
                    </Tooltip>
                    <td>{item?.Age}</td>
                    <td>{item?.Gender ? "Nam" : "Nữ"}</td>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title={item?.Email}
                      placement="right-start"
                      arrow
                    >
                      <td className="text_over">{item?.Email}</td>
                    </Tooltip>
                    <td>{item?.Phone}</td>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title={item?.Address}
                      placement="right-start"
                      arrow
                    >
                      <td className="text_over">{item?.Address}</td>
                    </Tooltip>
                    <td>
                      {item?.Salary.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                      })}{" "}
                      đ
                    </td>
                    <td>
                      {item?.Bonus.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                      })}{" "}
                      đ
                    </td>
                    <td>{item?.StoreId}</td>
                    {userRole?.manager?.button?.delete && (
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
                    {userRole?.manager?.button?.update && (
                      <td>
                        <button
                          type="button"
                          onClick={() => HandelUpdate(item?.Id)}
                          className="btn btn-outline-success"
                          data-set={item?.Id}
                        >
                          Cập nhật
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Paper>
      </Fade>
    </>
  );
}
