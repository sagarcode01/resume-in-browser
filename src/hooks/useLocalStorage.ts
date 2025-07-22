import { useState, useEffect } from 'react';
import { ResumeData, TemplateType } from '@/types/resume';

export function useLocalStorage<T>(key: string, defaultValue: T) {
    // Always start with defaultValue to ensure server/client consistency
    const [value, setValue] = useState<T>(defaultValue);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage only on client after hydration
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                const parsedItem = JSON.parse(item);

                // Migration: Add template field if it doesn't exist (for backward compatibility)
                if (key === 'resumeData' && parsedItem && !parsedItem.template) {
                    parsedItem.template = 'harvard' as TemplateType;
                }

                setValue(parsedItem);
            }
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
        } finally {
            setIsHydrated(true);
        }
    }, [key]);

    const setStoredValue = (val: T | ((prev: T) => T)) => {
        setValue((prev) => {
            const valueToStore = typeof val === 'function' ? (val as (prev: T) => T)(prev) : val;

            // Only save to localStorage on client side after hydration
            if (isHydrated) {
                try {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                } catch (error) {
                    console.error(`Error setting localStorage key "${key}":`, error);
                }
            }

            return valueToStore;
        });
    };

    return [value, setStoredValue] as const;
} 