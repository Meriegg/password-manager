import axios from "axios";

import { apiUrl } from "../prodConfig";

export default axios.create({ baseURL: apiUrl, withCredentials: true });
