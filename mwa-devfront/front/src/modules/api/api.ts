import { apifetch } from "./axios";
import { IReqUser}from "../../interfaces";

type CreateUserResponse = {
  access_token: string;
};

export const api = {
  loginAccount: async (value: IReqUser) => {
    const user = { username: value.username, password: value.password };
    const resp = await apifetch.post<CreateUserResponse>(`/api/v1/auth/login`, {
      ...user,
    });
    await localStorage.setItem("token", resp.data.access_token);
    const resptwo = await apifetch.get(`api/v1/auth/profile`);
    const data = {
      username: resptwo.data.username,
      session: true,
      userId: resptwo.data.userId,
    };

    return data;
  },
  getAllUsers: async (value:IReqUser) => {
    const user = {username: value.username};
    const resp = await apifetch.get<CreateUserResponse>(`/api/v1/users`);
    const data = {
      userId: resp.id,
      username: resp.username,
      password: resp.password,
      events: resp.events
    }
    return data;
  }
  
};