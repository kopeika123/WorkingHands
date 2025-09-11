import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface RatingProps {
    value: number;      // например: 4.5
    max?: number;       // по умолчанию: 5
    size?: number;      // размер иконки
    color?: string;     // цвет звёзд
    showText?: boolean; // показывать ли число справа
}

const Rating: React.FC<RatingProps> = ({
                                           value,
                                           max = 5,
                                           size = 20,
                                           color = '#FFD700',
                                           showText = true
                                       }) => {
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 >= 0.5;
    const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <View style={styles.row}>
            {/* Полные звёзды */}
            {Array.from({ length: fullStars }, (_, i) => (
                <Icon key={`full-${i}`} name="star" size={size} color={color} />
            ))}

            {/* Половинчатая звезда */}
            {hasHalfStar && <Icon name="star-half-empty" size={size} color={color} />}

            {/* Пустые звёзды */}
            {Array.from({ length: emptyStars }, (_, i) => (
                <Icon key={`empty-${i}`} name="star-o" size={size} color={color} />
            ))}

            {/* Числовое значение рейтинга */}
            {showText && (
                <Text style={[styles.text, { fontSize: size * 0.8 }]}>{value.toFixed(1)}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 8,
        color: '#333',
    },
});

export default Rating;
