import React, { memo, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import ListItem from "../../components/ListItem";
import ListItemNews from "../../components/ListItemNews";
import SanPhamTuNha from "../../components/SanPhamTuNha";
import Slider from "../../components/Slider";
import "./styles.scss";
import { context } from "./../../app/Context";

function Home() {
  const [check, SetCheck] = useState();
  const [slugStore, SetSlugStore] = useState(0);
  const { checkToken } = useContext(context);
  function ChangeActive(tem) {
    const Tagactive = document.querySelector(".Tag.active");
    if (Tagactive) {
      Tagactive.classList.remove("active");
    }
    document.querySelector(tem).classList.add("active");
    if (tem === ".Ganday") {
      SetCheck(1);
    } else {
      SetCheck(undefined);
    }
  }

  useEffect(() => {
    SetCheck(undefined);
    window.scrollTo(0, 0);
  }, []);
  const Onchange = (e) => {
    SetSlugStore(e.target.value);
  };
  return (
    <>
      <div className="Home">
        <div className="body_Page">
          <div className="Slider_Home pt-4">
            <Slider />
          </div>
          <div className="GoiY">
            <div className="Tags">
              <ul>
                <div className="icon">
                  <i className="fad fa-lightbulb"></i>
                </div>
                <li
                  className="Tag active goiy"
                  onClick={() => ChangeActive(".goiy")}
                >
                  Nhà gợi ý cho bạn
                </li>
                <li
                  className="Tag Ganday"
                  onClick={() => ChangeActive(".Ganday")}
                >
                  Đặt gần đây
                </li>
              </ul>
            </div>
            <div className="Subject_Tag">
              {check ? (
                checkToken ? (
                  <ListItem recently={true} numList={4} check={true} />
                ) : (
                  <div className="Btn_Login">
                    <Link to="/login">Đăng Nhập</Link>
                  </div>
                )
              ) : (
                <ListItem numList={4} check={true} />
              )}
            </div>
          </div>
          <div className="SanPham">
            <SanPhamTuNha />
            <div className="TinTuc">
              <ListItemNews numList={8} />
              <Link className="News_goto" to="/News">
                <p>Xem thêm</p> <i className="fas fa-arrow-right"></i>{" "}
              </Link>
            </div>
          </div>
          <div className="gg_play">
            <div className="logo">
              {" "}
              <img
                style={{ borderRadius: "10px" }}
                src="https://order.thecoffeehouse.com/_nuxt/img/squarelogo.035676b.png"
                alt=""
              />
            </div>
            <img
              className="img_large"
              src="https://order.thecoffeehouse.com/_nuxt/img/newappv6.f2e1281.png"
              alt=""
            />
          </div>
          <div className="Search_Store">
            <div>
              <div>
                <div className="filter_store">
                  <div className="search_bottom">
                    <i className="fas fa-home color_orange"></i>
                    <h5>Tìm Một Cửa Hàng</h5>
                  </div>
                  <Link
                    to={`/Store?type=${slugStore}`}
                    className="d-flex color_orange all_store"
                  >
                    <p>Xem toàn bộ cửa hàng</p>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
              <div className="input_store">
                <select
                  name="store"
                  id="input_store"
                  onChange={(e) => Onchange(e)}
                >
                  <option value="0">Chọn Quận</option>
                  <option value="1">Quận 1</option>
                  <option value="2">Quận 2</option>
                  <option value="10">Quận 10</option>
                  <option value="BTh">Quận Bình Thạnh</option>
                </select>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default memo(Home);
