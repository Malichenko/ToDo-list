// Core
import { useEffect } from 'react';

export const useChecklistFocusInit = (dynamicFields) => {
    useEffect(() => {
        const lastDynamicField = dynamicFields[dynamicFields.length - 1];
        lastDynamicField && lastDynamicField.ref && lastDynamicField.ref.current.focus();
    }, [dynamicFields]);
};
