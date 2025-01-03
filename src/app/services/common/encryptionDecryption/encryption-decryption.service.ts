import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import * as JsEncryptModule from 'jsencrypt';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class EncryptionDecryptionService {
  plainText: string = 'testing encryption';
  cypherText: string = '';

  encryptMod: any;
  text: string = 'Hello';
  publicKey: string ="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg7ewC6yXpwPm19NyV+WvWrjxCUlW/kZQmCxWuhAFuOof17qnTN187cXY4GroC8LvgypJ9KQm5RpWhQ8+bWUI4u5Kg+Imy+EoG9uItcxArdRIrn/x/wYWaEUV23SqCM6eeCgadT9TVY/kn7H2+NMdWOREJepLZe07Ss7HGQdUjzO8MTj0LgCZlmcpEG1VL2EDiKIyyZC6U628RR+LxqPg6lWOP3XsTS5m/PoTvhemGOYdAoP93nNUSKgt0ubJ6xmw8JRIHC6ZxAhFjvgJ9Iapa59FDtjjALqv9ZR+brfzo4lFcyMyOfwU7QJ2cB6zg+HYDz+I/k1AYy4MSaSjQMKFdQIDAQAB"
  // privateKey: string ="MIIEpQIBAAKCAQEAg7ewC6yXpwPm19NyV+WvWrjxCUlW/kZQmCxWuhAFuOof17qnTN187cXY4GroC8LvgypJ9KQm5RpWhQ8+bWUI4u5Kg+Imy+EoG9uItcxArdRIrn/x/wYWaEUV23SqCM6eeCgadT9TVY/kn7H2+NMdWOREJepLZe07Ss7HGQdUjzO8MTj0LgCZlmcpEG1VL2EDiKIyyZC6U628RR+LxqPg6lWOP3XsTS5m/PoTvhemGOYdAoP93nNUSKgt0ubJ6xmw8JRIHC6ZxAhFjvgJ9Iapa59FDtjjALqv9ZR+brfzo4lFcyMyOfwU7QJ2cB6zg+HYDz+I/k1AYy4MSaSjQMKFdQIDAQABAoIBAQCADLM4pjFITKK+bvFaQhCXQfQR8xp/WBxB09j8SVdGzVTnhK3gK/KntQ+CHGw6AuiVuybqjirBzzkNYiRudSqOcto+HD1bNyim7GWbV1YJp7aA7iF0q5ZdB8yX7HLg3P1yEoqmMUnyhFDeb0SJ4bNGF6OouH1UOazKrPshed7a1yozQ8ZbC4P0cSn1UdqYoBPbWrVDP82OtsVPc1inK+blx9APMbEA6PnQdgppDUjsdnav7dffoY/0pYYf6i4ysHsZ6Poy3SMQ9pi5mMkOmi0tbxnhFXb/kBxKXNKAcP+Dz29ANPPjei9cae7QeH1g4pqilFUlJ7xhwO3WrGn6EGwBAoGBAMlDJ1sKQP2bXHaFImR0SQkFvXSLXSkIuun3ee+TcxJeXPTwE2CTWktnL+N5gk+v/jI8Pta34PxhpbXrmTv5i1AjIhsqW2AY6z+7PT1+Jb7PKhq+Xvx77uTAQY3P5vvxTPrFn96xcfb80EwE6Fb2jjNeyZuAT0BW1TtXSG3wibAZAoGBAKeKfiToyaR3jLJjtRUTk7/l1yz1FYqMYKz9kmtctAdvn+ui9Dl9Ss6XyImiONE6O/6tsYNqfM7gfpFXGc8lQASy0FfHK/wms+9jqtgiJYe0IY9P5nPe5q7xdk/Hj8dEXousFZadMSQHwY/OHq1oXxxgT7WhJj6gXq8u5a/u9AoGAOHNbgI+ZtwhyoNOq19499gfkIeJNGQtX0fQWAXqsFgTdsd38sWPjOa8RoY4dXNiSRejb/0HIG0IQRrx0WHwf9TRFhrUUuBmFMnUEMlFFqQVWW/X1kn/4e7TpLiuYMCZ4XwY7Vy0SOCKlEg12VZ4GKZnifQtRnCUknZi3GNRW1ECgYEApcg7tCgIx05okWhqGbXqgHtc5SaKrzLiwqqTRNtRZP5GXzM6uNxKtoyoqdA0qowWK5cRzPkFEOxBMW3fowK4Cy4pTIJP+s0NRXb46a84NcS/ZIDqh4Nr/nX93UmZ8tKrP0jm1yFeiiHJKDsHnEWF/7sBjcjCJWyM0wbBPvB2cn0CgYEAiFAsEL0pByDX4KSDq3qcQ4HNCEClCRlqLvE4ja/9BLYB6IU1frb0wYqL0cJF9U5mG9Rs4KzaGcPe0QoszKpFYdCf8aNNvoIstJOnOfMNUECMCTsrAac7xWImSqMmBGnfV3XkiFf6ygxu68IrRZJfkYx0lQpWVL4eoiNBAE5oq0s="
  privateKey: string = "MIIEpQIBAAKCAQEAg7ewC6yXpwPm19NyV+WvWrjxCUlW/kZQmCxWuhAFuOof17qnTN187cXY4GroC8LvgypJ9KQm5RpWhQ8+bWUI4u5Kg+Imy+EoG9uItcxArdRIrn/x/wYWaEUV23SqCM6eeCgadT9TVY/kn7H2+NMdWOREJepLZe07Ss7HGQdUjzO8MTj0LgCZlmcpEG1VL2EDiKIyyZC6U628RR+LxqPg6lWOP3XsTS5m/PoTvhemGOYdAoP93nNUSKgt0ubJ6xmw8JRIHC6ZxAhFjvgJ9Iapa59FDtjjALqv9ZR+brfzo4lFcyMyOfwU7QJ2cB6zg+HYDz+I/k1AYy4MSaSjQMKFdQIDAQABAoIBAQCADLM4pjFITKK+bvFaQhCXQfQR8xp/WBxB09j8SVdGzVTnhK3gK/KntQ+CHGw6AuiVuybqjirBzzkNYiRudSqOcto+HD1bNyim7GWbV1YJp7aA7iF0q5ZdB8yX7HLg3P1yEoqmMUnyhFDeb0SJ4bNGF6OouH1UOazKrPshed7a1yozQ8ZbC4P0cSn1UdqYoBPbWrVDP82OtsVPc1inK+blx9APMbEA6PnQdgppDUjsdnav7dffoY/0pYYf6i4ysHsZ6Poy3SMQ9pi5mMkOmi0tbxnhFXb/kBxKXNKAcP+Dz29ANPPjei9cae7QeH1g4pqilFUlJ7xhwO3WrGn6EGwBAoGBAMlDJ1sKQP2bXHaFImR0SQkFvXSLXSkIuun3ee+TcxJeXPTwE2CTWktnL+N5gk+v/jI8Pta34PxhpbXrmTv5i1AjIhsqW2AY6z+7PT1+Jb7PKhq+Xvx77uTAQY3P5vvxTPrFn96xcfb80EwE6Fb2jjNeyZuAT0BW1TtXSG3wibAZAoGBAKeKfiToyaR3jLJjtRUTk7/l1yz1FYqMYKz9kmtctAdvn+ui9Dl9Ss6XyImiONE6O/6tsYNqfM7gfpFXGc8lQASy0FfHK/wms+9jqtgiJYe0IY9P5nPe5q7xdk/Hj8dEXous+1aFZadMSQHwY/OHq1oXxxgT7WhJj6gXq8u5a/u9AoGAOHNbgI+ZtwhyoNOq19499gfkIeJNGQtX0fQWAXqsFgTdsd38sWPjOa8RoY4dXNiSRejb/0HIG0IQRrx0WHwf9TRFhrUUuBmFMnUEMlFFqQVWW/X1kn/4e7TpLiuYMCZ4XwY7Vy0SOCKlEg12VZ4GOKZnifQtRnCUknZi3GNRW1ECgYEApcg7tCgIx05okWhqGbXqgHtc5SaKrzLiwqqTRNtRZP5GXzM6uNxKtoyoqdA0qowWK5cRzPkFEOxBMW3fowK4Cy4pTIJP+s0NRXb46a84NcS/ZIDqh4Nr/nX93UmZ8tKrP0jm1yFeiiHJKDsHnEWF/7sBjcjCJWyM0wbBPvB2cn0CgYEAiFAsEL0pByDX4KSDq3qcQ4HNCEClCRlqLvE4ja/9BLYB6IU1frb0wYqL0cJF9U5mG9Rs4KzaGcPe0QoszKpFYdCf8aNNvoIstJOnOfMNUECMCTsrAac7xWImSqMmBGnfV3XkiFf6ygxu68IrRZJfkYx0lQpWVL4eoiNBAE5oq0s="

  constructor(private datePipe: DatePipe) {
    this.encryptMod = new JsEncryptModule.JSEncrypt();
  }
  
  public dateFormate(val:any){
    const inputDateString = val;
    const inputDate = new Date(inputDateString);
    const formattedDate = this.datePipe.transform(inputDate, 'M/d/yyyy h:mm:ss a');
    return formattedDate;
  }

  encrypt(value:any) {
   let encryptedValue = this.convertData(value)
    var date = new Date();
    date.setSeconds(date.getSeconds() + 6099999);
    let date2 = this.dateFormate(date)
    let newDate = date2?.toLocaleString().split(',').join('');
    this.encryptMod.setPublicKey(this.publicKey);
    this.cypherText = this.encryptMod.encrypt(encryptedValue);
    // this.cypherText = this.encryptMod.encrypt(encryptedValue + '|' + newDate);
    // console.log('encryptedText-', this.cypherText);
    return this.cypherText;
    // this.decrypt();
  }

  decrypt(value:any) {
    this.encryptMod.setPrivateKey(this.privateKey);
    this.plainText = this.encryptMod.decrypt(value);

    if (value == '' || value == null) {
      return '';
    } else if (this.plainText.includes('|')) {
      // console.log(this.plainText.split('|')[1]);
      var tokendate = new Date(this.plainText.split('|')[1]);
      var cdate = new Date();
      // console.log(tokendate);
      if (false) {
        // console.log('token expired');
        return '';
      } else {
        // console.log('token valid');
        return this.plainText.split('|')[0];
      }
    } else {
      return '';
    }
  }

  private  convertData(data: any): string {
    if (typeof data === 'number') {
      return  JSON.stringify(data);
    } else if (typeof data === 'string') {
      return  data
    } else {
      return 'Unsupported data type';
    }
  }

  public convertToPercent(inputString: string): string {
    return inputString.replace(/\//g, '%');
  }
}