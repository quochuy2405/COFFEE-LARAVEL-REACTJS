import { useEffect, useState } from "react";
import { getStore } from "../../app/ApiResult";
import TableStore from "../Table/Store";
function Store() {
  const [flag, setFlag] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [paginate, setPaginate] = useState({
    page: 1,
    size: 10,
    count: 0,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await getStore(paginate, "/stores");
    if (res) {
      setData(res?.data);
      setPaginate({
        ...paginate,
        count: res?.totalPages,
      });
      setFlag(false);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);
  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <>
      {loading ? (
        <div className="spinner-border text-success" Store="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <TableStore
          List={data}
          paginate={paginate}
          setPaginate={setPaginate}
          setFlag={setFlag}
          Type="STORE"
        />
      )}
    </>
  );
}
export default Store;
