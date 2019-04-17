import React from 'react';
import {
    View, Text, StyleSheet, Button, ScrollView, Picker,
    TouchableOpacity, Image, TextInput
} from 'react-native';
import { Card } from 'react-native-elements'



export default class InviteScreen extends React.Component {

    static navigationOptions = {
        title: 'Invite',
    };

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
        backgroundColor: '#17db0d',
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