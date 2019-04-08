import React from 'react';
import MapComponent from './../components/MapComponent';
import { View, Text, StyleSheet, Button } from 'react-native';


export default class InvitationDetail extends React.Component {
    
    static navigationOptions = {
        title: 'Event',
    };

    render() {
        return (
             <MapComponent />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});