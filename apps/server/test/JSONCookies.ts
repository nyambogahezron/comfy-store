import { describe, it, expect } from '@jest/globals';
import JSONCookies from '../src/middleware/CookieParser';

describe('JSONCookies', () => {
  it('should parse JSON-prefixed cookies', () => {
    const cookies: any = {
      key1: 'j:{"value":1}',
      key2: 'plainValue',
      key3: 'j:{"key":"value"}',
    };

    const result = JSONCookies(cookies);

    expect(result).toEqual({
      key1: { value: 1 },
      key2: 'plainValue',
      key3: { key: 'value' },
    });
  });

  it('should ignore invalid JSON cookies', () => {
    const cookies: any = {
      key1: 'j:invalid-json',
    };

    const result = JSONCookies(cookies);

    expect(result).toEqual({
      key1: 'j:invalid-json',
    });
  });
});
