import { useEffect, useState } from "react";
import { getSales } from "../../app/ApiResult";
import TableManagers from "../Table/TablePeople/Managers";
function Managers() {
  const [flag, setFlag] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState({
    page: 1,
    size: 10,
    count: 0,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await getSales(paginate, "/managers");
    setData(res?.data);
    setPaginate({
      ...paginate,
      count: res?.totalPages,
    });
    setFlag(false);
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);
  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <>
      {loading ? (
        <TableManagers
          List={data}
          paginate={paginate}
          setPaginate={setPaginate}
          setFlag={setFlag}
        />
      ) : (
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
}
export default Managers;
