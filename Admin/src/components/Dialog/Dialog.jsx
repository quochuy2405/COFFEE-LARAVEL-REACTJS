import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { adminLogout } from "../../app/ApiResult";
import { context } from "../../app/Context";

export default function AlertDialog({ open, setOpen }) {
  const history = useHistory();
  const { setCheckToken } = useContext(context);
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = async () => {
    await adminLogout();

    setCheckToken(undefined);
    localStorage.removeItem("TokenAdminCoffee");
    history.push("/");
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ textAlign: "center" }} id="alert-dialog-title">
          {"Đăng xuất tài khoản"}
        </DialogTitle>

        <DialogActions
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleLogout} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
