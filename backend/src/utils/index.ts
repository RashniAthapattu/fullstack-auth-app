// This file contains all helper functions

import bcrypt, { genSaltSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';

/**
 * Utility function to hash plain password
 * @param {string} password -Plain password
 * @returns {string}
 */
export const generatePassword = async (password: string): Promise<string> => {
  const SALT = genSaltSync();
  return hashSync(password, SALT);
};

/**
 * Validates the saved password with the given password
 * @param {string} enteredPassword - Entered Password
 * @param {string} savedPassword -Saved Password
 * @returns {boolean}
 */
export const validatePassword = async (
  enteredPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(enteredPassword, savedPassword);
};

/**
 * Generates Access token
 * @param {object} payload
 * @returns {string}
 */
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, `${config.accessTokenKey}`, {
    expiresIn: config.accessTokenExpiration,
  });
};

/**
 * Generates Refresh token
 * @param {object} payload
 * @returns {string}
 */
export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, `${config.refreshTokenKey}`, {
    expiresIn: config.refreshTokenExpiration,
  });
};

/**
 * decode jwt util function
 */
export const decodeJwt = (token: string) => {
  return jwt.decode(token);
};
