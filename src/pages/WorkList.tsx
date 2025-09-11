import React from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react-lite';
import {styles} from "../assets/styles.ts";
import {useGeolocation} from "../hook/useGeolocation.ts";
import WorkStore from "../store/workStore.ts";
import {useLoadShiftsByLocation} from "../hook/useLoadShiftsByLocation.ts";
import ScrollView = Animated.ScrollView;
import workStore from "../store/workStore.ts";
import {DataTable} from 'react-native-paper';
import {WorkItem} from "../types";
import {useNavigation} from "@react-navigation/native";


const WorkList = observer(() => {
    const navigation = useNavigation();
    const {location} = useGeolocation();
    useLoadShiftsByLocation(location);

    const goToDetails = (work: WorkItem) => {
        console.log(work)
       // navigation.navigate('WorkDetails', { work });
    }


    if (WorkStore.isLoading) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <DataTable>
                    {workStore?.data.map((item: WorkItem, i: number) => (
                        <DataTable.Row key={i}>
                            <DataTable.Cell>
                                <TouchableOpacity
                                    style={styles.cellContent}
                                    onPress={() => goToDetails(item)}
                                    activeOpacity={0.7}>
                                    <Text style={styles.companyText}>{item.companyName}</Text>
                                    <Text style={styles.workTypeText}>
                                        {item.workTypes && item.workTypes.length > 0
                                            ? item.workTypes[0].name
                                            : 'No work types'}
                                    </Text>
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </ScrollView>
        </View>
    )
});
export default WorkList;