import {useEffect, useState} from "react";
import Geolocation, {GeolocationError, GeolocationResponse} from "@react-native-community/geolocation";
import {Alert} from "react-native";

export const useGeolocation = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number; accuracy: number } | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    useEffect(() => {
        const getLocation = () => {
            Geolocation.getCurrentPosition(
                (position: GeolocationResponse) => {
                    setLocation(position.coords);
                    setLocationError(null);
                },
                (error: GeolocationError) => {
                    const errorMessage = `Geolocation error: ${error.message}`;
                    setLocationError(errorMessage);
                    // Опционально: показать Alert для пользователя
                    Alert.alert('Ошибка геолокации', errorMessage);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        };

        getLocation();
    }, []);

    return { location, locationError };
};