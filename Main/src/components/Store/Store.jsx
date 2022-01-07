/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "./Store.scss";
function Store({ item }) {
  return (
    <div className="store_loop" data-district="Quận 11">
      <div className="img">
        <img
          src={
            item?.Photo ||
            "https://file.hstatic.net/1000075078/file/hcm-lu-gia1__1__e0a622da07ab48b8bb7a542f088b7233.jpg"
          }
          alt="store"
        />
      </div>

      <div className="store_info">
        <h5 className="store_name p-2">{item?.StoreName}</h5>

        <a className="store_actions" target={"_blank"} href={item?.LinkGG}>
          {" "}
          <div> Xem bản đồ </div>
        </a>

        <hr />
        <p className="store_address">{item?.Address}</p>
        <p className="store_wktime">07:30 - 22:00</p>
        <hr />
        <div className="store_meta">
          <div>
            <i className="fal fa-car"></i> <span>Có chỗ đỗ xe hơi</span>
          </div>
          <div>
            <i className="fal fa-store"></i> <span>Phục vụ tại chỗ</span>
          </div>
          <div>
            <i className="fal fa-shopping-bag"></i> <span>Mua mang đi</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
