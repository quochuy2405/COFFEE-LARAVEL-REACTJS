import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { forgotPass } from "../../app/ApiResult";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function ConfirmNewPass({ email, conFirm, setConFirm }) {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [password, setPassword] = useState({
    NewPassword: "",
    ConfirmNewPassword: "",
  });
  const handleClose = () => {
    setConFirm(false);
  };
  const handleSend = async () => {
    if (password?.NewPassword === password?.ConfirmNewPassword) {
      const response = await forgotPass(email, password);
      console.log(response);
      if (response.status === 200) {
        enqueueSnackbar("Thành công", { variant: "success" });
        history.push("/login");
        setConFirm(false);
      } else {
        enqueueSnackbar("Thất bại", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Mật khẩu không khớp", { variant: "error" });
    }
  };
  const OnChangePass = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Dialog open={conFirm} onClose={handleClose}>
        <DialogTitle>Nhập mật khẩu mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="NewPassword"
            label="Mật khẩu mới"
            type="text"
            value={password?.NewPassword}
            fullWidth
            variant="standard"
            onChange={(e) => OnChangePass(e)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Xác nhận mật khẩu mới"
            type="text"
            fullWidth
            value={password?.ConfirmNewPassword}
            name="ConfirmNewPassword"
            onChange={(e) => OnChangePass(e)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleSend}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
