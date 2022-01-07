import { useEffect, useState } from "react";
import { getDiscounts } from "../../../app/ApiResult";
import TableDiscounts from "../../Table/TableProduct/Discounts";
function Discount() {
  const [flag, setFlag] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState({
    page: 1,
    size: 10,
    count: 0,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await getDiscounts(paginate, "/discount");
    setData(res?.data);
    setPaginate({
      ...paginate,
      count: res?.totalPages,
    });
    setFlag(false);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);
  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <>
      {loading ? (
        <div className="spinner-border text-success" Discount="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <TableDiscounts
          List={data}
          paginate={paginate}
          setPaginate={setPaginate}
          setFlag={setFlag}
          Type="Discount"
        />
      )}
    </>
  );
}
export default Discount;
