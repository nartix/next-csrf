import { NextRequest, NextResponse } from 'next/server';
interface CookieOptions {
    name?: string;
    path?: string;
    domain?: string;
    maxAge?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
}
interface CsrfOptions {
    secret?: string;
    algorithm?: AlgorithmIdentifier;
    tokenByteLength?: number;
    separator?: string;
    headerName?: string;
    formFieldName?: string;
    cookie: CookieOptions;
    excludeMethods?: string[];
    enableHeaderCheckForJson?: boolean;
}
/**
 * Checks if the request method is one that typically modifies state.
 */
export declare const isWriteMethod: (method: string) => boolean;
/**
 * Determines if the request is a Next.js Server Action by looking for a `next-action` header.
 */
export declare const isServerAction: (req: NextRequest) => boolean;
/**
 * Extracts the CSRF token from multipart/form-data or x-www-form-urlencoded.
 * Handles both regular forms and server action forms (with possible field suffix).
 */
export declare const extractCsrfTokenFromForm: (req: NextRequest, formFieldName: string) => Promise<string | null>;
/**
 * Extracts the CSRF token from JSON or plain-text JSON (like server actions).
 * Priority is given to a header if present, otherwise we parse JSON from the body.
 * Also handles arrays vs objects for server actions.
 */
export declare const extractCsrfTokenFromJsonOrPlainText: (req: NextRequest, headerName: string, formFieldName: string, enableHeaderCheckForJson: boolean) => Promise<string | null>;
/**
 * Merges user-provided CSRF options with the defaults.
 */
export declare const mergeOptions: (options: Partial<CsrfOptions>, userOptions: Partial<CsrfOptions>) => CsrfOptions;
/**
 * Constructs a 403 response when CSRF validation fails.
 */
export declare const invalidCsrfResponse: (message?: string) => NextResponse;
/**
 * Retrieves the CSRF token from the request by delegating to the correct extractor based on content type.
 */
export declare const getTokenFromRequest: (req: NextRequest, options: CsrfOptions) => Promise<string | null>;
/**
 * Creates a CSRF middleware for Next.js.
 *
 * 1) Merges user options with defaults.
 * 2) Ensures we have a secret for generating tokens.
 * 3) If we have no CSRF cookie, generate one and set it on the response.
 * 4) Attempt to extract a CSRF token from the request.
 * 5) If present, validate it. If invalid, respond with 403. Otherwise, allow.
 */
declare const createNextCsrfMiddleware: (req: NextRequest, res: NextResponse, options: CsrfOptions) => Promise<NextResponse>;
export { createNextCsrfMiddleware };
//# sourceMappingURL=index.d.ts.map