import crypto from 'crypto';

export default function CreateHash(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex');
}
