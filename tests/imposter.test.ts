import Imposter from '../src/index';

describe('Imposter - Personal Information', () => {
  
  describe('name()', () => {
    it('should return a string with three parts separated by spaces', () => {
      const name = Imposter.name();
      expect(name).toBeDefined();
      expect(typeof name).toBe('string');
      const parts = name.split(' ');
      expect(parts.length).toBe(3);
    });

    it('should return different names on multiple calls', () => {
      const names = new Set([Imposter.name(), Imposter.name(), Imposter.name()]);
      expect(names.size).toBeGreaterThan(1);
    });
  });

  describe('email()', () => {
    it('should return a valid email format', () => {
      const email = Imposter.email();
      expect(email).toMatch(/^[a-z]+\.[a-z]+@(gmail|yahoo|hotmail)\.com$/i);
    });

    it('should contain @ symbol and domain', () => {
      const email = Imposter.email();
      expect(email).toContain('@');
      expect(email).toContain('.');
    });
  });

  describe('phone()', () => {
    it('should return a valid phone format', () => {
      const phone = Imposter.phone();
      expect(phone).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/);
    });

    it('should have correct length', () => {
      const phone = Imposter.phone();
      expect(phone.length).toBe(14); // (XXX) XXX-XXXX
    });
  });
});

describe('Imposter - Location/Address', () => {
  
  describe('address()', () => {
    it('should return a non-empty string', () => {
      const address = Imposter.address();
      expect(address).toBeDefined();
      expect(typeof address).toBe('string');
      expect(address.length).toBeGreaterThan(0);
    });
  });

  describe('city()', () => {
    it('should return a city name', () => {
      const city = Imposter.city();
      expect(city).toBeDefined();
      expect(typeof city).toBe('string');
      expect(city.length).toBeGreaterThan(0);
    });
  });

  describe('state()', () => {
    it('should return a 2-letter state code', () => {
      const state = Imposter.state();
      expect(state).toMatch(/^[A-Z]{2}$/);
    });
  });

  describe('postalCode()', () => {
    it('should return a 5-digit postal code', () => {
      const code = Imposter.postalCode();
      expect(code).toMatch(/^\d{5}$/);
    });
  });

  describe('coordinates()', () => {
    it('should return object with latitude and longitude', () => {
      const coords = Imposter.coordinates();
      expect(coords).toHaveProperty('latitude');
      expect(coords).toHaveProperty('longitude');
    });

    it('should have valid numeric coordinates', () => {
      const coords = Imposter.coordinates();
      expect(typeof coords.latitude).toBe('number');
      expect(typeof coords.longitude).toBe('number');
      expect(coords.latitude).toBeGreaterThanOrEqual(-90);
      expect(coords.latitude).toBeLessThanOrEqual(90);
      expect(coords.longitude).toBeGreaterThanOrEqual(-180);
      expect(coords.longitude).toBeLessThanOrEqual(180);
    });

    it('should return matching lat/lng pair (not mixed)', () => {
      // Test multiple times to ensure consistency
      for (let i = 0; i < 5; i++) {
        const coords = Imposter.coordinates();
        const lat = coords.latitude;
        const lng = coords.longitude;
        // Lat should be US-range (25-50), lng should be US-range (-67 to -125)
        expect(lat).toBeGreaterThan(24);
        expect(lat).toBeLessThan(50);
        expect(lng).toBeLessThan(-66);
        expect(lng).toBeGreaterThan(-126);
      }
    });
  });

  describe('latitude()', () => {
    it('should return a number', () => {
      const lat = Imposter.latitude();
      expect(typeof lat).toBe('number');
    });
  });

  describe('longitude()', () => {
    it('should return a number', () => {
      const lng = Imposter.longitude();
      expect(typeof lng).toBe('number');
    });
  });
});

describe('Imposter - Content', () => {
  
  describe('loremIpsum()', () => {
    it('should return lorem ipsum text', () => {
      const text = Imposter.loremIpsum();
      expect(text).toBeDefined();
      expect(typeof text).toBe('string');
      expect(text.length).toBeGreaterThan(0);
    });

    it('should respect count parameter', () => {
      const text50 = Imposter.loremIpsum(50);
      const text100 = Imposter.loremIpsum(100);
      expect(text50.length).toBeLessThanOrEqual(50);
      expect(text100.length).toBeLessThanOrEqual(100);
    });
  });
});

describe('Imposter - Identifiers & Network', () => {
  
  describe('uuid()', () => {
    it('should return a valid UUID v4 format', () => {
      const id = Imposter.uuid();
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it('should return different UUIDs', () => {
      const uuids = new Set([Imposter.uuid(), Imposter.uuid(), Imposter.uuid()]);
      expect(uuids.size).toBe(3);
    });
  });

  describe('ip()', () => {
    it('should return a valid IPv4 address', () => {
      const ip = Imposter.ip();
      expect(ip).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
    });

    it('should have octets within valid range (0-255)', () => {
      const ip = Imposter.ip();
      const octets = ip.split('.').map(Number);
      octets.forEach(octet => {
        expect(octet).toBeGreaterThanOrEqual(0);
        expect(octet).toBeLessThanOrEqual(255);
      });
    });
  });

  describe('macAddress()', () => {
    it('should return a valid MAC address format', () => {
      const mac = Imposter.macAddress();
      expect(mac).toMatch(/^([0-9A-F]{2}:){5}([0-9A-F]{2})$/);
    });

    it('should have correct number of segments', () => {
      const mac = Imposter.macAddress();
      const segments = mac.split(':');
      expect(segments.length).toBe(6);
    });

    it('should output uppercase hex pairs', () => {
      const mac = Imposter.macAddress();
      expect(mac).toMatch(/^[0-9A-F:]+$/);
    });
  });

  describe('url()', () => {
    it('should return a valid HTTPS URL', () => {
      const url = Imposter.url();
      expect(url).toMatch(/^https:\/\/[a-z]+\.[a-z]+\.(com|net|org)$/i);
    });
  });
});

describe('Imposter - Utilities', () => {
  
  describe('randomString()', () => {
    it('should return alphanumeric string', () => {
      const str = Imposter.randomString();
      expect(str).toMatch(/^[a-zA-Z0-9]+$/);
    });

    it('should respect length parameter', () => {
      expect(Imposter.randomString(5).length).toBe(5);
      expect(Imposter.randomString(20).length).toBe(20);
    });
  });

  describe('randomNumber()', () => {
    it('should return number within range', () => {
      const num = Imposter.randomNumber(1, 100);
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(100);
    });

    it('should include boundary values', () => {
      const nums = new Set();
      for (let i = 0; i < 1000; i++) {
        nums.add(Imposter.randomNumber(1, 2));
      }
      expect(nums.has(1)).toBe(true);
      expect(nums.has(2)).toBe(true);
    });
  });

  describe('randomBoolean()', () => {
    it('should return boolean', () => {
      const bool = Imposter.randomBoolean();
      expect(typeof bool).toBe('boolean');
    });

    it('should return both true and false', () => {
      const bools = new Set();
      for (let i = 0; i < 1000; i++) {
        bools.add(Imposter.randomBoolean());
      }
      expect(bools.size).toBe(2);
    });
  });
});

describe('Imposter - New Generators (Date/Time)', () => {
  
  describe('date()', () => {
    it('should return ISO date format', () => {
      const date = Imposter.date();
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should respect minYearsAgo/maxYearsAgo options', () => {
      const date = Imposter.date({ minYearsAgo: 1, maxYearsAgo: 1 });
      const year = parseInt(date.split('-')[0]);
      const currentYear = new Date().getFullYear();
      expect(year).toBe(currentYear - 1);
    });

    it('should be a valid date', () => {
      const date = Imposter.date();
      const parsed = new Date(date);
      expect(parsed instanceof Date && !isNaN(parsed.getTime())).toBe(true);
    });
  });

  describe('birthDate()', () => {
    it('should be 18-80 years ago', () => {
      const birthDate = Imposter.birthDate();
      const date = new Date(birthDate);
      const age = new Date().getFullYear() - date.getFullYear();
      expect(age).toBeGreaterThanOrEqual(18);
      expect(age).toBeLessThanOrEqual(80);
    });
  });

  describe('timestamp()', () => {
    it('should return current unix timestamp', () => {
      const ts = Imposter.timestamp();
      const now = Math.floor(Date.now() / 1000);
      expect(ts).toBeCloseTo(now, -1); // Within 10 seconds
    });
  });
});

describe('Imposter - New Generators (Security)', () => {
  
  describe('creditCard()', () => {
    it('should return 16-digit Visa by default', () => {
      const card = Imposter.creditCard('visa');
      expect(card).toMatch(/^\d{16}$/);
      expect(card.startsWith('4')).toBe(true);
    });

    it('should return 16-digit Mastercard', () => {
      const card = Imposter.creditCard('mastercard');
      expect(card).toMatch(/^\d{16}$/);
      expect(['51', '52', '53', '54', '55'].some(p => card.startsWith(p))).toBe(true);
    });

    it('should return 15-digit Amex', () => {
      const card = Imposter.creditCard('amex');
      expect(card).toMatch(/^\d{15}$/);
      expect(card.startsWith('34') || card.startsWith('37')).toBe(true);
    });

    it('should pass Luhn checksum', () => {
      const card = Imposter.creditCard();
      let sum = 0;
      let isEven = false;
      for (let i = card.length - 1; i >= 0; i--) {
        let digit = parseInt(card[i], 10);
        if (isEven) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
      }
      expect(sum % 10).toBe(0);
    });
  });

  describe('password()', () => {
    it('should return string of specified length', () => {
      expect(Imposter.password(8).length).toBe(8);
      expect(Imposter.password(20).length).toBe(20);
    });

    it('should default to mixed characters', () => {
      const pwd = Imposter.password();
      expect(pwd.length).toBe(12);
    });

    it('should respect character type options', () => {
      const pwd = Imposter.password(20, { 
        uppercase: true, 
        lowercase: false, 
        numbers: false, 
        symbols: false 
      });
      expect(pwd).toMatch(/^[A-Z]+$/);
    });
  });

  describe('ssn()', () => {
    it('should return valid SSN format', () => {
      const ssn = Imposter.ssn();
      expect(ssn).toMatch(/^\d{3}-\d{2}-\d{4}$/);
    });

    it('should have valid parts', () => {
      const ssn = Imposter.ssn();
      const [part1, part2, part3] = ssn.split('-');
      expect(parseInt(part1)).toBeGreaterThan(0);
      expect(part2.length).toBe(2);
      expect(part3.length).toBe(4);
    });
  });
});

describe('Imposter - New Generators (Personal)', () => {
  
  describe('username()', () => {
    it('should return lowercase username with numbers', () => {
      const username = Imposter.username();
      expect(username).toMatch(/^[a-z]+\d+$/i);
    });
  });

  describe('companyName()', () => {
    it('should return company name with suffix', () => {
      const company = Imposter.companyName();
      const suffixes = ['Inc', 'LLC', 'Corp', 'Ltd', 'Co', 'Solutions', 'Group', 'Tech'];
      const hasSuffix = suffixes.some(s => company.includes(s));
      expect(hasSuffix).toBe(true);
    });
  });
});

describe('Imposter - New Generators (Colors)', () => {
  
  describe('hexColor()', () => {
    it('should return valid hex color', () => {
      const color = Imposter.hexColor();
      expect(color).toMatch(/^#[0-9A-F]{6}$/);
    });
  });

  describe('rgbColor()', () => {
    it('should return valid RGB color', () => {
      const color = Imposter.rgbColor();
      expect(color).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
    });
  });

  describe('hslColor()', () => {
    it('should return valid HSL color', () => {
      const color = Imposter.hslColor();
      expect(color).toMatch(/^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$/);
    });
  });
});

describe('Imposter - Validation Helpers', () => {
  
  describe('isValidEmail()', () => {
    it('should validate email format', () => {
      expect(Imposter.isValidEmail('test@example.com')).toBe(true);
      expect(Imposter.isValidEmail('invalid.email')).toBe(false);
      expect(Imposter.isValidEmail('user@domain')).toBe(false);
    });
  });

  describe('isValidPhone()', () => {
    it('should validate phone format', () => {
      expect(Imposter.isValidPhone('(555) 123-4567')).toBe(true);
      expect(Imposter.isValidPhone('555-123-4567')).toBe(false);
      expect(Imposter.isValidPhone('invalid')).toBe(false);
    });
  });

  describe('isValidURL()', () => {
    it('should validate URL format', () => {
      expect(Imposter.isValidURL('https://example.com')).toBe(true);
      expect(Imposter.isValidURL('http://test.org')).toBe(true);
      expect(Imposter.isValidURL('not a url')).toBe(false);
    });
  });
});
