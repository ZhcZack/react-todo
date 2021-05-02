import { useState } from 'react';

interface UseLastModifiedLastNameCallbacks {
    setName(name: string): void;
}

export function useLastModifiedLastName(initialValue: string): [string, UseLastModifiedLastNameCallbacks] {
    const [value, setValue] = useState(initialValue);

    function setName(name: string) {
        setValue(name);
    }

    return [value, { setName }];
}