import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";

// TAB
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

// Screens
import HomeScreen from "../screens/HomeScreen";
import Club from "../screens/Club";
import Bar from "../screens/Bar";


//Screen names
const homeName = "Homee";
const detailsName = "Bar";
const settingsName = "Club";

export default function HomeStack() {
    return (
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;
                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === detailsName) {
                            iconName = focused ? 'list' : 'list-outline';
                        } else if (rn === settingsName) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    headerShown: false
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 10, height: 70},

                }}
                >
                <Tab.Screen name={homeName} component={HomeScreen} />
                <Tab.Screen name={detailsName} component={Club} />
                <Tab.Screen name={settingsName} component={Bar} />
            </Tab.Navigator>
    );
}