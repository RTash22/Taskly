import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text, Platform } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from './supabase';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Platform.select({
      ios: '1005016024229-7rpo31cqmcou64cmg524qglkvodihnud.apps.googleusercontent.com',
      android: '1005016024229-s49aueoqooulm7n9esj2gek8h4mdtsie.apps.googleusercontent.com',
      web: '1005016024229-usf8pqqakhoq6f09obetbv2kvf9b6p92.apps.googleusercontent.com',
    }),
    redirectUri: Platform.select({
      web: 'http://localhost:19006',
      ios: 'com.rtash22.taskly30://',
      android: 'com.rtash22.taskly30://'
    })
  });

  const getUserToken = async () => {
    const session = supabase.auth.session(); // Get current session

    if (session) {
      console.log('Token ID:', session.access_token);  // Print token to terminal
    } else {
      console.log('No user is logged in');
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      getUserToken();
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      getUserToken();
    });
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      signInWithGoogle(id_token);
    }
  }, [response]);

  const signInWithGoogle = async (token) => {
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token,
      });
      
      if (error) throw error;
      setUser(data.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {!user ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => promptAsync()}
        />
      ) : (
        <View>
          <Text>Welcome, {user.email}</Text>
          <Button 
            title="Sign Out" 
            onPress={() => supabase.auth.signOut()} 
          />
        </View>
      )}
      {error && <Text style={styles.error}>Error: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    marginTop: 20,
  }
});
