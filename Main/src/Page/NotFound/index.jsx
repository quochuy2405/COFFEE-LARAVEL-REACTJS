import React, { memo, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./styles.scss"
function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
<div className="NotFound">
 <b><Link to={"/"} className="goback">Về trang chủ</Link></b>
    <img
        src="https://images.all-free-download.com/images/graphiclarge/error_404_page_not_found_6845510.jpg"
        alt=""
        className="img-notfound"
        
      />
</div>
  );
}

export default memo(NotFound);
