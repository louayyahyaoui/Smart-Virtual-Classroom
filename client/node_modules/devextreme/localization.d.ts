/**
* DevExtreme (localization.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    format
} from './ui/widget/ui.widget';

/**
 * Converts a Date object to a string using the specified format.
 */
export function formatDate(value: Date, format: format): string;

/**
 * Substitutes the provided value(s) for placeholders in a message that the key specifies.
 */
export function formatMessage(key: string, value: string | Array<string>): string;

/**
 * Converts a numeric value to a string using the specified format.
 */
export function formatNumber(value: number, format: format): string;

/**
 * Loads localized messages.
 */
export function loadMessages(messages: any): void;

/**
 * Gets the current locale identifier.
 */
export function locale(): string;

/**
 * Sets the current locale identifier.
 */
export function locale(locale: string): void;

/**
 * Parses a string into a Date object.
 */
export function parseDate(text: string, format: format): Date;

/**
 * Parses a string into a numeric value.
 */
export function parseNumber(text: string, format: format): number;


