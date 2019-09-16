import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay'
import Modal from "react-native-modal";
import {Surface} from 'react-native-paper'

export default class MyMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        markers :[],
        loading :false ,
        error :'',
        modalView:false,
        selectedMarker:{},
        markerDataLoading:false,
        selectedMarkerProducts:[]
    };
  }
  componentDidMount(){
    this.setState({loading:true});
    axios.get('https://backend.nasnav.com/navbox/shops?org_id=11').then(Response=>
    {
      this.setState({loading:false})
      this.setState({markers:Response.data})
    }).catch(err => this.setState({ error: err, loading: false }))
  }

  _getMarkerData=()=>{
    this.setState({markerDataLoading: true})
    this.setState({selectedMarkerProducts:[]})
    axios.get('https://backend.nasnav.com/navbox/products?org_id=11&name=dior').then(Response=>
    {
      this.setState({selectedMarkerProducts:Response.data.products})
      this.setState({markerDataLoading:false});
    }).catch(err=> this.setState({error:err}))
  }

  render() {
    const mapStyle = [
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": 36
              },
              {
                  "color": "#333333"
              },
              {
                  "lightness": 40
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#fefefe"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#fefefe"
              },
              {
                  "lightness": 17
              },
              {
                  "weight": 1.2
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f5f5f5"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#d5d5d5"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#7574c0"
              },
              {
                  "saturation": "-37"
              },
              {
                  "lightness": "75"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f5f5f5"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "featureType": "poi.business",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#7574c0"
              },
              {
                  "saturation": "-2"
              },
              {
                  "lightness": "53"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#dedede"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#7574c0"
              },
              {
                  "lightness": "69"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#7574c0"
              },
              {
                  "lightness": "25"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 29
              },
              {
                  "weight": 0.2
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "lightness": "38"
              },
              {
                  "color": "#000000"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 18
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f2f2f2"
              },
              {
                  "lightness": 19
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#e9e9e9"
              },
              {
                  "lightness": 17
              }
          ]
      }
  ]
    return (
         <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width}}>
          <MapView
             customMapStyle={mapStyle} 
             style={{flex: 1}}
             initialRegion={{
                  latitude: 30.466091,
                  longitude: 30.809355,
                  latitudeDelta: 2.2,
                  longitudeDelta: 2.2,
              }}
              >
                {this.state.markers.map(marker =>(
                  <Marker 
                  key={marker.id}
                  coordinate={{
                    latitude : parseFloat(marker.address.lat),
                    longitude: parseFloat(marker.address.lng)
                  }}
                  title={marker.name}
                  description={marker.address.street}
                  image={require('../Images/T-Shirt.png')}
                  onPress={()=>{
                    this.setState({selectedMarker:marker})
                    this._getMarkerData()
                    this.setState({modalView: true});
                  }
                  }/>
                ))}
          </MapView>
          
          <Modal
            style={styles.modal}
            isVisible={this.state.modalView}
            onBackdropPress={() => this.setState({ modalView: false })}
            backdropOpacity={0.1}
          >
            <View style={styles.upperSection}>
              <View style={styles.titleSection}>
                <Image source={require("../Images/Fortune.png")} style={styles.Logo}/>
                <Text style={styles.markerName}>{this.state.selectedMarker.name}</Text>
              </View>
              <View style={styles.titleSection}>
                <TouchableOpacity>
                  <Image 
                  source={require('../../assets/360View.jpg')}
                  defaultSource={require('../../assets/360View.jpg')}
                  style={styles.buttonImageStyle}
                  resizeMode="contain"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.GotoShopButton}>
                  <Text style={styles.buttonText}>Go to shop</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView 
            horizontal={true} 
            contentContainerStyle={styles.scrollView}>
              {this.state.selectedMarkerProducts.length> 0 && this.state.selectedMarkerProducts.map(product=>{
                return(
                  <Surface style={styles.productCard} key={product.id}>
                    <Text style={styles.productTitle}>{product.name}</Text>
                    <Image 
                    source={product.image_url? {uri:product.image_url}: require('../../assets/product_placeholder.png')} 
                    style={styles.productImage}
                    defaultSource={require('../../assets/product_placeholder.png')}
                    resizeMode="cover"
                    />
                  </Surface>
              )})}
            </ScrollView>
            
            <Text style={{textAlign:'center', fontSize:32, fontWeight:'800'}}>{this.state.markerId}</Text>
            
            <Spinner 
              visible={this.state.markerDataLoading}
            />
          </Modal>
          <Spinner 
          visible={this.state.loading}
          textStyle={styles.spinnerTextStyle}
          textContent="Getting locations ... "
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  modal :{
    height:(Dimensions.get('window').height)*0.45,
    minWidth: Dimensions.get('window').width,
    marginBottom:-10,
    marginHorizontal:0,
    position:'absolute', 
    bottom:0,
    left:0,
    right:0,
    borderRadius:20,
    backgroundColor:'white',  
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  upperSection:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:20,
    alignItems:'flex-start',
    maxHeight:100,
  },
  titleSection:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'flex-start',
    paddingVertical: 10,
  },
  scrollView:{
    paddingHorizontal:12,
    marginVertical:2,
    paddingVertical:8
  },
  productCard:{
    flexDirection:'column',
    width:120,
    height:150,
    marginHorizontal:10,
    backgroundColor:'white',
    borderRadius:10,
    overflow:'hidden',
    justifyContent:'center',
    alignItems:'center',
    elevation:8,
  },
  Logo :{
    width:150,
    height:50
  },
  buttonImageStyle:{
    width:100,
    height:40,
  },
  GotoShopButton:{
    borderRadius:50,
    height:30,
    width:83,
    backgroundColor:'white',
    borderColor:'#6C36BF',
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10
  },
  buttonText:{
    color:'#6C36BF',
    fontSize:12,
    fontWeight:'400'
  },
  markerName:{
    fontSize:16,
    fontWeight:"800",
    paddingLeft:12
  },
  productTitle:{
    fontSize:10,
    fontWeight:'600',
    textAlign:"center",
    maxHeight:25,
    marginVertical:5
  },
  productImage:{
    width:80,
    height:120
  }
})