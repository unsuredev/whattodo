import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Button, Modal} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const GoalInput = props => {
  const [enteredGoal, setEnteredGoal] = useState('');           

  const goalInputHandler = async enteredText => {
    try{
    await AsyncStorage.setItem('enteredText', enteredText);
    setEnteredGoal(enteredText);
  } catch (error) {
    // Error retrieving 
    console.log(error);
  }
    }


    useEffect(()=>
    {
      addGoalHandler()
    } ,[])
  const addGoalHandler = async () => {
    let  enteredGoal = ''
    try{
      enteredGoal = await AsyncStorage.getItem('enteredText') || 'none';
      props.onAddGoal(enteredGoal);
      //  setEnteredGoal('');
    }
    catch(error){
      console.log(error)
    }
 
  };


  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Today's Goals "
          value={enteredGoal}
          style={styles.input}
          onChangeText={goalInputHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="CANCEL" onPress={props.onCancel} color="red" />
          </View>
          <View style={styles.button}>
            <Button title="ADD" onPress={addGoalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    width: '40%',
  },
})