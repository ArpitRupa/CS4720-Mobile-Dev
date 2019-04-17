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
import { FacebookID } from 'react-native-dotenv'

import { MonoText } from '../components/StyledText';

export default class LoginScreen extends React.Component {
    
    state = {
        userAuthenticated:false,
    };

    async loginWithFacebook() {

        //get permission from facebook
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(FacebookID, { permissions: ['public_profile'] })

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
                    console.log("Barry is not good at Smash!")
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
                    <View style={styles.bigImage}>
                        <Image
                            source={require("../assets/Sliced/Illustration.png")}
                        />
                        {/* <Image
                            style={styles.welcome}
                            source={require("../assets/Sliced/tr.png")}
                        /> */}
                    </View>
                        <Text style={styles.sloganText}> 
                           Connecting Food Lovers. 
                        </Text>
                </ScrollView>
                <View>
                    < TouchableOpacity
                    style = {
                        styles.getStartedButton
                    }
                    onPress = {
                        () => this.loginWithFacebook()
                    } >
                        <Image 
                            style = {
                                styles.getStartedImage
                            }
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
        width: "100%", 
    },
    bigImage: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },

    getStartedButton: {
        aspectRatio: 1.5,
        resizeMode: 'contain',
    },
    getStartedImage: {
        width:"100%",
    },
    sloganText: {
        textAlignVertical: "center", 
        textAlign: "center",
        marginTop: -10,
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
});
