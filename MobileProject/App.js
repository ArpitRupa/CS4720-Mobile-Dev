import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import firebase from './firebase';
import InvitationDetail from './screens/InvitationDetail.js';
import CreateEvent from './screens/CreateEvent.js';
import HomeScreen from './screens/HomeScreen.js';
import EventDetails from './screens/EventDetails.js';

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import InviteScreen from './screens/InviteScreen.js'
import LoginScreen from './screens/LoginScreen.js';

class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;
console.disableYellowBox = true;
class DashboardScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>DashboardScreen</Text>
      </View>
    );
  }
}

class Feed extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Feed</Text>
        <Button
          title="Map"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.push('InvitationDetail', {
              name: "Event Location",
            });
          }}
        />
        <Button
          title="CreateEvent"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.push('CreateEvent', {
              name: "Event Location",
            });
          }}
        />
      </View>
    );
  }
}

const DashboardStackNavigator = createStackNavigator(
  {
    Feed: HomeScreen,
    InvitationDetail : InvitationDetail,
    CreateEvent: CreateEvent,
    InviteScreen: InviteScreen,
    EventDetails: EventDetails,
    
  },
);



const AppSwitchNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen},
  //Home: { screen: HomeScreen},
  Dashboard: { screen: DashboardStackNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
