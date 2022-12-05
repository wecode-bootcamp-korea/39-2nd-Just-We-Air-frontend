export const BASE_URL = 'http://10.58.52.72:3000';
const API = {
  main: `${BASE_URL}/`, //백엔드한테 물어봐서 수정해야됨
  booking: `${BASE_URL}/booking`, //여기두
  login: `${BASE_URL}/users/signin`,
  signup: `${BASE_URL}/users`,
  payment: `${BASE_URL}/orders`,
  paymentsuccess: `${BASE_URL}/payment`,
};

export default API;
