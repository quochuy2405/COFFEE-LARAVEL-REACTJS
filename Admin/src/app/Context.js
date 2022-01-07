import { createContext, useState } from "react";

export const context = createContext();
const ContextProvider = ({ children }) => {
  const [fitterAdmin, setFillerAdmin] = useState("BILLORDER");
  const [bodyAdmin, setBodyAdmin] = useState(undefined);
  const [TypeDataPro, setTypeDataPro] = useState("COFFEES");
  const [TypeDataSale, setTypeDataSale] = useState("TABLESALES");
  const [userRole, setUserRole] = useState();
  const [checkToken, setCheckToken] = useState();
  const value = {
    fitterAdmin,
    setFillerAdmin,
    bodyAdmin,
    setBodyAdmin,
    TypeDataPro,
    setTypeDataPro,
    TypeDataSale,
    setTypeDataSale,
    userRole,
    setUserRole,
    checkToken,
    setCheckToken,
  };
  return <context.Provider value={value}>{children}</context.Provider>;
};
export default ContextProvider;
