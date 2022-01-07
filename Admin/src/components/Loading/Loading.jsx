import React from "react";
import { Dialog } from "@mui/material/Dialog";

function Loading(open) {
  return (
    <div>
      <Dialog open={false}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Đang xử lý...</span>
        </div>
      </Dialog>
    </div>
  );
}

export default Loading;
