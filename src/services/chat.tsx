import { Axios } from ".";
import { PATH } from "./path";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getMessages = async (peerUserId: string, token: string) => {
  const URL = `${PATH.get_messages}` + `?peerUserId=${peerUserId}`;
  return await Axios.get(URL, undefined, { baseURL: BASE_URL, token });
};
