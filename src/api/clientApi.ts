import axios from "axios";
import { environment } from "../utils/globals";

const clientApi = axios.create({
  baseURL: environment.baseUrls.client,
  withCredentials: true,
});

export default clientApi;
