export default {
  getToken() {
    return localStorage.getItem("token");
  },
  isLoggedIn() {
    return !!this.getToken();
  },
  logout() {
    localStorage.removeItem("token");
  },
};
