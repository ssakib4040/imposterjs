import { firstNames, middleNames, lastNames } from "./modules/names";
import { addresses } from "./modules/addresses";

class Imposter {
  // random data from array
  static #randomArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static name() {
    const ranndomName = `${this.#randomArray(firstNames)} ${this.#randomArray(
      middleNames
    )} ${this.#randomArray(lastNames)}`;
    return ranndomName;
  }

  static address() {
    const randomAddress = this.#randomArray(addresses).address1;
    return randomAddress;
  }

  static city() {
    const randomCity = this.#randomArray(addresses).city;
    return randomCity;
  }

  static state() {
    const randomState = this.#randomArray(addresses).state;
    return randomState;
  }

  static postalCode() {
    const randomPostalCode = this.#randomArray(addresses).postalCode;
    return randomPostalCode;
  }

  static coordinates() {
    const randomCoordinates = {
      latitude: this.#randomArray(addresses).coordinates.lat,
      longitude: this.#randomArray(addresses).coordinates.lng,
    };
    return randomCoordinates;
  }

  static latitude() {
    const randomLatitude = this.#randomArray(addresses).coordinates.lat;
    return randomLatitude;
  }

  static longitude() {
    const randomLongitude = this.#randomArray(addresses).coordinates.lng;
    return randomLongitude;
  }

  static uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static phone() {
    return (
      "(" +
      this.randomNumber(100, 999) +
      ") " +
      this.randomNumber(100, 999) +
      "-" +
      this.randomNumber(1000, 9999)
    );
  }

  static email() {
    return (
      this.#randomArray(firstNames) +
      "." +
      this.#randomArray(lastNames) +
      "@" +
      this.#randomArray(["gmail", "yahoo", "hotmail"]) +
      ".com"
    );
  }

  static ip() {
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

  static url() {
    const randomUrl = `https://${this.#randomArray([
      "www",
      "m",
      "en",
    ])}.${this.#randomArray(firstNames)}.${this.#randomArray([
      "com",
      "net",
      "org",
    ])}`;

    return randomUrl;
  }

  static randomString(length = 10) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  static randomNumber(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomBoolean() {
    return Math.random() >= 0.5;
  }
}

export default Imposter;
