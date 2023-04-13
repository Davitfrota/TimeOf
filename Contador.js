import { StatusBar } from 'expo-status-bar';
import React,{ useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';


export default function Contador(props) {

    var done = false;

    const countSound =  require('./assets/count.mp3');
 
    useEffect(()=>{

      const timer = setInterval(()=>{
        PlayCountSound();
        props.setSeconds(props.seconds-1);

        if(props.seconds <= 0){
            if(props.minutes > 0){
                props.setMinutes(props.minutes -1);
                props.setSeconds(59);
            }
            else{
              if(!done){
                done = true;
                props.setState('select');
                props.setMinutes(0);
                props.setSeconds(1);
                PlaySound();
              }
            }
        }

      },1000)

      return () => clearInterval(timer);

    })


 function reset(){
      props.setState('select');
      props.setMinutes(1);
      props.setSeconds(0);
    }

  function formatNumber(number){
      var FinalNumber = "";
      if(number < 10){
          FinalNumber = "0" + number;
      }else{
          FinalNumber = number;
      }
      return FinalNumber;
      
  }
  async function PlaySound(){
    const soundObject = new Audio.Sound();
      try{
        var alarm;
        props.alarms.map(function(val){
            if(val.selected){
              alarm = val.file;
            }
        })
        await soundObject.loadAsync(alarm);
        await soundObject.playAsync();
      }catch(error){

      }
  }
  
  async function PlayCountSound(){
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(countSound);
    await soundObject.playAsync();
  }

var seconds = formatNumber(props.seconds);
var minutes = formatNumber(props.minutes);

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
            <Text style={styles.textCont}>{minutes} : </Text>
            <Text style={styles.textCont}>{seconds}</Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => reset()} style={styles.btnReturn}><Text style={{textAlign:'center',paddingTop:30,color:'white',fontSize:20}}>Return</Text></TouchableOpacity>
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
