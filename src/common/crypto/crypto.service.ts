import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { createHash } from 'crypto';
@Injectable()
export class CryptoService {
  private secretKey = process.env.SECRETKEY;

  encrypt(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  decrypt(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  hashPassword(password: string): string {
    const hash = createHash('md5');
    hash.update(password);
    return hash.digest('hex');  // Şifreyi hex formatında döner
  }
}
