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

    const setStoredValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function so we have the same API as useState
            const valueToStore = value instanceof Function ? value(value) : value;
            setValue(valueToStore);

            // Save to localStorage only on client side
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [value, setStoredValue] as const;
} 