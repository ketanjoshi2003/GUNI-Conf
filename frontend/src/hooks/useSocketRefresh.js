import { useEffect, useRef } from 'react';
import socket from '../socket';

export const useSocketRefresh = (onRefresh) => {
    const callbackRef = useRef(onRefresh);

    // Update the ref whenever onRefresh changes
    useEffect(() => {
        callbackRef.current = onRefresh;
    }, [onRefresh]);

    useEffect(() => {
        const handler = () => {
            console.log('Socket event "contentUpdated" received');
            if (callbackRef.current) {
                callbackRef.current();
            }
        };

        socket.on('contentUpdated', handler);

        return () => {
            socket.off('contentUpdated', handler);
        };
    }, []); // Subscribe only once per component mount
};
