import type {
  ILogin,
  ILoginResponse,
} from "../../modules/auth/schemas/login.schema";
import type {
  IRegister,
  IRegisterResponse,
} from "../../modules/auth/schemas/register.schema";
import { clientAPI } from "../config";

export class AuthService {
  static loginUser = (data: ILogin) =>
    clientAPI.http.post<ILoginResponse>("/auth/login", data);

  static registerUser = (data: IRegister) =>
    clientAPI.http.post<IRegisterResponse>("/auth/register", data);

  static logoutUser = () => clientAPI.http.post("/auth/logout");
}
