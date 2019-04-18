import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Picker, 
    TouchableOpacity, Image, TextInput } from 'react-native';
import InviteMap from './../components/InviteMap';
import { MapView, Location, Permissions } from 'expo';
import Geocoder from 'react-native-geocoding';
import { googleMap } from 'react-native-dotenv'



const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
    "11", "12", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", 
    "21", "22", "23"];

const minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", 
"11","12","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24",
"25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41",
"42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58",
"59"];

export default class CreateEvent extends React.Component {
    static navigationOptions = {
        title: 'Create Event',
    };

    constructor(props) {
        super(props);
        this.state = { minute:"",second:"", address:"", lat:0, long:0 };
    }

    handleTextChange (text) {
        this.setState({
            ...this.state,
            address: text
        });
        Geocoder.from(this.state.address)
            .then(json => {
                var location = json.results[0].geometry.location;
                // console.log(location);
                this.setState({
                    ...this.state,
                    location:location
                });
                this.setState({
                    ...this.state,
                    lat: this.state.location.lat,
                    long: this.state.location.lng
                })
                
            })
            .catch(error => console.warn(error));
        
        // console.log(this.state);
        
    }

    componentDidMount () {
        Geocoder.init(googleMap);
    }

    getCurrentLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        // console.log(status);
        if (status == 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            // console.log(location);
            this.setState({
                ...this.state,
                lat: location.coords.latitude,
                long: location.coords.longitude,
            });
            Geocoder.from(this.state.lat, this.state.long)
            .then(json => {
                var addressComponent = json.results[0].formatted_address;
                // console.log(addressComponent);
                this.setState({
                    ...this.state,
                    address: addressComponent
                })
            })
            .catch(error => console.warn(error));
        }
    }

    toInvitePage () {
        this.props.navigation.push('InviteScreen', { address: this.state.address, hours: this.state.minute, mins: this.state.second});
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.timer}>
                    <View style={styles.minute}>
                        <Picker
                            style={styles.picker}
                            itemStyle ={styles.itemStyle}
                            selectedValue={this.state.minute}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ 
                                    ...this.state,
                                    minute: itemValue })
                            }
                            }>
                                {hours.map((opt, i) => (
                                    <Picker.Item label={opt} value={opt} />
                                ))}
                        </Picker>
                    </View>
                    <View style={styles.colon}>
                        <View style={{
                            flex: 1, 
                            alignItems: 'center',
                            justifyContent: 'center',}}>
                            
                            <Text style={{ fontSize: 30, }}>.</Text>

                        </View>
                        <View style={{
                            flex: 1, 
                            alignItems: 'center',
                            justifyContent: 'center',}}>
                            
                            <Text style={{ fontSize: 30,}}>.</Text>

                        </View>
                    </View>
                    <View style={styles.second}>
                        <Picker
                            style={styles.picker}
                            itemStyle={styles.itemStyle}
                            selectedValue={this.state.second}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({
                                    ...this.state,
                                    second: itemValue
                                })
                                // console.log(this.state);
                            }
                            }>
                            {minutes.map((opt, i) => (
                                <Picker.Item label={opt} value={opt} />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View style={styles.search}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.handleTextChange(text)}
                        placeholder="Enter an address..."
                        value={this.state.address}
                        placeholderTextColor = {
                            '#dedfe0'
                        }
                    />
                    < TouchableOpacity
                        style={
                            styles.locationButton
                        }
                        onPress={
                            this.getCurrentLocation
                        } >
                        <Image
                            style={
                                styles.locationImage
                            }
                            source={require("../assets/Sliced/locationIcon.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.map}>
                        <InviteMap lat={this.state.lat} long={this.state.long} />
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
                            source={require("../assets/Sliced/invite-btn.png")}
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
    timer: {
        flex: 2,
        flexDirection: 'row',
    },
    search: {
        flex: 1,
        flexDirection: 'row',
    },
    map: {
        flex: 5,
    },
    minute: {
        flex:10,
        backgroundColor: '#afebff'
    },
    second: {
        flex: 10,
        backgroundColor: '#afebff'
    },
    colon: {
        flex: 1,
    },
    picker: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    itemStyle: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textInput: { 
        flex:7, 
        borderColor: 'black', 
        borderWidth: 1,
        backgroundColor: 'white',
        fontSize:35,
    },
    SendButton: {
        resizeMode: 'contain',
    },
    SendImage: {
        width: "100%",
        height: "100%"
    },
    sendInvitation: {
        flex:1,
        bottom: 0,
    },
    locationButton: {
        flex:1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
    }
});
