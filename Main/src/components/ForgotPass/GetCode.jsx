import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import ConfirmNewPass from "./ConfirmNewPass";
import emailjs from "emailjs-com";
import React, { useEffect, useState } from "react";

export default function GetCode({
  getCode,
  setGetCode,
  email,
  setGetcodeBody,
}) {
  const [conFirm, setConFirm] = useState(false);
  const [getAgain, setGetAgain] = useState(false);
  const [code, setCode] = useState(undefined);
  const [no, setno] = useState(true);
  const [codeConFirm, setCodeConFirm] = useState(undefined);
  const [countDown, setCountDown] = useState(0);
  const handleClose = () => {
    setGetCode(false);
    setGetcodeBody(false);
  };

  useEffect(() => {
    const Code = Math.floor(Math.random() * 999999) + 100000;

    var templateParams = {
      customerEmail: email,
      code: Code,
    };
    emailjs
      .send(
        "service_lzz7b0g",
        "template_er0mlwa",
        templateParams,
        "user_ZnFDDoy5P7tFdH0eaml2J"
      )
      .then((res) => {
        setCode(Code);
      })
      .catch((e) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAgain]);
  useEffect(() => {
    setCountDown(60);
    setno(true);
    let Count = 60;
    const timeSetCountDown = setInterval(() => {
      if (Count > 0) {
        setCountDown(Count - 1);
        Count--;
      } else {
        clearInterval(timeSetCountDown);
        setno(false);
      }
    }, 1000);
    return () => clearInterval(timeSetCountDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAgain, getCode]);
  const handleConfirm = () => {
    if (code === Number(codeConFirm) && no) {
      setGetCode(false);
      setConFirm(true);
    }
  };
  return (
    <div>
      <ConfirmNewPass email={email} conFirm={conFirm} setConFirm={setConFirm} />

      <Dialog open={getCode} onClose={handleClose}>
        <DialogTitle>Nhập mã xác minh</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              autoFocus
              type="email"
              margin="dense"
              id="name"
              label="Mã xác minh"
              value={codeConFirm}
              fullWidth
              onChange={(e) => setCodeConFirm(e.target.value)}
              variant="standard"
            />
            <Button
              style={{ right: "20px", top: "35%", position: "absolute" }}
              onClick={() => setGetAgain(!getAgain)}
            >
              Gửi lại
            </Button>
          </div>

          <h3>{countDown}</h3>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>

          <Button onClick={handleConfirm}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
