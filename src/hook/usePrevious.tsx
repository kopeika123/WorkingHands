import { useRef, useEffect } from 'react';

export function usePrev<T>(value: T): T | null {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}
