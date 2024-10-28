/**
 * # Base64 encoder / decoder
 *
 * ### Encode a Uint8Array array to base64 string
 *
 * `function bytesToBase64(input: Uint8Array): string`
 *
 * ```typescript
 * import {bytesToBase64} from "@popov/base64";
 * const input: string = "foo";
 * const bytes: Uint8Array = new TextEncoder().encode(input);
 * const base64: string = bytesToBase64(bytes) //=> "Zm9v"
 * ```
 *
 * ### Decode a base64 string to Uint8Array array
 *
 * `function base64ToBytes(input: string): Uint8Array`
 *
 * ```typescript
 * import {base64ToBytes} from "@popov/base64";
 * const input: string = "Zm9v";
 * const bytes: Uint8Array = base64ToBytes(input);
 * ```
 *
 * ### Converts a string to a base64 string
 *
 * `function stringToBase64(str: string): string`
 *
 * ```typescript
 * const base64: string = stringToBase64("foo") //=> "Zm9v"
 * ```
 *
 * ### Converts a base64 string to a string.
 *
 * `function base64ToString(strB64: string): string`
 *
 * ```typescript
 * const text: string = base64ToString("Zm9v") //=> "foo"
 * ```
 *
 * ### Converts a base64 string to a base64url string
 *
 * `function base64ToBase64Url(strB64: string): string`
 *
 * ```typescript
 * const text: string = base64ToBase64Url("foo++/==") //=> "foo--_"
 * ```
 *
 * ### Converts a base64url string to a base64 string
 *
 * `function base64UrlToBase64(strB64Url: string): string`
 *
 * ```typescript
 * const text: string = base64UrlToBase64("foo--_") //=> "foo++/=="
 * ```
 * 
 * @module base64
 */

export * from "./base64.ts";
