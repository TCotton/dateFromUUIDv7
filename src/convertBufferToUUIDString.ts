import { stringify } from 'uuid';

const convertBufferToUUIDString = (originalBuf: Buffer): string => {
  return stringify(originalBuf);
};

export { convertBufferToUUIDString };
