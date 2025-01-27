import { Request, Response, NextFunction } from 'express';
import * as cookie from 'cookie';
import * as signature from 'cookie-signature';

/**
 * Parse Cookie header and populate `req.cookies`
 * with an object keyed by the cookie names.
 *
 * @param {string|array} [secret] A string (or array of strings) representing cookie signing secret(s).
 * @param {Object} [options]
 * @return {Function}
 * @public
 */

type cookieParserParams = {
  secret?: string | string[];
  options?: Object;
};

export default function cookieParser({ secret, options }: cookieParserParams) {
  const secrets = !secret || Array.isArray(secret) ? secret || [] : [secret];

  return function cookieParser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // If cookies are already parsed, skip parsing
    if (req.cookies) {
      return next();
    }

    // Get the cookies from the request headers
    const cookies = req.headers.cookie;

    // Initialize cookies and signedCookies objects
    req.secret = secrets[0];
    req.cookies = Object.create(null);
    req.signedCookies = Object.create(null);

    // If no cookies are present, move to the next middleware
    if (!cookies) {
      return next();
    }

    // Ensure the cookie.parse function is available
    if (typeof cookie.parse !== 'function') {
      return next(new Error('cookie.parse is not a function'));
    }

    // Parse the cookies and handle any errors
    try {
      req.cookies = cookie.parse(cookies, options);
    } catch (err) {
      return next(err);
    }

    // If secrets are provided, parse signed cookies
    if (secrets.length !== 0) {
      req.signedCookies = signedCookies(req.cookies, secrets);
      req.signedCookies = JSONCookies(req.signedCookies);
    }

    req.cookies = JSONCookies(req.cookies);

    next();
  };
}

/**
 * Parse JSON cookies.
 *
 * @param {Object} obj
 * @return {Object}
 * @public
 */

interface CookieObject {
  [key: string]: string;
}

function JSONCookies(obj: CookieObject): CookieObject {
  var cookies = Object.keys(obj);
  var key: string;
  var val: string | undefined;

  // Iterate over each cookie and parse JSON if applicable
  for (var i = 0; i < cookies.length; i++) {
    key = cookies[i];
    val = JSONCookie(obj[key]);

    if (val) {
      obj[key] = val;
    }
  }

  return obj;
}

function JSONCookie(str: string): string | undefined {
  // Check if the cookie is a JSON cookie
  if (typeof str !== 'string' || str.substr(0, 2) !== 'j:') {
    return undefined;
  }

  // Parse the JSON cookie
  try {
    return JSON.parse(str.slice(2));
  } catch (err) {
    return undefined;
  }
}

/**
 * Parse a signed cookie string, return the decoded value.
 *
 * @param {String} str signed cookie string
 * @param {string|array} secret
 * @return {String} decoded value
 * @public
 */

interface SignedCookieFunction {
  (str: string, secret: string | string[]): string | false | undefined;
}

const signedCookie: SignedCookieFunction = function (str, secret) {
  if (typeof str !== 'string') {
    return undefined;
  }

  // Check if the cookie is a signed cookie
  if (str.substr(0, 2) !== 's:') {
    return str;
  }

  const secrets = !secret || Array.isArray(secret) ? secret || [] : [secret];

  // Try to unsign the cookie with each secret
  for (let i = 0; i < secrets.length; i++) {
    const val = signature.unsign(str.slice(2), secrets[i]);

    if (val !== false) {
      return val;
    }
  }

  return false;
};

/**
 * Parse signed cookies, returning an object containing the decoded key/value
 * pairs, while removing the signed key from obj.
 *
 * @param {Object} obj
 * @param {string|array} secret
 * @return {Object}
 * @public
 */

interface SignedCookiesFunction {
  (obj: CookieObject, secret: string | string[]): CookieObject;
}

const signedCookies: SignedCookiesFunction = function (obj, secret) {
  var cookies = Object.keys(obj);
  var dec: string | false | undefined;
  var key: string;
  var ret: CookieObject = Object.create(null);
  var val: string;

  // Iterate over each cookie and parse signed cookies
  for (var i = 0; i < cookies.length; i++) {
    key = cookies[i];
    val = obj[key];
    dec = signedCookie(val, secret);

    if (val !== dec) {
      ret[key] = dec as string;
      delete obj[key];
    }
  }

  return ret;
};
