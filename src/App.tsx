import 'react-native-gesture-handler';
import React from "react";
import WorkDetails from "./pages/WorkDetails.tsx";
import { NavigationContainer } from "@react-navigation/native";
import WorkList from "./pages/WorkList.tsx";
import { Provider as MobXProvider } from 'mobx-react';
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import WorkStore from "./store/workStore.ts";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <MobXProvider stores={{ WorkStore }}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="WorkList">
                        <Stack.Screen name="WorkList" component={WorkList}
                                      options={{ title: 'Компании' }}/>
                        <Stack.Screen name="WorkDetails" component={WorkDetails}
                                      options={{ title: 'Детали работы' }}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </MobXProvider>
        </GestureHandlerRootView>
    );
}

export default App;
