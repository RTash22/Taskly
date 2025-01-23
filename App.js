import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from './supabase';
import { useState, useEffect } from 'react';

export default function App() {
  const [connectionStatus, setConnectionStatus] = useState('Checking connection...');

  useEffect(() => {
    async function checkConnection() {
      try {
        // Test query to check connection
        const { data, error } = await supabase
          .from('users') // Replace with an actual table from your database
          .select('*')
          .limit(1);

        if (error) {
          setConnectionStatus('Connection error: ' + error.message);
        } else {
          setConnectionStatus('Successfully connected to Supabase!');
        }
      } catch (error) {
        setConnectionStatus('Connection failed: ' + error.message);
      }
    }

    checkConnection();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{connectionStatus}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
