/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCustomerStore, getStoreByDistrict } from "../../app/ApiResult";
import Store from "./../Store/Store";
import "./styles.scss";

function ListStore(props) {
  const queryParams = new URLSearchParams(window.location.search);
  const history = useHistory();
  const [listDistrict, setListDistrict] = useState([]);
  const [stores, setStores] = useState([]);
  const [listFillter, setListFillter] = useState([]);
  function ChangeActive(index, filter) {
    const Loaiactive = document.querySelector(".StoreTag.active");
    const listLoai = document.querySelectorAll(".StoreTag");
    if (Loaiactive) {
      Loaiactive.classList.remove("active");
    }
    listLoai[index].classList.add("active");
    history.push(`/Store?type=${filter}`);
  }
  const fetch = async () => {
    const res = await getCustomerStore();
    const district = await getStoreByDistrict();
    let Districts = [];
    district.forEach((item) => {
      const temp = {
        cityName: `Quận ${item?.District}`,
        Count: item?.Count,
        id: item?.District !== "Bình Thạnh" ? Number(item?.District) : "BTh",
      };
      Districts.push(temp);
    });
    const temp = {
      cityName: "Tất cả cửa hàng",
      Count: res?.length,
      id: "0",
    };
    Districts.unshift(temp);
    setListDistrict(Districts);
    if (res) {
      setStores(res);
    }
  };

  useEffect(() => {
    fetch();
  }, [queryParams.get("type")]);
  useEffect(() => {
    const filter = queryParams.get("type");
    if (filter !== "0") {
      let temp = [];
      if (filter === "BTh") {
        temp = stores?.filter((item) => item?.District === "Bình Thạnh");
      } else {
        temp = stores?.filter(
          (item) => Number(item?.District) === Number(filter)
        );
      }

      setListFillter(temp);
    } else {
      setListFillter(stores);
    }
  }, [Number(queryParams.get("type")), stores]);
  return (
    <div className="List_Store">
      <div className="List_country">
        <div className="Title">
          <i className="fas fa-store-alt"></i>
          <h3>Khám phá {stores?.length} cửa hàng COFFEE&BOOK</h3>
        </div>
      </div>
      <div className="bodyCountry">
        <ul className="Countrys">
          {listDistrict?.map((item, index) => (
            <li
              key={index}
              className={`StoreTag ${
                queryParams.get("type") == item?.id && "active"
              }`}
              onClick={() => ChangeActive(index, item?.id)}
            >
              <p>
                {item.cityName} ({item?.Count})
              </p>
            </li>
          ))}
        </ul>
        <div className="Stores">
          {listFillter ? (
            listFillter?.map((item, index) => <Store key={index} item={item} />)
          ) : (
            <h5>Chưa có cửa hàng nào !</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListStore;
