import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { PropTypes } from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";
import "./styles.scss";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <i className="fas fa-times"></i>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: propTypes.node,
  onClose: propTypes.func,
};
DiscountDetails.propTypes = {
  Item: PropTypes.object.isRequired,
  setOpen: PropTypes.func,
  open: PropTypes.bool,
};
DiscountDetails.defaultProps = {
  setOpen: null,
  open: null,
};
export default function DiscountDetails(Props) {
  const { open, setOpen, Item } = Props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="ItemDetails">
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          className="d-flex justify-content-center"
          onClose={handleClose}
        >
          Chi Tiết
        </BootstrapDialogTitle>
        <DialogContent dividers className="Width_details">
          <div className="bodyDetails">
            <div className="imgDetail">
              <img src={Item?.Photo} alt="" />
            </div>
            <div className="Details_des">
              <b className="Details_Title">{Item?.Name}</b>
              <p className="mt-2">
                Giá trị: <b>{Item?.Value}</b>
              </p>
              <p>
                Số lượng: <b>{Item?.Quantity}</b>
              </p>
              <div className="price_number d-flex justify-content-left">
                <p>
                  Ngày hết hạn: <b> {Item?.ExpiredDate?.slice(0, 10)} </b>
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
