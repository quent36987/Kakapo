import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import {Ionicons} from "@expo/vector-icons";


const CardBar = (item) => {

    return (

        <TouchableOpacity style={{ margin: 5, flex: 1, flexDirection: "row",
            justifyContent: "space-around" ,
            marginHorizontal:10,
            borderRadius: 10,
            overflow: 'hidden',
        }}
                          onPress={() => { item.item.qt += 1; console.log(item.item.qt);}}
        >
            <View style={{ backgroundColor: "red", width: '100%', height: '100%', marginBottom: 1 }} >
                <ImageBackground
                    source={'https://cap.img.pmdstatic.net/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Fcap.2F2022.2F04.2F01.2Fe6617afe-f54c-4d36-add4-e353977e2ca7.2Ejpeg/1200x630/background-color/ffffff/quality/70/cr/wqkgUGl4YWJheSAvIENBUElUQUw%3D/pizzas-buitoni-une-enquete-pour-homicides-involontaires-est-ouverte-1432802.jpg'}
                    style={{width: '100%', height: 150 }}
                >

                    <Text style={{ margin : 10
                        , fontSize : 14, padding : 2 ,
                        color : 'white', width : '55%', borderRadius : 8,
                        fontFamily: "arial",
                        fontWeight: 'bold',
                        textShadow : '1px 0 10px #000'}}>
                        {item.item.titre}</Text>

                    {item.item.qt > 0 ? <Text style={{marginBottom: 4, color : 'white'}}>
                        {item.item.qt}
                    </Text>  : <></> }

                </ImageBackground>
            </View>
        </TouchableOpacity>



    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: '600'
    },
    base: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
        paddingHorizontal: 12
    }
});

export default CardBar;