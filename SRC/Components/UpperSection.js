import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Dimensions} from "react-native";
import { SearchBar, Icon } from 'react-native-elements';

export default class UpperSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: ''                  
      };
}
  updateSearch = search => {
    this.setState({ search });
  };
  render() {
    const { search } = this.state;
    return (
        <View style={styles.Container}>
          <Image source={require("../Images/nasnavlogo.png")} style={styles.imageStyle} resizeMode='center'/>
          <View style={styles.bottomContainer}>
          <SearchBar
            containerStyle={styles.searchBar}
            inputContainerStyle={{backgroundColor:"white", borderRadius:10}}
            placeholder="I am looking for..."
            placeholderTextColor ='#D2D2D2'
            onChangeText={this.updateSearch}
            value={search}
            lightTheme
          />
          <TouchableOpacity style={styles.locationButton}>
            <Icon name="my-location" size={25} type="material" color="grey"/>
          </TouchableOpacity>
        </View>
      </View>
    );
    }
  }


const styles = StyleSheet.create({
  Container:{
    position:'absolute',
    flexDirection: 'column',
    alignItems:'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 10,
    height: 120,
    paddingTop: 50,
  },
  searchBar:{
    flex:5,
    backgroundColor:"transparent",
    borderTopColor:'transparent',
    borderBottomColor:'transparent',
    justifyContent:'center',
  },
  locationButton:{
    maxHeight:50,
    flex:1,
    marginRight:30,
    backgroundColor:'white',
    borderRadius:10,
    justifyContent: 'center',
    alignItems:'center'
  },
  imageStyle:{
    marginLeft:10,
    marginBottom:10,
    width:80,
    height:20
  },
  bottomContainer:{
    flexDirection:"row",
    flex:1,
    minWidth: Dimensions.get('window').width
  }
})