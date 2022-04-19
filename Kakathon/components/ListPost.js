import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import Firebase from '../config/firebase';
import Post from "./Post";
class ListPost extends Component {
    constructor() {
        super();
        this.firestoreRef = Firebase.firestore().collection('post');
        this.state = {
            isLoading: true,
            postArr: []
        };
    }
    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
    getCollection = (querySnapshot) => {
        const postArr = [];
        querySnapshot.forEach((res) => {
            const { date, image, important, message, titre } = res.data();
            postArr.push({
                key: res.id,
                message,
                titre,
                date,
                important,
                image,
            });
        });
        this.setState({
            postArr,
            isLoading: false,
        });
    }
    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                {
                    this.state.postArr.map((item, i) => {
                        return (

                            <Post title={item.titre} message={item.message} image={item.image} date={item.date}
                             important={item.important}/>
                        );
                    })
                }
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default ListPost;