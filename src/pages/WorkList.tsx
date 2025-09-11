import React from 'react';
import {View, Text, Animated, TouchableOpacity, Pressable} from 'react-native';
import {observer} from 'mobx-react-lite';
import {styles} from "../assets/styles.ts";
import {useGeolocation} from "../hook/useGeolocation.ts";
import WorkStore from "../store/workStore.ts";
import {useLoadShiftsByLocation} from "../hook/useLoadShiftsByLocation.ts";
import ScrollView = Animated.ScrollView;
import workStore from "../store/workStore.ts";
import {DataTable} from 'react-native-paper';
import {RootStackParamList, WorkItem} from "../types";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {ActivityIndicator} from 'react-native';

type WorkListNavigationProp = StackNavigationProp<RootStackParamList, 'WorkList'>;

const WorkList = observer(() => {
    const navigation = useNavigation<WorkListNavigationProp>();
    const {location} = useGeolocation();
    useLoadShiftsByLocation(location);

    const goToDetails = (work: WorkItem) => {
        navigation.navigate('WorkDetails', {work});
    }


    if (WorkStore.isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007AFF"/>
                <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <DataTable>
                    {workStore?.data.map((item: WorkItem, i: number) => (
                        <Pressable
                            key={i}
                            onPress={() => goToDetails(item)}
                            style={({ pressed }) => [
                                {backgroundColor: pressed ? '#f2f2f2' : '#ffffff', borderRadius: 6,
                                    overflow: 'hidden'}]}>
                            <DataTable.Row>
                                <DataTable.Cell>
                                    <View style={styles.cellContent}>
                                        <Text style={styles.companyText}>{item.companyName}</Text>
                                        <Text style={styles.workTypeText}>
                                            {item.workTypes?.[0]?.name ?? 'No work types'}
                                        </Text>
                                    </View>
                                </DataTable.Cell>
                            </DataTable.Row>
                        </Pressable>
                    ))}
                </DataTable>
            </ScrollView>

        </View>
    )
});
export default WorkList;