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
}

export default Imposter;
