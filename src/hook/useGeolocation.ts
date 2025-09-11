import { useEffect, useRef, useState } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import Geolocation, {
    GeoError,
    GeoPosition,
} from 'react-native-geolocation-service';
import {
    check,
    request,
    openSettings,
    PERMISSIONS,
    RESULTS,
} from 'react-native-permissions';

type Location = {
    latitude: number;
    longitude: number;
    accuracy: number;
};

export const useGeolocation = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const watchId = useRef<number | null>(null);

    // Запрос разрешения на Android через PermissionsAndroid
    const requestAndroidPermission = async (): Promise<boolean> => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Разрешение на геолокацию',
                    message: 'Приложению нужен доступ к вашему местоположению',
                    buttonNeutral: 'Спросить позже',
                    buttonNegative: 'Отмена',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn('Ошибка запроса разрешения Android:', err);
            return false;
        }
    };

    const getPermission = async (): Promise<boolean> => {
        try {
            const permission =
                Platform.OS === 'ios'
                    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

            let result = await check(permission);

            if (result === RESULTS.DENIED) {
                result = await request(permission);
            }

            if (result === RESULTS.GRANTED) {
                // На Android дополнительно делаем запрос через PermissionsAndroid
                if (Platform.OS === 'android') {
                    const androidGranted = await requestAndroidPermission();
                    if (!androidGranted) {
                        Alert.alert(
                            'Нет доступа к геолокации',
                            'Пожалуйста, разрешите доступ к местоположению в настройках'
                        );
                        return false;
                    }
                }
                return true;
            }

            if (result === RESULTS.BLOCKED) {
                Alert.alert(
                    'Геолокация заблокирована',
                    'Откройте настройки и включите доступ к геопозиции.',
                    [
                        { text: 'Отмена', style: 'cancel' },
                        {
                            text: 'Открыть настройки',
                            onPress: () => openSettings(),
                        },
                    ]
                );
            }

            return false;
        } catch (error) {
            console.warn('Ошибка при проверке разрешений:', error);
            return false;
        }
    };

    useEffect(() => {
        let isMounted = true;

        const startWatching = async () => {
            const hasPermission = await getPermission();
            if (!hasPermission) {
                if (isMounted) setLocationError('Нет доступа к геолокации');
                return;
            }

            watchId.current = Geolocation.watchPosition(
                (position: GeoPosition) => {
                    if (!isMounted) return;
                    const { latitude, longitude, accuracy } = position.coords;
                    setLocation({ latitude, longitude, accuracy });
                    setLocationError(null);
                },
                (error: GeoError) => {
                    if (!isMounted) return;
                    const errorMessage = `Ошибка геолокации: ${error.message}`;
                    setLocationError(errorMessage);
                    console.warn(errorMessage);
                },
                {
                    enableHighAccuracy: true,
                    distanceFilter: 1,
                    forceRequestLocation: true,
                    showLocationDialog: true,
                }
            );
        };

        startWatching();

        return () => {
            isMounted = false;
            if (watchId.current !== null) {
                Geolocation.clearWatch(watchId.current);
                watchId.current = null;
            }
        };
    }, []);

    return { location, locationError };
};
