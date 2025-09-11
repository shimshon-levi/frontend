import axios from "axios";
// דרך ה-Gateway באותו דומיין/פורט
const api = axios.create({ withCredentials: true });
export default api;
