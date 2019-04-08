import React from 'react';
import { MapView, Location, Permissions } from 'expo';
import { View, Text, StyleSheet, Button } from 'react-native';


export default class InviteMap extends React.Component {

    state = {
        locationGranted: false,
        userLocation: null,
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
                {
                    locationGranted: true,
                    userLocation: location,
                    isLoaded: true
                }
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
                        latitudeDelta: 3.3 * (Math.abs(Math.abs(this.state.userLocation.coords.latitude) - Math.abs(38.025475))),
                        longitudeDelta: 3.3 * (Math.abs(Math.abs(this.state.userLocation.coords.longitude) - Math.abs(-78.521713))),
                    }}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: this.props.lat,
                            longitude: this.props.long
                        }
                        }
                        title="My Marker"
                        description="Some description"
                    />
                </MapView>
            )
        }
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
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
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});