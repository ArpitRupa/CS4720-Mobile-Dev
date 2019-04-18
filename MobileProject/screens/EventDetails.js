import React from 'react';
import {
  View, Text, StyleSheet, Button, ScrollView, Picker,
  TouchableOpacity, Image, TextInput, Alert
} from 'react-native';
import { Card, ListItem, CheckBox } from 'react-native-elements';
import firebase from "./../firebase";

export default class EventDetails extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Event Details',
      headerRight: (
        <Button
          onPress={() => params.navi.push("CreateEvent")}
          title="Edit"
          color="#a2dff2"
        />
      ),
      headerLeft: (
        <Button
          onPress={() => params.navi.popToTop()}
          title="Home"
          color="#a2dff2"
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = { invitedUsers: [], };
  }


  componentDidMount () { 
    this.props.navigation.setParams({
      navi: this.props.navigation
    })
    let temp = this.props.navigation.state.params.checks;
    let users = this.props.navigation.state.params.userList;
    let invitedUsers = [];
    Object.keys(users).map((u, i) => {
      if(temp[i] == true) {
        invitedUsers.push([users[u].name, users[u].pictureUrl]);
      }
    }
  );
    this.setState({
      ...this.state,
      invitedUsers:invitedUsers
    });

    console.log(this.props.navigation.state.params.address);
  }

  cancelPost () {
    firebase.database().ref('event/' + this.props.navigation.state.params.event).remove()
    .then((data) => {
      this.props.navigation.popToTop();
      console.log('data ', data)
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    })
  }

  cancelEvent () {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to cancel your event?',
      [
        { text: 'Yes', onPress: () => this.cancelPost() },
        {

          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.eventInfo}>
          <Card title="Event">
            <Text style={{ textAlign: 'center' }}>
              {this.props.navigation.state.params.address}
            </Text>
            <Text style={{ textAlign: 'center' }}>
              {this.props.navigation.state.params.hours} : {this.props.navigation.state.params.mins}
            </Text>
          </Card>
        </View>

        <View style={styles.peopleList}>

          <ScrollView>
            <Text> Invited: </Text>
            <Card containerStyle={{ padding: 0 }} >
              {
                Object.keys(this.state.invitedUsers).map((u, i) => {
                  return (
                    <ListItem
                      key={i}
                      roundAvatar
                      title= {this.state.invitedUsers[i][0]}
                      leftAvatar={{
                        source: {
                          uri: this.state.invitedUsers[i][1],
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
              () => this.cancelEvent()
            } >
            <Image
              style={
                styles.SendImage
              }
              source={require("../assets/Sliced/Cancel-btn-big.png")}
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
        backgroundColor: "black",
        resizeMode: 'contain',
    },
    SendImage: {
        width: "100%",
        height: "100%",
        alignItems: 'center'

    },
    sendInvitation: {
        flex: 1,
        justifyContent: 'center',
        bottom: 0,
    },
});