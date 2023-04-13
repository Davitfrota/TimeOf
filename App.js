import { StatusBar } from 'expo-status-bar';
import React,{ useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { LinearGradient } from 'expo-linear-gradient';
import Contador from './Contador';

export default function App() {
  const [state,setState] = useState('select');
  const [seconds,setSeconds] = useState(0);
  const [minutes,setMinutes] = useState(1);

  const [alarmSound,setAlarmSound] = useState([
    
    {
      id:1,
      selected:true,
      name: 'Alarm 1',
      file: 'Alarm1.mp3'
    },
    {
      id:2,
      selected:false,
      name: 'Alarm 2',
      file: 'Alarm2.mp3',
    }
  ]);

    var numeros = [];
    for(var i=0; i<60; i++){
      numeros.push(i);
    }

    function setAlarm(id){

      let alarmTemp = alarmSound.map(function(val){
          if(id != val.id)
            val.selected = false;
          else
            val.selected = true;
          return val;
      })

      setAlarmSound(alarmTemp);
    }

    if( state == 'select'){
      return (
        <View style={styles.container}>
          <LinearGradient
            colors={['#3107e1', '#fa8072']}
            style={{
              position:'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '100%',
            }}>
          </LinearGradient>
          <Text style={{color:'white', fontSize:30}}>Choice a time:</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={{color:'white', paddingTop: 16}}>Min:</Text>
            <Picker
              style={{ height: 50, width: 80, color: 'black', backgroundColor: 'transparent', borderWidth: '0' }}
              selectedValue={minutes}
              onValueChange={(itemValue, itemIndex) => setMinutes(itemValue)}
            >
              {
                numeros.map(function(val){
                  return(<Picker.Item label={val.toString() + ' Minutes'} value={val.toString()} />)
                })
              }
              
            
            </Picker>
            <Text style={{color:'white', paddingTop: 16}}>Sec:</Text>
            <Picker
              style={{ height: 50, width: 80,color: 'black', backgroundColor: 'transparent', borderWidth: '0' }}
              selectedValue={seconds}
              onValueChange={(itemValue, itemIndex) => setSeconds(itemValue)}
            >
              <Picker.Item label='0' value='0' />
              {
                numeros.map(function(val){
                  return(<Picker.Item label={val.toString() + ' Seconds'} value={val.toString()} />)
                })
              }
            </Picker>
          </View>
          <View style={{flexDirection: 'row'}}>
            {
              alarmSound.map(function(val){
                if(val.selected){
                  return(
                  <TouchableOpacity onPress={()=>setAlarm(val.id)} style={styles.btnSelected}>
                    <Text style={{color:'white'}}>{val.name}</Text>
                  </TouchableOpacity>);}
                else{
                  return(
                    <TouchableOpacity onPress={()=>setAlarm(val.id)}  style={styles.btnChoice}>
                      <Text style={{color:'white'}}>{val.name}</Text>
                    </TouchableOpacity>);
                }
            })
            }

          </View>
            <TouchableOpacity onPress={() => setState('start')} style={styles.btnStart}><Text style={{textAlign:'center',paddingTop:30,color:'white',fontSize:20}}>Start</Text></TouchableOpacity>
        </View>
      );}
      else if (state == 'start'){
        return(
          <Contador setState={setState} minutes={minutes} seconds={seconds}></Contador>
          )
      }
            
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn:{
    color:'white', 
    fontSize:30
  },
  btnChoice:{
    textAlign: 'center',
    padding:8,
    margin:10,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 15,
  },
  btnSelected:{
    textAlign: 'center',
    padding:8,
    margin:10,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 15,
    opacity: 0.6
  },
  btnStart:{
    textAlign: 'center',
    width: 100,
    height: 100,
    marginTop:30,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
  }
});
