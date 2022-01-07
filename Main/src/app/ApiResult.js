import axios from "axios";
export const getNews = async (numList) => {
  try {
    const res = await axios.get("/news");
    return res?.data.slice(0, numList);
  } catch (error) {}
};
export const getProductType = async () => {
  try {
    const res = await axios.get("/ProductTypes");
    return res?.data;
  } catch (error) {}
};
export const getProducts = async () => {
  try {
    const res = await axios.get("/products");
    return res?.data;
  } catch (error) {}
};
export const getBillsId = async (id) => {
  try {
    const res = await axios.get(`/bill/${id}`);
    return res?.data;
  } catch (error) {
    return [];
  }
};
//
export const CheckoutData = async (data) => {
  try {
    const response = await axios.post("/bill/purchase", data);
    console.log(response)
    return response.status;
  } catch (error) {}
};
export const getCustomerById = async (id) => {
  try {
    const res = await axios.get(`/customer/${id}`);
    if (res?.data) return res?.data;
    return [];
  } catch (error) {
    return [];
  }
};
export const updateCustomer = async (dataform) => {
  try {
    const res = await axios.put(`/customer/edit/${dataform?.Id}`, dataform);
    if (res?.status === 200) return { success: true };
    return { success: false };
  } catch (error) {
    return [];
  }
};
export const getStore = async () => {
  try {
    const res = await axios.get("/stores");
    console.log(res.data)
    if (res?.data) return res?.data;
    return [];
  } catch (error) {
    return [];
  }
};
export const getCustomerStore = async () => {
  try {
    const res = await axios.get("/stores/customer");
    if (res?.data) return res?.data;
    return [];
  } catch (error) {
    return [];
  }
};

export const getStoreByDistrict = async () => {
  try {
    const res = await axios.get("/stores/district");
    if (res?.data) return res?.data;
    return [];
  } catch (error) {
    return [];
  } 
};

export const getDiscounts = async () => {
  try {
    const res = await axios.get("/discount");
    if (res?.data) return res?.data;
    return [];
  } catch (error) {
    return [];
  }
};

export const getNewsById = async (id) => {
  try {
    const res = await axios.get(`/news/${id}`);
    console.log(res)
    if (res?.data) return res?.data;
    return [];
  } catch (error) {
    return [];
  }
};
export const forgotPass = async (email, data) => {
  try {
    const res = await axios.put(`/customer/forgot/${email}`, data);
    if (res) return res;
  } catch (error) {}
};
export const isEmail = async (email) => {
  try {
    const data = { Email: email };
    console.log(data);
    const res = await axios.post(`/customer/checkEmail`, data);
    if (res?.status === 200) return { success: true };
    else return { success: false };
  } catch (error) {
    return { success: false };
  }
};
