type UserInfo = {
  userName: string;
  userPass: string;
  email: string;
};

type DeleteDiaryType = {
  diaryIDs: string[],
  authID: string | undefined,
};

type GetUserListType = {
  authID: string | undefined
}