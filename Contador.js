import { StatusBar } from 'expo-status-bar';
import React,{ useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function Contador(props) {

    var done = false;



    return(
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LinearGradient
          colors={['#3107e1', '#fa8072']}
          style={{
            position:'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}/>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.textCont}>{props.minutes} :</Text>
            <Text style={styles.textCont}> {props.seconds}</Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => props.setState('select')} style={styles.btnReturn}><Text style={{textAlign:'center',paddingTop:30,color:'white',fontSize:20}}>Return</Text></TouchableOpacity>
          </View>
          
      </View>
    )
            
}


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCont:{
    color: 'white',
    fontSize: 40,
  },
  btnReturn: {
    textAlign: 'center',
    width: 100,
    height: 100,
    marginTop:30,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
  }

});
