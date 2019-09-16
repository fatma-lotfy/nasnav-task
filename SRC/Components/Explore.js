import React, { Component } from 'react';
import {View,StyleSheet} from 'react-native';
import UpperSection from './UpperSection';
import MyMapView from './MyMapView';

export default class Explore extends Component {
  render() {
    return (
      <View>
        <MyMapView/>
        <UpperSection/>
      </View>
    );
  }
}