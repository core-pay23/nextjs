// generate unique ID for each payment
import { v4 as uuidv4 } from 'uuid';

export function generateUniqueId() {
  return uuidv4();
}
