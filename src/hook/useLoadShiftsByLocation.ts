import { useEffect } from 'react';
import { usePrev } from './usePrevious';
import WorkStore from '../store/workStore';

interface Location {
    latitude: number;
    longitude: number;
}

const isLocationChanged = (
    prev: Location | null,
    curr: Location,
    threshold = 0.0001
): boolean => {
    if (!prev) return true;
    const latDiff = Math.abs(prev.latitude - curr.latitude);
    const lngDiff = Math.abs(prev.longitude - curr.longitude);
    return latDiff > threshold || lngDiff > threshold;
};

export const useLoadShiftsByLocation = (location: Location | null) => {
    const prevLocation = usePrev(location);

    useEffect(() => {
        async function loadData() {
            if (location && isLocationChanged(prevLocation, location)) {
                try {
                    await WorkStore.loadShifts(location);
                } catch (error) {
                    console.error('Ошибка при загрузке данных:', error);
                }
            }
        }

        loadData();
    }, [location]);
};
