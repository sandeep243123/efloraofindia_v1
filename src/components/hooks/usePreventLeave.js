import { useEffect } from 'react';

function usePreventLeave() {
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            const message = 'You have unsaved changes. Are you sure you want to leave?';
            e.returnValue = message; // Required for the prompt to show
            return message;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
}

export default usePreventLeave;
