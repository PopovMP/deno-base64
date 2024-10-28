import {
  base64ToBase64Url,
  base64ToString,
  base64UrlToBase64,
  stringToBase64,
} from "./base64.ts";

const testsetBase64Url = [
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

const testsetBase64 = [
  ["", ""],
  ["ß", "w58="],
  ["f", "Zg=="],
  ["fo", "Zm8="],
  ["foo", "Zm9v"],
  ["foob", "Zm9vYg=="],
  ["fooba", "Zm9vYmE="],
  ["foobar", "Zm9vYmFy"],
] as const;

function assertEquals(actual: string, expected: string, msg?: string): void {
  if (actual !== expected) {
    throw new Error(msg || `Expected "${expected}", got "${actual}"`);
  }
}

Deno.test("stringToBase64() encodes string to base64", () => {
  for (const [input, expected] of testsetBase64) {
    const actual = stringToBase64(input);
    assertEquals(
      actual,
      expected,
      `Failed to encode "${input}" to "${expected}". Got: "${actual}"`,
    );
  }
});

Deno.test("base64ToString() decodes base64 to string", () => {
  for (const [expected, input] of testsetBase64) {
    const actual = base64ToString(input);
    assertEquals(
      actual,
      expected,
      `Failed to decode "${input}" to "${expected}". Got: "${actual}"`,
    );
  }
});

Deno.test("base64ToBase64Url() encodes string to base64Url", () => {
  for (const [input, expected] of testsetBase64Url) {
    const base64 = stringToBase64(input);
    const actual = base64ToBase64Url(base64);
    assertEquals(
      actual,
      expected,
      `Failed to encode "${input}" to "${expected}". Got: "${actual}"`,
    );
  }
});

Deno.test("base64UrlToBase64() encodes to base64Url string", () => {
  for (const [expected, input] of testsetBase64Url) {
    const base64 = base64UrlToBase64(input);
    const actual = base64ToString(base64);
    assertEquals(
      actual,
      expected,
      `Failed to decode "${input}" to "${expected}". Got: "${actual}"`,
    );
  }
});
