import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * @description Combines class names and Tailwind classes
 *
 * @param classes The classes to combine
 * @returns The combined classes
 *
 * @example
 * cn('text-center', 'text-blue-500') // 'text-center text-blue-500'
 */
export const cn = (...classes: ClassValue[]): string => twMerge(clsx(classes))
