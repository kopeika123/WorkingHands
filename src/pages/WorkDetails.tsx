import React from 'react';
import { View, Animated } from 'react-native';
import {observer} from "mobx-react-lite";

const WorkDetails = observer(() => {
    const animatedValue = new Animated.Value(0);
    return (
        <View>
            <Animated.Text style={{ opacity: animatedValue }}>Work Details</Animated.Text>
        </View>
    );
});

export default WorkDetails;