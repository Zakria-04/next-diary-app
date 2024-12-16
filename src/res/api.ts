import { errorMessage } from "@/utils/errorMessage";
import axios from "axios";

const MainDomain = "http://localhost:8081";

const isLive = () => {
  const route = "/live";
  return appFetch(route, "GET");
};

const loginUserFromDB = (body: UserInfo) => {
  const route = "/login_user";
  return appFetch(route, "POST", body);
};

const createUserToDB = (body: UserInfo) => {
  const route = "/create_user";
  return appFetch(route, "POST", body);
};

const appFetch = async (
  route: string,
  method: "GET" | "POST" | "PATCH",
  body?: UserInfo
) => {
  try {
    const response = await axios({
      method: method,
      url: MainDomain + route,
      data: method != "GET" ? body : null,
    });

    return await response.data;
  } catch (error: any) {
    const serverError =
      error.response?.data || "An unexpected error occurred";
    console.error(`Error on fetching the route, ${route}: ${serverError}`);
    throw new Error(JSON.stringify(serverError));
  }
};

export { isLive, loginUserFromDB, createUserToDB };
