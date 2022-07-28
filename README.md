<div align="center">
  <a href="#">
    <img src="https://raw.githubusercontent.com/ssakib4040/imposterjs/master/imposter.png" alt="Logo" width="100" height="100">
  </a>

  <h2 align="center">Imposter.js</h2>

  <p align="center">
   Generate fake/dummy data for testing
  </p>
</div>

<br/>

<!-- GETTING STARTED -->

## Getting Started

```sh
npm install imposterjs
```

or with yarn

```sh
yarn add imposterjs
```

<!-- USAGE EXAMPLES -->

## Usage

```js
const imposter = require("imposterjs");

imposter.name(); // 'John Doe'
```

<!-- API -->

## API

| Syntax                     | Output                                         |
| -------------------------- | ---------------------------------------------- |
| `imposter.name()`          | John Doe                                       |
| `imposter.address()`       | 7301 Northwest 113th Terrace                   |
| `imposter.city()`          | Panama City Beach                              |
| `imposter.state()`         | GA                                             |
| `imposter.postalCode()`    | 40299                                          |
| `imposter.coordinates()`   | { latitude: 36.113929, longitude: -85.649453 } |
| `imposter.latitude()`      | 42.1995008                                     |
| `imposter.longitude()`     | -97.53227299999999                             |
| `imposter.uuid()`          | 4982268e-0ec9-4f5d-9533-e7d09cb693d9           |
| `imposter.phone()`         | (468) 126-8518                                 |
| `imposter.email()`         | Genvieve.Chrotoem@hotmail.com                  |
| `imposter.ip()`            | 146.150.129.126                                |
| `imposter.url()`           | https://m.Madeleine.com                        |
| `imposter.randomString()`  | mXTvAUpxlH                                     |
| `imposter.randomNumber()`  | 22                                             |
| `imposter.randomBoolean()` | false                                          |
