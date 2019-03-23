import React from 'react';
import { MapView, Location, Permissions } from 'expo';
import { View, Text, StyleSheet, Button } from 'react-native';


export default class InvitationDetail extends React.Component {
    
    state = {
        locationGranted:false,
        userLocation:null,
    };

    componentDidMount() {
        this.getLocationAsync();
    }
    
    //get location of the user
    async getLocationAsync() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState(previousState => (
                { locationGranted: false }
            ));
        } else {
            let location = await Location.getCurrentPositionAsync({});
            this.setState(previousState => (
                { locationGranted: true,
                  userLocation:location,
                isLoaded: true }
            ));        
        }
        
    }


    renderMap() {
        if (this.state.isLoaded) {
            return (
                <MapView
                    showsUserLocation
                    followsUserLocation
                    style={styles.map}
                    initialRegion={{
                        latitude: this.state.userLocation.coords.latitude,
                        longitude: this.state.userLocation.coords.longitude,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                    }}
                >
                    {/* <MapView.Marker
                        coordinate={this.state.userLocation.coords}
                        title="My Marker"
                        description="Some description"
                    /> */}
                </MapView>
            )
        }
        return (
            <Text style={styles.container}>Loading...</Text>
        )
    }



    render() {
        return (
            this.renderMap()
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    },
    map: {
    ...StyleSheet.absoluteFillObject
    }
});