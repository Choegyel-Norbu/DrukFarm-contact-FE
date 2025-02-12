import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {dummyArray} from './DummyArray';
import axios from 'axios';

export default function ListingFlatList() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [inputData, setInputData] = useState('');

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const listArray = dummyArray();

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(response => {
        setData(response.data);
        setloading(false);
      })
      .catch(error => {
        console.error(error);
        setloading(false);
      });
    console.log('This is datas retrived form api ' + data);
  }, [loading]);

  const renderJsonData = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{item.id}</Text>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.body}</Text>
      </View>
    );
  };

  const handlePress = () => {
    try {
      const response = axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title,
          body,
          id: 9,
        },
      );
      setloading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <Text style={styles.header}>Post</Text>
      <View style={styles.itemContainer}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Enter name ...."
            placeholderTextColor="#aaa"
            value={title}
            onChangeText={setTitle}
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter description ..."
            placeholderTextColor="#aaa"
            value={body}
            onChangeText={setBody}
            keyboardType="default"
          />
          <Pressable style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderJsonData}
          contentContainerStyle={styles.listContainer}
          style={styles.flatList}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  button: {
    backgroundColor: '#4d79ff',
    padding: 15,
    borderRadius: 8,
  },
  pressedButton: {
    backgroundColor: '#3700b3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
