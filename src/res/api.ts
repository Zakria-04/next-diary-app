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

const createDiaryToDB = (body: any) => {
  const route = "/create_diary";
  return appFetch(route, "POST", body);
};

const updateDiaryFromDB = (body: any) => {
  const route = "/update_diary";
  return appFetch(route, "PATCH", body);
};

const deleteDiaryFromDB = (body: any) => {
  const route = "/delete_diary";
  return appFetch(route, "DELETE", body);
};

const getUserDiaryFromDB = (body: any) => {
  const route = "/get_diary";
  return appFetch(route, "GET");
};

const appFetch = async (
  route: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
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
