import { errorMessage } from "@/utils/errorMessage";
import axios from "axios";

const MainDomain = "http://localhost:8081";

const isLive = () => {
  const route = "/live";
  return appFetch(route, "GET");
};

const appFetch = async (
  route: string,
  method: "GET" | "POST" | "PATCH",
  body?: any
) => {
  try {
    const response = await axios({
      method: method,
      url: MainDomain + route,
      data: method != "GET" ? body : null,
    });

    return await response.data;
  } catch (error) {
    errorMessage(error);
  }
};

export { isLive };
