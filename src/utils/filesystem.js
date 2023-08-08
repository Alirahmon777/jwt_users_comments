import { rmSync, existsSync } from 'fs';
import { join } from 'path';
export const DeleteFile = (filePath) => {
  try {
    return rmSync(join(process.cwd(), filePath));
  } catch (error) {
    return error.message;
  }
};

export const ExistsFile = (filePath) => {
  try {
    return existsSync(join(process.cwd(), filePath));
  } catch (error) {
    return error.message;
  }
};
