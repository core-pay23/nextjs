// generate unique ID for each payment
import { v4 as uuidv4 } from 'uuid';

export function generateUniqueId() {
  return uuidv4();
}

export function formatAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}