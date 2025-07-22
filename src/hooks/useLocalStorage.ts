import { useState, useEffect } from 'react';
import { ResumeData, TemplateType } from '@/types/resume';

export function useLocalStorage<T>(key: string, defaultValue: T) {
    const [value, setValue] = useState<T>(() => {
        // Only access localStorage on client side
        if (typeof window === 'undefined') {
            return defaultValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                const parsedItem = JSON.parse(item);

                // Migration: Add template field if it doesn't exist (for backward compatibility)
                if (key === 'resumeData' && parsedItem && !parsedItem.template) {
                    parsedItem.template = 'harvard' as TemplateType;
                }

                return parsedItem;
            }
            return defaultValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return defaultValue;
        }
    });

    const setStoredValue = (val: T | ((prev: T) => T)) => {
        setValue((prev) => {
            const valueToStore = typeof val === 'function' ? (val as (prev: T) => T)(prev) : val;
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
            return valueToStore;
        });
    };

    return [value, setStoredValue] as const;
} 