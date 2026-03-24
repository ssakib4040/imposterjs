import { firstNames, middleNames, lastNames } from "./modules/names";
import { addresses } from "./modules/addresses";
import { lorem } from "./modules/lorem";

interface Coordinates {
  latitude: number;
  longitude: number;
}

class Imposter {
  // random data from array
  private static randomArray<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // @ts-ignore - Conflict with built-in Function.name, but this is a valid API
  static name(): string {
    const randomName = `${this.randomArray(firstNames)} ${this.randomArray(
      middleNames,
    )} ${this.randomArray(lastNames)}`;
    return randomName;
  }

  static address(): string {
    const randomAddress = this.randomArray(addresses).address1;
    return randomAddress;
  }

  static city(): string {
    const randomCity = this.randomArray(addresses).city;
    return randomCity;
  }

  static state(): string {
    const randomState = this.randomArray(addresses).state;
    return randomState;
  }

  static postalCode(): string {
    const randomPostalCode = this.randomArray(addresses).postalCode;
    return randomPostalCode;
  }

  static coordinates(): Coordinates {
    // Fix: get single random address to ensure lat/lng match
    const randomAddress = this.randomArray(addresses);
    const randomCoordinates: Coordinates = {
      latitude: randomAddress.coordinates.lat,
      longitude: randomAddress.coordinates.lng,
    };
    return randomCoordinates;
  }

  static latitude(): number {
    const randomLatitude = this.randomArray(addresses).coordinates.lat;
    return randomLatitude;
  }

  static longitude(): number {
    const randomLongitude = this.randomArray(addresses).coordinates.lng;
    return randomLongitude;
  }

  // function to generate lorem ipsum
  static loremIpsum(count: number = 300): string {
    const loremIpsum = lorem.substring(0, count);
    return loremIpsum;
  }

  static uuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c: string): string {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }

  static phone(): string {
    return (
      "(" +
      this.randomNumber(100, 999) +
      ") " +
      this.randomNumber(100, 999) +
      "-" +
      this.randomNumber(1000, 9999)
    );
  }

  static email(): string {
    return (
      this.randomArray(firstNames) +
      "." +
      this.randomArray(lastNames) +
      "@" +
      this.randomArray(["gmail", "yahoo", "hotmail"]) +
      ".com"
    );
  }

  static ip(): string {
    return (
      this.randomNumber(1, 255) +
      "." +
      this.randomNumber(1, 255) +
      "." +
      this.randomNumber(1, 255) +
      "." +
      this.randomNumber(1, 255)
    );
  }

  static macAddress(): string {
    return (
      this.randomNumber(1, 255) +
      ":" +
      this.randomNumber(1, 255) +
      ":" +
      this.randomNumber(1, 255) +
      ":" +
      this.randomNumber(1, 255) +
      ":" +
      this.randomNumber(1, 255) +
      ":" +
      this.randomNumber(1, 255)
    );
  }

  static url(): string {
    const randomUrl = `https://${this.randomArray([
      "www",
      "m",
      "en",
    ])}.${this.randomArray(firstNames)}.${this.randomArray([
      "com",
      "net",
      "org",
    ])}`;

    return randomUrl;
  }

  static randomString(length: number = 10): string {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  static randomNumber(min: number = 1, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomBoolean(): boolean {
    return Math.random() >= 0.5;
  }
}

export default Imposter;
