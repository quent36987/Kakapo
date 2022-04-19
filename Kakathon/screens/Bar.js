
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import Firebase from '../config/firebase';
import Post from "../components/Post";


class Bar extends Component {

    constructor() {
        super();
        this.docs = Firebase.firestore().collection('post');
        this.state = {
            isLoading: true,
            students: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getStudentsData);
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    getStudentsData = (querySnapshot) => {
        const students = [];
        querySnapshot.forEach((res) => {
            const { message, titre } = res.data();
            students.push({
                key: res.id,
                message,
                titre
            });
        });
        this.setState({
            students,
            isLoading: false
        });
    }



    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="red"/>
                </View>
            )
        }
        return (
            <ScrollView style={styles.wrapper}>
                {
                    this.state.students.map((res, i) => {
                        return (
                            <Post title={res.titre}/>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingBottom: 22
    },
    loader: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
})

export default Bar;