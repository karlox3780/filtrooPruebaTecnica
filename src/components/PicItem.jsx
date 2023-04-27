import React from "react";
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const PicItem = (props) => {
    return (<View key={props.id} style={{ flex: 1, alignItems: 'center' }}>
        <ImageBackground source={{ uri: props.download_url }} style={styles.image} imageStyle={{ borderRadius: 10 }}>
            <View style={styles.picItemView}>
                <Text style={styles.picItemText}>{props.author}</Text>
            </View>
        </ImageBackground>

    </View>)
}
export default PicItem;

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 4,
        margin: 10
    },
    picItemView: {
        position: 'absolute',
        width: '100%',
        height: '30%',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    picItemText: {
        color: '#FFFFFF'
    }
});