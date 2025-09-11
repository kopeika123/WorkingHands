import {Alert} from "react-native";
import {baseUrl, HEADERS} from "../constants";


export class Service {
    static async loadData(params?: { latitude: number; longitude: number } | null): Promise<any> {
        try {
            const queryParams = new URLSearchParams();
            if (params) {
                queryParams.append('latitude', params.latitude.toString());
                queryParams.append('longitude', params.longitude.toString());
            }
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: HEADERS,
            });

            if (!response.ok) {
                const errorMessage = `HTTP error! status: ${response.status}`;
                Alert.alert('Ошибка', errorMessage);
            }
            return await response.json();
        } catch (err) {
            console.error('Error in loadData:', err);
            return null;
        }
    }
}