// Standard API Response Helpers
// Consistent JSON response format across all endpoints

import { NextResponse } from 'next/server';

/**
 * Return a success response
 * @param {any} data - Response payload
 * @param {number} status - HTTP status code (default 200)
 */
export function success(data, status = 200) {
    return NextResponse.json({ success: true, data }, { status });
}

/**
 * Return an error response
 * @param {string} message - Error description
 * @param {number} status - HTTP status code (default 400)
 */
export function error(message, status = 400) {
    return NextResponse.json({ success: false, error: message }, { status });
}

/**
 * Return a paginated success response
 * @param {any[]} data - Array of items
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {number} total - Total item count
 */
export function paginated(data, page, limit, total) {
    return NextResponse.json({
        success: true,
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasMore: page * limit < total,
        },
    });
}
