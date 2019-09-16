import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomePage from '../Components/HomePage'
import Account from '../Components/Account'
import Explore from '../Components/Explore'
import More from '../Components/More'
import {Icon} from 'react-native-elements'

const navigatorConfig = {
  tabBarOptions :{
    activeTintColor :'#6C36BF',
    inactiveTintColor :'#A7A7A7'
  }
}

const tabNavigator = createBottomTabNavigator({
  Home : {
    screen:HomePage,
    navigationOptions :{
      title : 'Home',
    tabBarIcon:({focused, tintColor})=>{ return <Icon name='home' size ={30} type='material' color={focused? tintColor:'#A7A7A7'}/> }
    }
  },
  Explore : {
    screen:Explore,
    navigationOptions :{
      title : 'Explore',
      tabBarIcon: ({focused,tintColor})=>{return <Icon name='explore' size ={30} type='material' color= {focused ?tintColor:'#A7A7A7'}/>}
    }
  },
  Account :{
    screen:Account,
    navigationOptions :{
      title : 'Account',
      tabBarIcon: ({focused,tintColor})=>{return <Icon name='account-circle' size ={30} type='material' color= {focused ?tintColor:'#A7A7A7'}/>}
    }
  },
  More :{
    screen:More,
    navigationOptions :{
      title : 'More',
      tabBarIcon: ({focused,tintColor})=>{return <Icon name='more-horiz' size ={30} type='material' color= {focused ?tintColor:'#A7A7A7'}/>}
    }
  }
},navigatorConfig);
export default createAppContainer(tabNavigator);