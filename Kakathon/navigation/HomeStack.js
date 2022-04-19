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
const homeName = "Home";
const barPage = "Bar";
const clubPage = "Club";

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
                        } else if (rn === barPage) {
                            iconName = focused ? 'fast-food-outline' : 'fast-food-outline';
                        } else if (rn === clubPage) {
                            iconName = focused ? 'people' : 'people-outline';
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    headerShown: false
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 5, fontSize: 10 },
                    style: { padding: 10, height: 70},
                }}
                >
                <Tab.Screen name={clubPage} component={Club} />
                <Tab.Screen name={homeName} component={HomeScreen} />
                <Tab.Screen name={barPage} component={Bar} />
            </Tab.Navigator>
    );
}