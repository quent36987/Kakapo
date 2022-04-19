import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Club from "../screens/Club";
import Bar from "../screens/Bar";

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Club' component={Club} />
            <Stack.Screen name='Bar' component={Bar} />
        </Stack.Navigator>
    );
}