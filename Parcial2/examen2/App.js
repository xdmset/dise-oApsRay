
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import nflLogo from './assets/NFL_logo.png'; 

const url = 'https://jsonplaceholder.typicode.com/todos';


const MenuScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const displayTodos = (option) => {
    let filteredData;
    switch (option) {
      case 'Todos':
        filteredData = todos;
        break;
      case 'Todos (ID y Título)':
        filteredData = todos.map(todo => ({ id: todo.id, title: todo.title }));
        break;
      case 'Pendientes (ID y Título)':
        filteredData = todos.filter(todo => !todo.completed).map(todo => ({ id: todo.id, title: todo.title }));
        break;
      case 'Completados (ID y Título)':
        filteredData = todos.filter(todo => todo.completed).map(todo => ({ id: todo.id, title: todo.title }));
        break;
      case 'Todos (ID y Usuario)':
        filteredData = todos.map(todo => ({ id: todo.id, userId: todo.userId }));
        break;
      case 'Pendientes (ID y Usuario)':
        filteredData = todos.filter(todo => !todo.completed).map(todo => ({ id: todo.id, userId: todo.userId }));
        break;
      case 'Completados (ID y Usuario)':
        filteredData = todos.filter(todo => todo.completed).map(todo => ({ id: todo.id, userId: todo.userId }));
        break;
      default:
        filteredData = [];
    }

    navigation.navigate('TodoDetails', { todos: filteredData });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={nflLogo} style={styles.logo} resizeMode="contain" />
        {['Todos', 'Todos (ID y Título)', 'Pendientes (ID y Título)', 'Completados (ID y Título)', 'Todos (ID y Usuario)', 'Pendientes (ID y Usuario)', 'Completados (ID y Usuario)'].map(option => (
          <TouchableOpacity
            key={option}
            style={styles.optionButton}
            onPress={() => displayTodos(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Pantalla de Detalles de los Todos
const TodoDetailsScreen = ({ route }) => {
  const { todos } = route.params;

  return (
    <ScrollView style={styles.resultsContainer}>
      {todos.map((todo, index) => (
        <View key={todo.id.toString()} style={styles.tableRow}>
          <Text style={styles.tableCell}>{`ID: ${todo.id}`}</Text>
          {todo.title && <Text style={styles.tableCell}>{`Title: ${todo.title}`}</Text>}
          {todo.userId && <Text style={styles.tableCell}>{`User: ${todo.userId}`}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Pendientes NFL' }} />
        <Stack.Screen name="TodoDetails" component={TodoDetailsScreen} options={{ title: 'Detalles del Todo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '100%',
    height: 200, 
    marginBottom: 20,
  },
  optionButton: {
    width: '90%',
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultsContainer: {
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
  },
});

export default App;
