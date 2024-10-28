const CHARS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "/",
] as const;

type B64 = typeof CHARS[number];

const B64IDX: Record<B64, number> = {
  "A": 0,
  "B": 1,
  "C": 2,
  "D": 3,
  "E": 4,
  "F": 5,
  "G": 6,
  "H": 7,
  "I": 8,
  "J": 9,
  "K": 10,
  "L": 11,
  "M": 12,
  "N": 13,
  "O": 14,
  "P": 15,
  "Q": 16,
  "R": 17,
  "S": 18,
  "T": 19,
  "U": 20,
  "V": 21,
  "W": 22,
  "X": 23,
  "Y": 24,
  "Z": 25,
  "a": 26,
  "b": 27,
  "c": 28,
  "d": 29,
  "e": 30,
  "f": 31,
  "g": 32,
  "h": 33,
  "i": 34,
  "j": 35,
  "k": 36,
  "l": 37,
  "m": 38,
  "n": 39,
  "o": 40,
  "p": 41,
  "q": 42,
  "r": 43,
  "s": 44,
  "t": 45,
  "u": 46,
  "v": 47,
  "w": 48,
  "x": 49,
  "y": 50,
  "z": 51,
  "0": 52,
  "1": 53,
  "2": 54,
  "3": 55,
  "4": 56,
  "5": 57,
  "6": 58,
  "7": 59,
  "8": 60,
  "9": 61,
  "+": 62,
  "/": 63,
} as const;

/**
 * Converts a base64 string to a base64url string.
 *
 * Example:
 * ```ts
 * base64ToBase64Url("foo++/==") // "foo--_"
 * ```
 */
export function base64ToBase64Url(strB64: string): string {
  return strB64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Converts a base64url string to a base64 string.
 *
 * Example:
 * ```ts
 * base64UrlToBase64("foo--_") // "foo++/=="
 * ```
 */
export function base64UrlToBase64(strB64Url: string): string {
  const base64 = strB64Url.replace(/-/g, "+").replace(/_/g, "/");
  const mod4 = strB64Url.length % 4;
  if (mod4 === 2) {
    return base64 + "==";
  }
  if (mod4 === 3) {
    return base64 + "=";
  }
  return base64;
}

/**
 * Converts a string to a base64 string.
 *
 * Example:
 * ```ts
 * stringToBase64("foo") // "Zm9v"
 * ```
 */
export function stringToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  return bytesToBase64(bytes);
}

/**
 * Converts a base64 string to a string.
 *
 * Example:
 * ```ts
 * base64ToString("Zm9v") // "foo"
 * ```
 */
export function base64ToString(strB64: string): string {
  const bytes = base64ToBytes(strB64);
  return new TextDecoder().decode(bytes);
}

/**
 * Converts a Uint8Array to a base64 string.
 *
 * Example:
 * ```ts
 * const bytes = new TextEncoder().encode("foo");
 * bytesToBase64(bytes) // "Zm9v"
 * ```
 */
export function bytesToBase64(input: Uint8Array): string {
  const inputLen = input.length;
  const inputRem = inputLen % 3;
  const padLen = inputRem > 0 ? 3 - inputRem : 0;
  const outLen = (inputLen + padLen) * 4 / 3;

  const outs: string[] = new Array<string>(outLen);

  let j = 0; // Output index
  const toByte = inputLen - inputRem;
  for (let i = 2; i < toByte; i += 3) {
    const word24 = (input[i - 2] << 16) | (input[i - 1] << 8) | input[i];
    outs[j++] = CHARS[(word24 >> 18) & 0x3f];
    outs[j++] = CHARS[(word24 >> 12) & 0x3f];
    outs[j++] = CHARS[(word24 >> 6) & 0x3f];
    outs[j++] = CHARS[word24 & 0x3f];
  }

  if (padLen === 2) {
    const word24 = input[toByte] << 16;
    outs[j++] = CHARS[(word24 >> 18) & 0x3f];
    outs[j++] = CHARS[(word24 >> 12) & 0x3f];
    outs[j++] = "=";
    outs[j++] = "=";
  } else if (padLen === 1) {
    const word24 = (input[toByte] << 16) | (input[toByte + 1] << 8);
    outs[j++] = CHARS[(word24 >> 18) & 0x3f];
    outs[j++] = CHARS[(word24 >> 12) & 0x3f];
    outs[j++] = CHARS[(word24 >> 6) & 0x3f];
    outs[j++] = "=";
  }

  return outs.join("");
}

/**
 * Converts a base64 string to a Uint8Array.
 *
 * Example:
 * ```ts
 * base64ToBytes("Zm9v") // Uint8Array [ 102, 111, 111 ] => foo
 * ```
 */
export function base64ToBytes(strB64: string): Uint8Array {
  const b64chars: B64[] = strB64.split("") as B64[];
  const padLen = strB64.endsWith("==") ? 2 : strB64.endsWith("=") ? 1 : 0;
  const strLen = strB64.length;
  const outLen = (strLen * 3 / 4) - padLen;

  const outs = new Uint8Array(outLen);

  const toChar = strLen - (padLen > 0 ? 4 : 0);
  let j = 0; // Output index
  for (let i = 3; i < toChar; i += 4) {
    const word24 = (B64IDX[b64chars[i - 3]] << 18) |
      (B64IDX[b64chars[i - 2]] << 12) |
      (B64IDX[b64chars[i - 1]] << 6) |
      B64IDX[b64chars[i]];

    outs[j++] = (word24 >> 16) & 0xff;
    outs[j++] = (word24 >> 8) & 0xff;
    outs[j++] = word24 & 0xff;
  }

  if (padLen === 2) {
    const word24 = (B64IDX[b64chars[toChar]] << 18) |
      (B64IDX[b64chars[toChar + 1]] << 12);

    outs[j++] = (word24 >> 16) & 0xff;
  } else if (padLen === 1) {
    const word24 = (B64IDX[b64chars[toChar]] << 18) |
      (B64IDX[b64chars[toChar + 1]] << 12) |
      (B64IDX[b64chars[toChar + 2]] << 6);

    outs[j++] = (word24 >> 16) & 0xff;
    outs[j++] = (word24 >> 8) & 0xff;
  }

  return outs;
}
