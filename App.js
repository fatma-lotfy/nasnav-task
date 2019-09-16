import React from 'react';
import MapView from 'react-native-maps';
import TabNavigator from './SRC/Routing/TabNavigator';

export default class App extends React.Component {
  render() {
    return (
      <TabNavigator/>
    );
  }
}