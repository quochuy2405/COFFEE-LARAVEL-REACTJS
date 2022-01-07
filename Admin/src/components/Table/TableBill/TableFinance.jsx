import Fade from "@mui/material/Grow";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import React from "react";
import "../stylesTable.scss";
TableFinance.propTypes = {
  List: PropTypes.array,
};
TableFinance.defaultProps = {
  List: [],
};
export default function TableFinance(props) {
  const { List, paginate, setPaginate, ListTitleHead, ok } = props;
  function changePage(page) {
    setPaginate({
      ...paginate,
      page: page,
    });
  }
  return (
    <>
      <Stack className="mt-4" spacing={2}>
        <Pagination
          count={paginate?.count}
          color="primary"
          onChange={(e, value) => changePage(value)}
        />
      </Stack>

      <Fade in={true} timeout={400} className="body_page" style={{maxHeight:"65vh"}}>
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
                    {Object.values(item)[0] && (
                      <td>{Object.values(item)[0]}</td>
                    )}
                    {Object.values(item)[1] &&
                      (ok ? (
                        <td>{Object.values(item)[1].toString()?.slice(11)}</td>
                      ) : (
                        <td>{Object.values(item)[1]}</td>
                      ))}
                    {Object.values(item)[2] && (
                      <td>
                        {Object.values(item)[2].toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                        })}{" "}
                        đ
                      </td>
                    )}
                    {Object.values(item)[3] && (
                      <td>{Object.values(item)[3]}</td>
                    )}
                    {Object.values(item)[4] && (
                      <td>{Object.values(item)[4]}</td>
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
