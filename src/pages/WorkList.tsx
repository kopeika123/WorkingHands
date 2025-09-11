import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {observer} from 'mobx-react-lite';
import {styles} from "../assets/styles.ts";
import {useGeolocation} from "../hook/useGeolocation.ts";
import WorkStore from "../store/workStore.ts";

const useStores = () => ({WorkStore});

const WorkList = observer(() => {
    const {location} = useGeolocation();
    const {WorkStore} = useStores();

    useEffect(() => {
        const loadData = async () => {
            if (location) {
                try {
                    await WorkStore.loadShifts(location);
                } catch (error) {
                    console.error('Ошибка при загрузке данных:', error);
                }
            }
        };
        loadData();
    }, [location, WorkStore]);

    if (WorkStore.isLoading) return <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Загрузка...</Text>
    </View>;

    return (
        <View style={styles.container}>
            <Text>{location?.latitude}</Text>
        </View>
    );
});
export default WorkList;