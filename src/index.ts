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
    // FIX: Ensure octets stay within 0-255 range
    return (
      this.randomNumber(1, 254) +
      "." +
      this.randomNumber(0, 255) +
      "." +
      this.randomNumber(0, 255) +
      "." +
      this.randomNumber(1, 254)
    );
  }

  static macAddress(): string {
    // FIX: Output proper hex format (AA:BB:CC:DD:EE:FF)
    const hexPairs = () => {
      return this.randomNumber(0, 255).toString(16).padStart(2, "0").toUpperCase();
    };
    return `${hexPairs()}:${hexPairs()}:${hexPairs()}:${hexPairs()}:${hexPairs()}:${hexPairs()}`;
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

  // NEW GENERATORS - Date/Time

  static date(options?: { minYearsAgo?: number; maxYearsAgo?: number }): string {
    const minYearsAgo = options?.minYearsAgo ?? 50;
    const maxYearsAgo = options?.maxYearsAgo ?? 0;
    
    const now = new Date();
    const minMs = now.getTime() - minYearsAgo * 365.25 * 24 * 60 * 60 * 1000;
    const maxMs = now.getTime() - maxYearsAgo * 365.25 * 24 * 60 * 60 * 1000;
    
    const randomTimestamp = Math.random() * (maxMs - minMs) + minMs;
    return new Date(randomTimestamp).toISOString().split('T')[0];
  }

  static timestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  static birthDate(): string {
    return this.date({ minYearsAgo: 80, maxYearsAgo: 18 });
  }

  // NEW GENERATORS - Security & Payment

  static creditCard(type: 'visa' | 'mastercard' | 'amex' = 'visa'): string {
    let prefix: string;
    let length: number;

    if (type === 'visa') {
      prefix = '4';
      length = 16;
    } else if (type === 'mastercard') {
      prefix = '5' + this.randomNumber(1, 5);
      length = 16;
    } else {
      prefix = '34';
      length = 15;
    }

    let card = prefix;
    for (let i = prefix.length; i < length - 1; i++) {
      card += this.randomNumber(0, 9);
    }

    // Luhn algorithm: add placeholder 0 for checksum position, then calculate what it should be
    card += '0';
    
    let sum = 0;
    let isEven = false;
    
    // Process card from right to left to calculate Luhn sum
    for (let i = card.length - 1; i >= 0; i--) {
      let digit = parseInt(card[i], 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isEven = !isEven;
    }

    // Calculate checksum that makes (sum + checksum) % 10 === 0
    const checksum = (10 - (sum % 10)) % 10;
    
    // Replace placeholder 0 with actual checksum
    return card.slice(0, -1) + checksum;
  }

  static password(length: number = 12, options?: { 
    uppercase?: boolean; 
    lowercase?: boolean; 
    numbers?: boolean; 
    symbols?: boolean;
  }): string {
    const uppercase = options?.uppercase !== false;
    const lowercase = options?.lowercase !== false;
    const numbers = options?.numbers !== false;
    const symbols = options?.symbols !== false;

    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  static ssn(): string {
    // Format: XXX-XX-XXXX (US Social Security Number, test format)
    const part1 = this.randomNumber(1, 899).toString().padStart(3, '0');
    const part2 = this.randomNumber(1, 99).toString().padStart(2, '0');
    const part3 = this.randomNumber(1, 9999).toString().padStart(4, '0');
    return `${part1}-${part2}-${part3}`;
  }

  // NEW GENERATORS - Personal & Business

  static username(length: number = 8): string {
    return this.randomArray(firstNames).toLowerCase() + this.randomNumber(100, 9999);
  }

  static companyName(): string {
    const suffixes = ['Inc', 'LLC', 'Corp', 'Ltd', 'Co', 'Solutions', 'Group', 'Tech'];
    return this.randomArray(firstNames) + ' ' + this.randomArray(suffixes);
  }

  // NEW GENERATORS - Visual

  static hexColor(): string {
    return '#' + this.randomNumber(0, 16777215).toString(16).padStart(6, '0').toUpperCase();
  }

  static rgbColor(): string {
    return `rgb(${this.randomNumber(0, 255)}, ${this.randomNumber(0, 255)}, ${this.randomNumber(0, 255)})`;
  }

  static hslColor(): string {
    return `hsl(${this.randomNumber(0, 360)}, ${this.randomNumber(0, 100)}%, ${this.randomNumber(0, 100)}%)`;
  }

  // VALIDATION HELPERS (Optional field validators)

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  }

  static isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

export default Imposter;
