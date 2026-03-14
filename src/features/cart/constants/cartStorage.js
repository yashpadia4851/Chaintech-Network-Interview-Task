import { readJson, writeJson } from "../../../utils/storage";
import { CART_STORAGE_PREFIX } from "./cart.constants";

export function cartKey(userId) {
  return `${CART_STORAGE_PREFIX}${userId}`;
}

export function readCart(userId) {
  if (!userId) return [];
  return readJson(cartKey(userId), []);
}

export function writeCart(userId, items) {
  if (!userId) return;
  writeJson(cartKey(userId), items);
}
