import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import firebase from './../firebase';
import InvitationDetail from './InvitationDetail.js';
//import { Calendar, CalendarList, Agenda, calendarTheme } from 'react-native-calendars';
import Card from './../components/Card.js';
import Agenda from './Agenda.js';

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import LoginScreen from './LoginScreen.js';
import { ScrollView } from 'react-native-gesture-handler';



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

//let uid = this.props.navigation.getParam(idd);
// Get count value from database
// RIGHT NOW I JUST HARD CODED uid TO USE FOR TESTING BUT WILL CHANGE THAT SOON
var firebaseRef = firebase.database().ref('Users').orderByChild('uid').equalTo("2376854179025779");
var name = [];
var weekday = [];
var day = [];
var month = [];
var time = [];
//var profilePic = "";
var profilePic = [];
var pending = false;
let pendEvents = [];
firebaseRef.once("value", snapshot => {
  if (snapshot.exists()) {
    // snapshot.getChildren();
    const userData = snapshot.val();
    const invited_events = userData["2376854179025779"]["invited_events"];
    for (var p in invited_events) {
      //console.log(invited_events[p]["event_id"]);
      pendEvents.push(invited_events[p]["event_id"]);
    }
    //console.log(pendEvents.length)
    for (let i = 0; i < pendEvents.length; i++) {
      var firebaseReff = firebase.database().ref('event').orderByChild('event_id').equalTo(pendEvents[i]);
      firebaseReff.once("value", snapshot => {
        if (snapshot.exists()) {
          const eventData = snapshot.val();
          name.push(eventData["" + pendEvents[i]]["name"]);
          weekday.push(eventData["" + pendEvents[i]]["weekday"]);
          day.push(eventData["" + pendEvents[i]]["day"]);
          month.push(eventData["" + pendEvents[i]]["month"]);
          time.push(eventData["" + pendEvents[i]]["time"]);
        }
      });
      // cards+=<View><Card id="button"
      // width={ (300) }
      // content={ weekday[i]+" "+day[i]+" "+month[i]+" - "+time[i] }
      // source={ {uri: profilePic} }
      // title={ name[i] }
      // imageWidth={ 100 }
      // imageHeight={ 100 }
      // roundedImage={ true }
      // roundedImageValue={ 50 }
      // imageMargin={ {top: 10} }
      // onPress= {this.updateText}>

      // </Card></View>;
    }
    //pending = userData["2376854179025779"]["Dinners"]["Dinner1"]["pending"];
    //weekday = userData["2376854179025779"]["Dinners"]["Dinner1"]["weekday"];
    //day = userData["2376854179025779"]["Dinners"]["Dinner1"]["day"];
    //month = userData["2376854179025779"]["Dinners"]["Dinner1"]["month"];
    //time = userData["2376854179025779"]["Dinners"]["Dinner1"]["time"];
    //name = userData["2376854179025779"]["Dinners"]["Dinner1"]["name"];
    //console.log(invited_events);
  } else {

  }
});


// Fix this where it finds user of Pending Dinner
var firebaseRef2 = firebase.database().ref('Users').orderByChild('uid').equalTo("10214085362703839");
firebaseRef2.once("value", snapshot => {
  if (snapshot.exists()) {
    profilePic = snapshot.val()["10214085362703839"]["pictureUrl"];
  }
});
var count = 2;
//var show = "Jan";
export default class HomeScreen extends Component {
  constructor() {
    super();
    //var params = props.navigation.state.params.idd;
    this.state = {
      myText: 'Pending(' + count + ')',
      show: 'Jan'
    }
  }
  createCards = () => {
    let cards = []
    let currentCardInfo = ""
    for (let i = 0; i < pendEvents.length; i++) {
      //let children = []
      //for(let j=0;j<5;j++) {
      //  children.push(<td>{name[i]}</td>)
      //}
      currentCardInfo = weekday[i] + " " + day[i] + " " + month[i] + " - " + time[i]
      cards.push(<Card id="button"
        class = {pendEvents[i]}
        width={(300)}
        height={(500)}
        content={currentCardInfo}
        source={{ uri: profilePic }}
        title={name[i]}
        imageWidth={75}
        imageHeight={75}
        roundedImage={true}
        roundedImageValue={50}
        imageMargin={{ top: 10 }}
        onPress={ () => this.props.navigation.push('InvitationDetail', { name: name[i], picture: profilePic, cardInfo: currentCardInfo})
      }>

      </Card>);
    }
    return cards;
  }
  // updateText = () => {
  //   count+=1,
  //   this.setState({myText: 'Pending('+count+')'})
  // }
  viewEvents = (month) => {
    //console.log(this.state.show);
    if ("Jan" == month) {
      this.setState({ show: "Jan" });
    }
    if ("Feb" == month) {
      this.setState({ show: "Feb" });
    }
    if ("Mar" == month) {
      this.setState({ show: "Mar" });
    }
    if ("Apr" == month) {
      this.setState({ show: "Apr" });
    }
    if ("May" == month) {
      this.setState({ show: "May" });
    }
    if ("Jun" == month) {
      this.setState({ show: "Jun" });
    }
    if ("Jul" == month) {
      this.setState({ show: "Jul" });
    }
    if ("Aug" == month) {
      this.setState({ show: "Aug" });
    }
    if ("Sep" == month) {
      this.setState({ show: "Sep" });
    }
    if ("Oct" == month) {
      this.setState({ show: "Oct" });
    }
    if ("Nov" == month) {
      this.setState({ show: "Nov" });
    }
    if ("Dec" == month) {
      this.setState({ show: "Dec" });
    }
    return null;

  }
  showColor = (month) => {
    if(month == this.state.show) {
      return "#0000FF";
    }
    else{
      return "#808080";
    }
  }
  showEvents = () => {
    //console.log(this.state.show);
    if ("Jan" == this.state.show) {
      return (
        <Agenda navigate1={this.props.navigation} id="Jan"></Agenda>
      );
    }
    if ("Feb" == this.state.show) { return (<Agenda navigate1={this.props.navigation} id="Feb"></Agenda>); }
    if ("Mar" == this.state.show) { return (<Agenda navigate1={this.props.navigation} id="Mar"></Agenda>); }
    if ("Apr" == this.state.show) { return (<Agenda navigate1={this.props.navigation} id="Apr"></Agenda>); }
    if ("May" == this.state.show) { return (<Agenda navigate1={this.props.navigation} id="May"></Agenda>); }
    if ("Jun" == this.state.show) { return (<Agenda navigate1={this.props.navigation} id="Jun"></Agenda>); }
    if ("Jul" == this.state.show) { return (<Agenda navigate1={this.props.navigation} id="Jul"></Agenda>); }
    if ("Aug" == this.state.show) { return (<Agenda navigate1={this.props.navigation} id="Aug"></Agenda>); }
    if ("Sep" == this.state.show) { return (<Agenda navigate1={this.props.navigation} id="Sep"></Agenda>); }
    if ("Oct" == this.state.show) { return (<Agenda navigate1={this.props.navigation} id="Nov"></Agenda>); }
    if ("Dec" == this.state.show) { return (<Agenda navigate1={this.props.navigation} id="Dec"></Agenda>); }
  }
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
      <TouchableOpacity>
        <Image
          source={require("./../assets/Sliced/search_btn.png")}
        />
      </TouchableOpacity>
    ),
    // I CHANGED IMAGE NAME SO IT'LL APPEAR
    headerLeft: (
      <TouchableOpacity>
        <Image
          source={require("./../assets/Sliced/sidemenu_btn.png")}
        />
      </TouchableOpacity>
    ),
  };
  render() {
  //const uid = this.props.navigation.state.params.idd;
  //console.log(uid);
    return (
      <ScrollView style={styles.container}>
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
        <ScrollView horizontal='true' showsHorizontalScrollIndicator={false}>
          <View>
            <Button title="Jan" color={this.showColor("Jan")}
              onPress={
                () => this.viewEvents("Jan")
              }
            />
          </View>
          <View>
            <Button title="Feb" color={this.showColor("Feb")}
              onPress={
                () => this.viewEvents("Feb")
              }
            />
          </View>
          <View>
            <Button title="Mar" color={this.showColor("Mar")}
              onPress={
                () => this.viewEvents("Mar")
              }
            />
          </View>
          <View>
            <Button title="Apr" color={this.showColor("Apr")}
              onPress={
                () => this.viewEvents("Apr")
              }
            />
          </View>
          <View>
            <Button title="May" color={this.showColor("May")}
              onPress={
                () => this.viewEvents("May")
              }
            />
          </View>
          <View>
            <Button title="Jun" color={this.showColor("Jun")}
              onPress={
                () => this.viewEvents("Jun")
              }
            />
          </View>
          <View>
            <Button title="Jul" color={this.showColor("Jul")}
              onPress={
                () => this.viewEvents("Jul")
              }
            />
          </View>
          <View>
            <Button title="Aug" color={this.showColor("Aug")}
              onPress={
                () => this.viewEvents("Aug")
              }
            />
          </View>
          <View>
            <Button title="Sep" color={this.showColor("Sep")}
              onPress={
                () => this.viewEvents("Sep")
              }
            />
          </View>
          <View>
            <Button title="Oct" color={this.showColor("Oct")}
              onPress={
                () => this.viewEvents("Oct")
              }
            />
          </View>
          <View>
            <Button title="Nov" color={this.showColor("Nov")}
              onPress={
                () => this.viewEvents("Nov")
              }
            />
          </View>
          <View>
            <Button title="Dec" color={this.showColor("Dec")}
              onPress={
                () => this.viewEvents("Dec")
              }
            />
          </View>

        </ScrollView>
        <Text>{this.state.myText}</Text>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal='false'>{this.createCards()}</ScrollView>
        <ScrollView vertical="true" id="Jan">
          {this.showEvents()
          }
        </ScrollView>
        <Button title="Invitation Screen"
          onPress={
            () => this.props.navigation.navigate('InvitationDetail')
          }
        />
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});