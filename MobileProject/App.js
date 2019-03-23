import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import firebase from './firebase';
import InvitationDetail from './screens/InvitationDetail.js';


import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import LoginScreen from './screens/LoginScreen.js';
class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;

// class WelcomeScreen extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Button
//           title="Login"
//           onPress={() => this.props.navigation.navigate('Dashboard')}
//         />
//         <Button title="Sign Up" onPress={() => alert('button pressed')} />
//       </View>
//     );
//   }
// }

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
      </View>
    );
  }
}

const DashboardStackNavigator = createStackNavigator(
  {
    Feed: Feed,
    InvitationDetail : InvitationDetail,
    
  },
);



const AppSwitchNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen},
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
