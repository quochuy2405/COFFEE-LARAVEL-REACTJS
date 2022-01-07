import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

function ItemNews(props) {
  const { Item } = props;
  return (
    <>
      <div
        data-aos="zoom-in-down"
        data-aos-duration="800"
        data-aos-once="true"
        className="New"
      >
        <div className="New_img">
          <img src={Item.Thumbnail} alt="" />
        </div>
        <p className="tilte_new">{Item.Title}</p>
        <p className="News_des">{Item.Content}</p>
        <div className="btn_watch"></div>
        <div className="btn_news">
          <Link to={`/news/${Item?.Id}`}>Xem</Link>
        </div>
      </div>
    </>
  );
}

export default ItemNews;
