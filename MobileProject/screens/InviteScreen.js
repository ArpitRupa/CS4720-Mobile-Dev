import React from 'react';
import {
    View, Text, StyleSheet, Button, ScrollView, Picker,
    TouchableOpacity, Image, TextInput
} from 'react-native';
import { Card, ListItem, CheckBox } from 'react-native-elements';
import firebase from "./../firebase";



export default class InviteScreen extends React.Component {

    static navigationOptions = {
        title: 'Invite',
    };

    constructor(props) {
        super(props);
        this.state = { userList: [], checks: [], selected:0, success:false, };
    }

    componentWillMount () {
        firebase.database().ref('Users').orderByChild('uid').once("value", snapshot => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                let userChecks = [];
                for (var property in userData) {
                    userChecks.push(false);
                }
                // console.log(userData)
                this.setState({
                    ...this.state,
                    checks: userChecks,
                    userList: userData,
                });
                console.log("Barry is not good at Smash!")
            } else {
                console.log("fail")
            }
        });
    }

    toInvitePage(){
        let invitedUser=[];
        let i =0;
        const checks = this.state.checks
        let objectList = Object.keys(this.state.userList);
        for (i; i < checks.length; i++) {
            if (checks[i] == true) {
                invitedUser.push(objectList[i]);
            }
        }

            firebase.database().ref('event/').push({
                    address: this.props.navigation.state.params.address,
                    day: '1',
                    month: 'January',
                    name: 'Arpit Rupa',
                    time:  this.props.navigation.state.params.hours + ":" + this.props.navigation.state.params.mins
            }).then((snap) => {
                const key = snap.key;
                let x = 0;
                console.log(key);
                for (x; x < invitedUser.length; x++) {
                    firebase.database().ref('Users/' + invitedUser[x]+ "/invited_events/"+key).set({
                        event_id: key
                    }).then((data) => {
                        console.log('data ', data)
                        //success callback
                        this.setState({
                            ...this.state,
                            success: true
                        });
                        firebase.database().ref('event/' + key).update({
                            event_id: key
                        }).then((data) => {
                            if (this.state.success) {
                                this.props.navigation.push('EventDetails', {
                                    address: this.props.navigation.state.params.address,
                                    event:key,
                                    hours: this.props.navigation.state.params.hours, mins: this.props.navigation.state.params.mins,
                                    userList: this.state.userList, checks: this.state.checks,
                                });
                            }
                            console.log('data ', data)
                        }).catch((error) => {
                            //error callback
                            console.log('error ', error)
                        })
                    }).catch((error) => {
                        //error callback
                        console.log('error ', error)
                    })
                }

            }).catch((error) => {
                //error callback
                console.log('error ', error)
            }); 
        // console.log(this.state);             event_id: pushedData.getKey(),

    }

    pressed (i) {
        let temp = this.state.checks;
        let count = this.state.selected;

        if (temp[i] == false) {
            temp[i] = true;
            count += 1;
        } else {
            temp[i]= false;
            count -=1;
        }
        
        this.setState({
            ...this.state,
            checks: temp,
            selected: count
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.eventInfo}>
                    <Card title="Event">
                        <Text style={{textAlign: 'center'}}> 
                        {this.props.navigation.state.params.address} 
                        </Text>
                        <Text style={{textAlign: 'center'}}> 
                            {this.props.navigation.state.params.hours} : {this.props.navigation.state.params.mins}
                        </Text>
                    </Card>
                </View>

                <View style={styles.peopleList}>

                    <ScrollView>

                    <Text> Selected : {this.state.selected} </Text>
                    <Card containerStyle={{ padding: 0 }} >
                        {
                            Object.keys(this.state.userList).map((u, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        roundAvatar
                                        title={
                                            <CheckBox
                                                title={this.state.userList[u].name}
                                                onPress={() => this.pressed(i)}
                                                checked={this.state.checks[i]}
                                            />
                                        }                                        
                                        leftAvatar={{
                                            source: {
                                                uri: this.state.userList[u].pictureUrl,
                                            },
                                        }}
                                    />
                                );
                            })
                        }
                    </Card>
                </ScrollView>
                </View>

                <View style={styles.sendInvitation}>
                    < TouchableOpacity
                        style={
                            styles.SendButton
                        }
                        onPress={
                            () => this.toInvitePage()
                        } >
                        <Image
                            style={
                                styles.SendImage
                            }
                            source={require("../assets/Sliced/Send-btn.png")}
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
    eventInfo: {
        flex: 2,
    },
    peopleList: {
        flex: 5,
    },
    SendButton: {
        resizeMode: 'contain',
    },
    SendImage: {
        width: "100%",
        height: "100%"
    },
    sendInvitation: {
        flex: 1,
        bottom: 0,
    },
});