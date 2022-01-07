import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsById } from "../../app/ApiResult";
import Footer from "../../components/Footer";
import ListItemNews from "../../components/ListItemNews";

function DetailNews() {
  const { id } = useParams();
  const [bodyNews, setBodyNews] = useState();
  const Fetch = async () => {
    const res = await getNewsById(id);
    setBodyNews(res);
  };
  useEffect(() => {
    Fetch();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="News">
      <div className="body_Page">
        <h2 style={{ textAlign: "center", padding: "50px 0" }}>
          {bodyNews?.Title}
        </h2>

        <img
          src={bodyNews?.Thumbnail}
          alt=""
          style={{
            width: "70%",
            objectFit: "cover",
            margin: "0 auto",
            display: "block",
            borderRadius: "5px",
          }}
        />

        <div
          className="img"
          style={{
            fontSize: "13px",
            textAlign: "justify",
            width: "90%",
            margin: "0 auto",
            lineHeight: "24px",
            padding: "50px 0",
          }}
        >
          {bodyNews?.Content}
        </div>
      </div>
      <ListItemNews />
      <Footer />
    </div>
  );
}

export default DetailNews;
