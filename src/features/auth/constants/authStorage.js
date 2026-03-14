import { readJson, writeJson, removeKey } from "../../../utils/storage";
import { AUTH_STORAGE_KEYS } from "./auth.constants";

export function getUsers() {
  return readJson(AUTH_STORAGE_KEYS.users, []);
}

export function setUsers(users) {
  writeJson(AUTH_STORAGE_KEYS.users, users);
}

export function getSession() {
  return readJson(AUTH_STORAGE_KEYS.session, null);
}

export function setSession(session) {
  writeJson(AUTH_STORAGE_KEYS.session, session);
}

export function clearSession() {
  removeKey(AUTH_STORAGE_KEYS.session);
}
