import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useEffect } from "react";
import { isEmail } from "../../app/ApiResult";
import GetCode from "./GetCode";
import { useSnackbar } from "notistack";

export default function ForgotPass({ open, setOpen }) {
  const [getCode, setGetCode] = useState(false);
  const [email, setEmail] = useState("");
  const [getcodeBody, setGetcodeBody] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setGetcodeBody(false);
  }, []);
  const handleSend = async (e) => {
    e.preventDefault();
    if (email) {
      const response = await isEmail(email);
      if (response?.success) {
        setOpen(false);
        setGetCode(true);
        setGetcodeBody(true);
      } else {
        enqueueSnackbar("Email chưa được đăng ký", { variant: "error" });
      }
    }
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div>
      {getcodeBody && (
        <GetCode
          email={email}
          setGetcodeBody={setGetcodeBody}
          getCode={getCode}
          setGetCode={setGetCode}
        />
      )}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSend}>
          <DialogTitle>Quên mật khẩu</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Hãy nhập Email của bạn và nhận mã xác nhận
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Địa chỉ Email"
              type="email"
              value={email}
              fullWidth
              onChange={(e) => onChangeEmail(e)}
              variant="standard"
              required
              onInput={(e) => e.target.setCustomValidity("")}
              onInvalid={(e) =>
                e.target.setCustomValidity("Hãy nhập địa chỉ email")
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy bỏ</Button>
            <Button type="submit">Gửi mã</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
