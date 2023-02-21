export const isSignedIn = () => {
  if (typeof window === "undefined") return false;
  const user = window.localStorage.getItem("user");
  if (!user) return false;
  return JSON.parse(user);
};

export const setUser = (user, next) => {
  user.user.password = null;
  user.user.otp = null;
  if (typeof window === "undefined") return;
  window.localStorage.setItem("user", JSON.stringify(user));
  next();
};

export const removeUser = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("user");
};
