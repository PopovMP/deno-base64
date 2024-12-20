import { test } from "node:test";
import { strictEqual } from "node:assert";

import {
  base64ToBase64Url,
  base64ToString,
  base64UrlToBase64,
  stringToBase64,
} from "./base64.ts";

const testSetBase64Url = [
  ["", ""],
  ["ß", "w58"],
  ["f", "Zg"],
  ["fo", "Zm8"],
  ["foo", "Zm9v"],
  ["foob", "Zm9vYg"],
  ["fooba", "Zm9vYmE"],
  ["foobar", "Zm9vYmFy"],
  [">?>d?ß", "Pj8-ZD_Dnw"],
];

const testSetBase64 = [
  ["", ""],
  ["ß", "w58="],
  ["f", "Zg=="],
  ["fo", "Zm8="],
  ["foo", "Zm9v"],
  ["foob", "Zm9vYg=="],
  ["fooba", "Zm9vYmE="],
  ["foobar", "Zm9vYmFy"],
] as const;

test("stringToBase64() encodes string to base64", () => {
  for (const [input, expected] of testSetBase64) {
    const actual = stringToBase64(input);
    strictEqual(
      actual,
      expected,
      `Failed to encode "${input}" to "${expected}". Got: "${actual}"`,
    );
  }
});

test("base64ToString() decodes base64 to string", () => {
  for (const [expected, input] of testSetBase64) {
    const actual = base64ToString(input);
    strictEqual(
      actual,
      expected,
      `Failed to decode "${input}" to "${expected}". Got: "${actual}"`,
    );
  }
});

test("base64ToBase64Url() encodes string to base64Url", () => {
  for (const [input, expected] of testSetBase64Url) {
    const base64 = stringToBase64(input);
    const actual = base64ToBase64Url(base64);
    strictEqual(
      actual,
      expected,
      `Failed to encode "${input}" to "${expected}". Got: "${actual}"`,
    );
  }
});

test("base64UrlToBase64() encodes to base64Url string", () => {
  for (const [expected, input] of testSetBase64Url) {
    const base64 = base64UrlToBase64(input);
    const actual = base64ToString(base64);
    strictEqual(
      actual,
      expected,
      `Failed to decode "${input}" to "${expected}". Got: "${actual}"`,
    );
  }
});
