import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, Button } from 'react-native';
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
import { ScrollView } from 'react-native-gesture-handler';
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
  static navigationOptions = {
    title: 'DinDin',
    headerStyle: {
      backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
      },
    // I CHANGED IMAGE NAME SO IT'LL APPEAR
    headerRight: (
      <Image
        source={require("./assets/Sliced/search_btn.png")}
      />
    ),
    // I CHANGED IMAGE NAME SO IT'LL APPEAR
    headerLeft: (
      <Image
        source={require("./assets/Sliced/sidemenu_btn.png")}
        />
    ),
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/*<Text>Feed</Text>
        <Button
          title="Map"
          onPress={() => {
            // 1. Navigate to the Details route with params 
            this.props.navigation.push('InvitationDetail', {
              name: "Event Location",
            });
          }}
        />
        <Button
        onPress={()=> alert("HUJHU")}
        title="Search"
        color="#fff"
      />*/}
        <ScrollView horizontal='true'>
          <View>
            <Button title="Jan"/>
          </View>
          <View>
            <Button title="Feb"/>
          </View>
          <View>
            <Button title="Mar"/>
          </View>
          <View>
            <Button title="Apr"/>
          </View>
          <View>
            <Button title="May"/>
          </View>
          <View>
            <Button title="Jun"/>
          </View>
          <View>
            <Button title="Jul"/>
          </View>
          <View>
            <Button title="Aug"/>
          </View>
          <View>
            <Button title="Sep"/>
          </View>
          <View>
            <Button title="Oct"/>
          </View>
          <View>
            <Button title="Nov"/>
          </View>
          <View>
            <Button title="Dec"/>
          </View>
        </ScrollView>
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
