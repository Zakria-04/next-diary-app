export const errorMessage = (err: unknown) => {
  const errMsg =
    err instanceof Error ? err.message : "An unknown error occurred";
    
  console.error(errMsg);

  return errMsg;
};
