import { BASE_API_URL } from "@/app/constants";
import { ClientAPI } from "./client/client.api";
import { queryClient } from "./client/client.query";

const clientAPI = ClientAPI.getInstance(BASE_API_URL);

export { clientAPI, queryClient };
