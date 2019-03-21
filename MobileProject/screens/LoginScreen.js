import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebBrowser,Facebook } from 'expo';
import firebase from "./../firebase";

import { MonoText } from '../components/StyledText';

export default class LoginScreen extends React.Component {
    


    async loginWithFacebook() {

        //get permission from facebook
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('263332817936281', { permissions: ['public_profile'] })

        if (type == 'success') {

            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            
            firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
                console.log(error)
            })

        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
        const userInfo = await response.json();
        this.setState({ userInfo });
        const name = userInfo.name;
        const pictureUrl = userInfo.picture.data.url;
        const uid = userInfo.id;
        //check if the user id is existant in the database
        firebase.database().ref('Users').orderByChild('uid').equalTo(uid).once("value", snapshot => {  
            if (snapshot.exists()) {
                    const userData = snapshot.val();
                    console.log("exists!", userData);
            } else {
                //if uid not existant in database, create new entry
                firebase.database().ref('Users/' + uid).set({
                    uid,
                    name,
                    pictureUrl
                }).then((data) => {
                    //success callback
                    console.log('data ', data)
                }).catch((error) => {
                    //error callback
                    console.log('error ', error)
                })
                }
            });

        //navigate to the dashboard
        this.props.navigation.navigate('Dashboard');

        }
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <Image
                            source={require("../assets/Sliced/Illustration.png")}
                        />
                        {/* <Image
                            style={styles.welcome}
                            source={require("../assets/Sliced/tr.png")}
                        /> */}
                    </View>
                </ScrollView>

                <Text style={styles.getStartedContainer}> Connecting Food Lovers. </Text>

                <View>
                    <TouchableOpacity onPress={() => this.loginWithFacebook()}>
                        <Image
                            source={require("../assets/Sliced/getStarted.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        marginBottom: 185,
        alignItems: 'center',
        marginHorizontal: 100,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        backgroundColor: 'yellow',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
});
