import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionKM } from "../../app/KMOpen";
import { context } from "./../../app/Context";
import "./styles.scss";

function Ticket(props) {
  const { item } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { setDiscount } = useContext(context);
  const handleCheck = () => {
    setDiscount(item);
    dispatch(actionKM(false));
    history.push("/checkout");
  };
  return (
    <div className="Sale_Card">
      <div className="img_Card">
        <img src={item?.Photo} alt="" />
      </div>
      <div className="contend_card">
        <div>
          <div className="title">
            <p>{item?.Name}</p>
            <p>{item?.Quality}</p>
          </div>

          <p className="due_date">{item.ExpiredDate.slice(0, 10)}</p>

          <p onClick={handleCheck} className="use_now">
            Sử dụng ngay
          </p>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
