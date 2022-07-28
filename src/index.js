import { firstNames, middleNames, lastNames } from "./names";

class Imposter {
  constructor() {}

  // random data from array
  static #randomArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static getName() {
    const ranndomName = `${this.#randomArray(firstNames)} ${this.#randomArray(
      middleNames
    )} ${this.#randomArray(lastNames)}`;
    return ranndomName;
  }
}

export default Imposter;
