import React, { memo, useEffect } from "react";
import Footer from "../../components/Footer";
import ListStore from "../../components/ListStore";
import "./styles.scss";
Store.propTypes = {};

function Store(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="body_Page Store">
        <div className="Intro">
          <p>Hệ thống của hàng Coffee & Book trên toàn quốc</p>
        </div>
        <ListStore />
      </div>
      <Footer />
    </div>
  );
}

export default memo(Store);
