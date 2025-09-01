import axios from "axios";
import { environment } from "../utils/globals";

const docsApi = axios.create({
  baseURL: environment.baseUrls.docs,
  withCredentials: true,
});

export default docsApi;
