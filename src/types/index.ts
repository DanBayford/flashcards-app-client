// Auth types
export type TLoginRequest = { email: string; password: string };
export type TRegisterRequest = { email: string; password: string };
export type TAuthResponse = { accessToken: string; userInfo: TUser };
export type TUser = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
