// Core
import { useEffect } from 'react';

export const useChecklistResetter = (props) => {
    const {
        isParentFormChanged,
        resetForm,
        setDynamicFields
    } = props;

    useEffect(() => {
        if (isParentFormChanged) {
            resetForm();
            setDynamicFields([]);
        }
    }, [isParentFormChanged, resetForm, setDynamicFields]);
};
