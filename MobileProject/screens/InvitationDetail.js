import React from 'react';
import MapComponent from './../components/MapComponent';
import { View, Text, StyleSheet, Button } from 'react-native';
import Card from './../components/Card.js';


export default class InvitationDetail extends React.Component {
    
    static navigationOptions = {
        title: 'Event',
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>

                <Card id="button"
                width={(300)}
                height={(500)}
                content={this.props.navigation.state.params.cardInfo}
                source={{ uri:this.props.navigation.state.params.picture }}
                title={this.props.navigation.state.params.name}
                imageWidth={75}
                imageHeight={75}
                roundedImage={true}
                roundedImageValue={50}
                imageMargin={{ top: 10 }}
                >
                 </Card>

                </View>
                <View style={styles.bottom}>
                    <MapComponent />
                </View>
             </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    bottom: {
        flex:2,
    }
});