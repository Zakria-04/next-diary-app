export type UserInfo = {
  userName: string;
  userPass: string;
  email?: string;
};

export type DeleteDiaryType = {
  diaryIDs: string[];
  authID: string | undefined;
};

export type GetUserListType = {
  authID: string | undefined;
};
