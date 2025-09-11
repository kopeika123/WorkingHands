import React from 'react';
import {View, Text, Image} from 'react-native';
import {observer} from "mobx-react-lite";
import {RootStackParamList} from "../types";
import {RouteProp, useRoute} from "@react-navigation/core";
import {styles} from "../assets/styles.ts";
import Rating from "../components/Rating.tsx";

type WorkDetailsRouteProp = RouteProp<RootStackParamList, 'WorkDetails'>;

const WorkDetails = observer(() => {
    const route = useRoute<WorkDetailsRouteProp>();
    const { work } = route.params;
    console.log(work)

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={{uri: work.logo}}/>

            <Text style={styles.workTypeText}>Компания: </Text>
            <Text style={styles.companyText}>{work.companyName }</Text>

            <Text style={styles.workTypeText}>Адрес: </Text>
            <Text style={styles.companyText}>{work.address}</Text>

            <Text style={styles.workTypeText}>Дата: </Text>
            <Text style={styles.companyText}>{work.dateStartByCity}</Text>

            <View style={styles.centeredContainer}>
                <View style={styles.row}>
                    <Text style={styles.workTypeTextDetail}>Время начала</Text>
                    <Text style={styles.workTypeTextDetail}>Время окончания</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.companyTextDetail}>{work.timeStartByCity}</Text>
                    <Text style={styles.companyTextDetail}>{work.timeEndByCity}</Text>
                </View>
            </View>

            <Text style={styles.workTypeText}>Сколько людей уже набрано: </Text>
            <Text style={styles.companyText}>{work.currentWorkers}</Text>

            <Text style={styles.workTypeText}>Сколько людей требуется: </Text>
            <Text style={styles.companyText}>{work.planWorkers}</Text>

            <Text style={styles.workTypeText}>Сумма выплаты за смену (в рублях): </Text>
            <Text style={styles.companyText}>{work.priceWorker}</Text>

            <Text style={styles.workTypeText}>Количество отзывов о клиенте: </Text>
            <Text style={styles.companyText}>{work.customerFeedbacksCount}</Text>

            <Text style={styles.workTypeText}>Рейтинг нанимателя: </Text>
            <Rating value={4.5} />
        </View>
    );
});

export default WorkDetails;