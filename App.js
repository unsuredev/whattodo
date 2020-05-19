import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  FlatList,
} from 'react-native';

import GoalItems from './components/goalList';
import GoalInput from './components/goalInput';

export default function App() {
  const [courseGoal, setCourseGoal] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    if (goalTitle.length === 0) {
      return alert('You have not written anything!');
    }
    setCourseGoal(currentGoal => [
      ...currentGoal,
      {id: Math.random().toString(), value: goalTitle},
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoal(currentGoal => {
      return currentGoal.filter(goal => goal.id !== goalId);
    });
  };
  const cancelGoalAditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />

      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAditionHandler}
      />

      <FlatList
        data={courseGoal}
        keyExtractor={(item, index) => item.id}
        renderItem={itemdata => (
          <GoalItems
            id={itemdata.item.id}
            onDelete={removeGoalHandler}
            title={itemdata.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
  },
});
