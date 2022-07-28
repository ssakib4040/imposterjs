class Imposter {
  static #names = ["John Doe", "Jane Doe", "Bob Doe"];
  constructor() {}

  // random data from array
  static #randomArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static getName() {
    return this.#randomArray(this.#names);
  }
}

export default Imposter;
