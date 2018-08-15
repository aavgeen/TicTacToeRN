import React, { Component } from 'react';
import {View, TouchableNativeFeedback, StyleSheet, Text} from 'react-native';

export default class cell extends Component {
  render() {
    return (
      
           <TouchableNativeFeedback title={this.props.title} style={{marginLeft:50}} onPress={() => this.props.onPress(this.props.value)}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttontext}>{this.props.title}</Text>
                </View>
           </TouchableNativeFeedback>
      
    )
  }
}

const styles = StyleSheet.create({
    buttonContainer:{
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: '#00AF89',
        margin: 3
    },
    buttontext: {
        color: 'white',
        alignContent: 'center',
        fontSize:50
    }
});
