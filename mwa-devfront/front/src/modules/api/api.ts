import { apifetch } from "./axios";
import { IReqUser} from "../../interfaces";

type CreateUserResponse = {
  access_token: string;
};
type GetUsersResponse = {
  users_list:[];
};
interface IUserID{
  id:string;
};
type GetUsersRequests = {
  data: {}
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
    try {
      const resp = await apifetch.get<GetUsersResponse>(`/api/v1/users`)
    }catch (error) {
      console.error(error)
    };
  
  },

  createUser: async (value:IReqUser) => {
    const data = {
      username: value.username,
      password: value.password,
    };
    const resp = await apifetch.post<CreateUserResponse>(`/api/v1/users`, {...data,});
  },

  getUserbyId: async (value:IUserID) => {
    try {
      const id = value.id
      const resp = await apifetch.get<GetUsersResponse>(`/api/v1/users/${id}`)
    }catch (error) {
      console.error(error)
    };
  },
  updateUser: async (value:IUserID) => {
    try {
      const id = value.id;
      const resp = await apifetch.patch<GetUsersRequests>(`/api/v1/users/${id}`)
    }catch (error) {
      console.error(error)
    };
  },
  deleteUser: async (value:IUserID) => {
    try {
      const id = value.id;
      const resp = await apifetch.delete<GetUsersResponse>(`/api/v1/users/${id}`)
    } catch (error) {
      console.error(error)
    };
  },
  registerUser: async (value:IReqUser) => {
    const data = {
      username: value.username,
      password: value.password,
    };
    const resp = await apifetch.post<CreateUserResponse>(`/api/v1/register`, {...data,});
  },
      

};
