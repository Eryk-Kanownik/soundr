export const authConfig = {
  headers: {
    authorization: localStorage.getItem("token"),
  },
};
