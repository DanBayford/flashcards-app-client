/*
Copy of accessToken stored outside component tree so Axios can access
*/
let accessToken: string | null = null;

const AccessToken = {
  set: (token: string) => (accessToken = token),
  get: () => accessToken,
  clear: () => (accessToken = null),
};

export default AccessToken;
