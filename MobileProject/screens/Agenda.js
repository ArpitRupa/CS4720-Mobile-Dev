import React, { Component } from 'react'
import { View, Dimensions, Text, Platform, TouchableOpacity, Image, Button } from 'react-native';
import PropTypes from 'prop-types';
import Card from './../components/Card.js';
import firebase from "./../firebase";



function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

class Agenda extends Component {

     
    render() {
        const navigate = this.props.navigate1;
        let dates;
        // HARD CODED USER LOGGED IN BUT WILL FIX LATER
        let card;
        const addButton = <TouchableOpacity title="Add Event" onPress={() => navigate.push('CreateEvent')}><Image source={require("../assets/Sliced/add_new_event.png")} /></TouchableOpacity>;
        var firebaseRef = firebase.database().ref('Users').orderByChild('uid').equalTo("2376854179025779");
        firebaseRef.ref.child('2376854179025779/accepted_events').once("value", snapshot => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                //console.log(userData["2376854179025779"]['accepted_events']);
                console.log(userData);
                var a = snapshotToArray(snapshot);
                //console.log(a[0]["accepted_events"]);
                var p = [];
                snapshot.forEach(function (childSnap) {
                    var key = childSnap.key;
                    var childData = childSnap.val();
                    //console.log("KEY\n"+key);
                    //console.log("DATA\n"+childData[0]);
                });
            }
        });
        const jan = <View><Text>January 1</Text>{addButton}<Text>January 2</Text>{addButton}
            <Text>January 3</Text>{addButton}<Text>January 4</Text>{addButton}<Text>January 5</Text>{addButton}<Text>January 6</Text>{addButton}
            <Text>January 7</Text>{addButton}<Text>January 8</Text>{addButton}<Text>January 9</Text>{addButton}<Text>January 10</Text>{addButton}
            <Text>January 11</Text>{addButton}<Text>January 12</Text>{addButton}<Text>January 13</Text>{addButton}<Text>January 14</Text>{addButton}
            <Text>January 15</Text>{addButton}<Text>January 16</Text>{addButton}<Text>January 17</Text>{addButton}<Text>January 18</Text>{addButton}
            <Text>January 19</Text>{addButton}<Text>January 20</Text>{addButton}<Text>January 21</Text>{addButton}<Text>January 22</Text>{addButton}
            <Text>January 23</Text>{addButton}<Text>January 24</Text>{addButton}<Text>January 25</Text>{addButton}<Text>January 26</Text>{addButton}
            <Text>January 27</Text>{addButton}<Text>January 28</Text>{addButton}<Text>January 29</Text>{addButton}<Text>January 30</Text>{addButton}
            <Text>January 31</Text>{addButton}</View>;
        const feb = <View><Text>February 1</Text>{addButton}<Text>February 2</Text>{addButton}
            <Text>February 3</Text>{addButton}<Text>February 4</Text>{addButton}<Text>February 5</Text>{addButton}<Text>February 6</Text>{addButton}
            <Text>February 7</Text>{addButton}<Text>February 8</Text>{addButton}<Text>February 9</Text>{addButton}<Text>February 10</Text>{addButton}
            <Text>February 11</Text>{addButton}<Text>February 12</Text>{addButton}<Text>February 13</Text>{addButton}<Text>February 14</Text>{addButton}
            <Text>February 15</Text>{addButton}<Text>February 16</Text>{addButton}<Text>February 17</Text>{addButton}<Text>February 18</Text>
            <Text>February 19</Text><Text>February 20</Text><Text>February 21</Text><Text>February 22</Text>
            <Text>February 23</Text><Text>February 24</Text><Text>February 25</Text><Text>February 26</Text>
            <Text>February 27</Text><Text>February 28</Text></View>;
        const mar = <View><Text>March 1</Text>{addButton}<Text>March 2</Text>{addButton}
            <Text>March 3</Text>{addButton}<Text>March 4</Text>{addButton}<Text>March 5</Text>{addButton}<Text>March 6</Text>
            <Text>March 7</Text><Text>March 8</Text><Text>March 9</Text><Text>March 10</Text>
            <Text>March 11</Text><Text>March 12</Text><Text>March 13</Text><Text>March 14</Text>
            <Text>March 15</Text><Text>March 16</Text><Text>March 17</Text><Text>March 18</Text>
            <Text>March 19</Text><Text>March 20</Text><Text>March 21</Text><Text>March 22</Text>
            <Text>March 23</Text><Text>March 24</Text><Text>March 25</Text><Text>March 26</Text>
            <Text>March 27</Text><Text>March 28</Text><Text>March 29</Text><Text>March 30</Text>
            <Text>March 31</Text></View>;
        const apr = <View><Text>April 1</Text><Text>April 2</Text>
            <Text>April 3</Text><Text>April 4</Text><Text>April 5</Text><Text>April 6</Text>
            <Text>April 7</Text><Text>April 8</Text><Text>April 9</Text><Text>April 10</Text>
            <Text>April 11</Text><Text>April 12</Text><Text>April 13</Text><Text>April 14</Text>
            <Text>April 15</Text><Text>April 16</Text><Text>April 17</Text><Text>April 18</Text>
            <Text>April 19</Text><Text>April 20</Text><Text>April 21</Text><Text>April 22</Text>
            <Text>April 23</Text><Text>April 24</Text><Text>April 25</Text><Text>April 26</Text>
            <Text>April 27</Text><Text>April 28</Text><Text>April 29</Text><Text>April 30</Text>
        </View>;
        const may = <View><Text>May 1</Text><Text>May 2</Text>
            <Text>May 3</Text><Text>May 4</Text><Text>May 5</Text><Text>May 6</Text>
            <Text>May 7</Text><Text>May 8</Text><Text>May 9</Text><Text>May 10</Text>{addButton}
            <Text>May 11</Text><Text>May 12</Text><Text>May 13</Text><Text>May 14</Text>
            <Text>May 15</Text><Text>May 16</Text><Text>May 17</Text><Text>May 18</Text>
            <Text>May 19</Text><Text>May 20</Text><Text>May 21</Text><Text>May 22</Text>
            <Text>May 23</Text><Text>May 24</Text><Text>May 25</Text><Text>May 26</Text>
            <Text>May 27</Text><Text>May 28</Text><Text>May 29</Text><Text>May 30</Text>
            <Text>May 31</Text></View>;
        const jun = <View><Text>June 1</Text><Text>June 2</Text>
            <Text>June 3</Text><Text>June 4</Text><Text>June 5</Text><Text>June 6</Text>
            <Text>June 7</Text><Text>June 8</Text><Text>June 9</Text><Text>June 10</Text>
            <Text>June 11</Text><Text>June 12</Text><Text>June 13</Text><Text>June 14</Text>
            <Text>June 15</Text><Text>June 16</Text><Text>June 17</Text><Text>June 18</Text>
            <Text>June 19</Text><Text>June 20</Text><Text>June 21</Text><Text>June 22</Text>
            <Text>June 23</Text><Text>June 24</Text><Text>June 25</Text><Text>June 26</Text>
            <Text>June 27</Text><Text>June 28</Text><Text>June 29</Text><Text>June 30</Text>
        </View>;
        const jul = <View><Text>July 1</Text><Text>July 2</Text>
            <Text>July 3</Text><Text>July 4</Text><Text>July 5</Text><Text>July 6</Text>
            <Text>July 7</Text><Text>July 8</Text><Text>July 9</Text><Text>July 10</Text>
            <Text>July 11</Text><Text>July 12</Text><Text>July 13</Text><Text>July 14</Text>
            <Text>July 15</Text><Text>July 16</Text><Text>July 17</Text><Text>July 18</Text>
            <Text>July 19</Text><Text>July 20</Text><Text>July 21</Text><Text>July 22</Text>
            <Text>July 23</Text><Text>July 24</Text><Text>July 25</Text><Text>July 26</Text>
            <Text>July 27</Text><Text>July 28</Text><Text>July 29</Text><Text>July 30</Text>
            <Text>July 31</Text></View>;
        const aug = <View><Text>August 1</Text><Text>August 2</Text>
            <Text>August 3</Text><Text>August 4</Text><Text>August 5</Text><Text>August 6</Text>
            <Text>August 7</Text><Text>August 8</Text><Text>August 9</Text><Text>August 10</Text>
            <Text>August 11</Text><Text>August 12</Text><Text>August 13</Text><Text>August 14</Text>
            <Text>August 15</Text><Text>August 16</Text><Text>August 17</Text><Text>August 18</Text>
            <Text>August 19</Text><Text>August 20</Text><Text>August 21</Text><Text>August 22</Text>
            <Text>August 23</Text><Text>August 24</Text><Text>August 25</Text><Text>August 26</Text>
            <Text>August 27</Text><Text>August 28</Text><Text>August 29</Text><Text>August 30</Text>
            <Text>August 31</Text></View>;
        const sep = <View><Text>September 1</Text><Text>September 2</Text>
            <Text>September 3</Text><Text>September 4</Text><Text>September 5</Text><Text>September 6</Text>
            <Text>September 7</Text><Text>September 8</Text><Text>September 9</Text><Text>September 10</Text>
            <Text>September 11</Text><Text>September 12</Text><Text>September 13</Text><Text>September 14</Text>
            <Text>September 15</Text><Text>September 16</Text><Text>September 17</Text><Text>September 18</Text>
            <Text>September 19</Text><Text>September 20</Text><Text>September 21</Text><Text>September 22</Text>
            <Text>September 23</Text><Text>September 24</Text><Text>September 25</Text><Text>September 26</Text>
            <Text>September 27</Text><Text>September 28</Text><Text>September 29</Text><Text>September 30</Text>
        </View>;
        const oct = <View><Text>October 1</Text><Text>October 2</Text>
            <Text>October 3</Text><Text>October 4</Text><Text>October 5</Text><Text>October 6</Text>
            <Text>October 7</Text><Text>October 8</Text><Text>October 9</Text><Text>October 10</Text>
            <Text>October 11</Text><Text>October 12</Text><Text>October 13</Text><Text>October 14</Text>
            <Text>October 15</Text><Text>October 16</Text><Text>October 17</Text><Text>October 18</Text>
            <Text>October 19</Text><Text>October 20</Text><Text>October 21</Text><Text>October 22</Text>
            <Text>October 23</Text><Text>October 24</Text><Text>October 25</Text><Text>October 26</Text>
            <Text>October 27</Text><Text>October 28</Text><Text>October 29</Text><Text>October 30</Text>
            <Text>October 31</Text></View>;
        const nov = <View><Text>November 1</Text><Text>November 2</Text>
            <Text>November 3</Text><Text>November 4</Text><Text>November 5</Text><Text>November 6</Text>
            <Text>November 7</Text><Text>November 8</Text><Text>November 9</Text><Text>November 10</Text>
            <Text>November 11</Text><Text>November 12</Text><Text>November 13</Text><Text>November 14</Text>
            <Text>November 15</Text><Text>November 16</Text><Text>November 17</Text><Text>November 18</Text>
            <Text>November 19</Text><Text>November 20</Text><Text>November 21</Text><Text>November 22</Text>
            <Text>November 23</Text><Text>November 24</Text><Text>November 25</Text><Text>November 26</Text>
            <Text>November 27</Text><Text>November 28</Text><Text>November 29</Text><Text>November 30</Text>
        </View>;
        const dec = <View><View><Text>December 1</Text></View><Text>December 2</Text>
            <Text>December 3</Text><Text>December 4</Text><Text>December 5</Text><Text>December 6</Text>
            <Text>December 7</Text><Text>December 8</Text><Text>December 9</Text><Text>December 10</Text>
            <Text>December 11</Text><Text>December 12</Text><Text>December 13</Text><Text>December 14</Text>
            <Text>December 15</Text><Text>December 16</Text><Text>December 17</Text><Text>December 18</Text>
            <Text>December 19</Text><Text>December 20</Text><Text>December 21</Text><Text>December 22</Text>
            <Text>December 23</Text><Text>December 24</Text><Text>December 25</Text><Text>December 26</Text>
            <Text>December 27</Text><Text>December 28</Text><Text>December 29</Text><Text>December 30</Text>
            <Text>December 31</Text></View>;
        if (this.props.id == "Jan") {
            dates = jan;
        }
        else if (this.props.id == "Feb") {
            dates = feb;
        }
        else if (this.props.id == "Mar") {
            dates = mar;
        }
        else if (this.props.id == "Apr") {
            dates = apr;
        }
        else if (this.props.id == "May") {
            dates = may;
        }
        else if (this.props.id == "Jun") {
            dates = jun;
        }
        else if (this.props.id == "Jul") {
            dates = jul;
        }
        else if (this.props.id == "Aug") {
            dates = aug;
        }
        else if (this.props.id == "Sep") {
            dates = sep;
        }
        else if (this.props.id == "Oct") {
            dates = oct;
        }
        else if (this.props.id == "Nov") {
            dates = nov;
        }
        else if (this.props.id == "Dec") {
            dates = dec;
        }
        return (<View>{dates}</View>);
    }
}
export default Agenda