import { DiaryListTypes } from "@/store/types";
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

const createDiaryToDB = (body: DiaryListTypes) => {
  const route = "/create_diary";
  return appFetch(route, "POST", body);
};

const updateDiaryFromDB = (body: DiaryListTypes) => {
  const route = "/update_diary";
  return appFetch(route, "PATCH", body);
};

const deleteDiaryFromDB = (body: DeleteDiaryType) => {
  const route = "/delete_diary";
  return appFetch(route, "DELETE", body);
};

const getUserDiaryFromDB = (body: GetUserListType) => {
  const route = "/get_diary";
  return appFetch(route, "POST", body);
};

const appFetch = async (
  route: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body?: UserInfo | DiaryListTypes | DeleteDiaryType | GetUserListType
) => {
  try {
    const response = await axios({
      method: method,
      url: MainDomain + route,
      data: method != "GET" ? body : null,
    });

    return await response.data;
  } catch (error: any) {
    const serverError = error.response?.data || "An unexpected error occurred";
    console.error(`Error on fetching the route, ${route}: ${serverError}`);
    throw new Error(JSON.stringify(serverError));
  }
};

export {
  isLive,
  loginUserFromDB,
  createUserToDB,
  createDiaryToDB,
  updateDiaryFromDB,
  deleteDiaryFromDB,
  getUserDiaryFromDB,
};
