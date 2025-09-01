import axios from "axios";
import { environment } from "../utils/globals";

const authApi = axios.create({
  baseURL: environment.baseUrls.auth,
  withCredentials: true,
});

export default authApi;
