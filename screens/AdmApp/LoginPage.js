import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

const LoginPage = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simula a Autentaicação de uma Adm
    const validUsername = 'MestreADM';
    const validPassword = 'senhaforte123';

    if (username === validUsername && password === validPassword) {
      navigation.navigate('HomeAdm');
    } else {
      Alert.alert('Erro', 'Nome de usuário ou senha inválidos');
    }
  };

  // Função para autenticação biométrica
  const handleBiometricLogin = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        alert('Seu dispositivo não suporta autenticação biométrica.');
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        alert('Nenhuma biometria configurada. Configure sua biometria nas configurações do dispositivo.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autentique-se para continuar',
        fallbackLabel: 'Usar senha',
      });

      if (result.success) {
        alert('Autenticação bem-sucedida!');
        navigation.navigate('HomeAdm');
      } else {
        alert('Falha na autenticação!');
      }
    } catch (error) {
      console.error('Erro ao tentar autenticação biométrica', error);
      alert('Ocorreu um erro ao tentar autenticação biométrica.');
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Conteúdo principal */}
      <View style={styles.main}>
        <Text style={styles.title}>Bem-Vindo a {'\n'} Inteligencia Trade.Agile</Text>
        <Text style={styles.title2}>Entre na sua conta de {'\n'} 
          <Text style={styles.titleAdm}>Administrador</Text>
        </Text>
        <Image
          source={require('../_imagens/logo_tradeagile.png')}
          style={styles.image}
        />
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#fff"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#fff"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBiometric]} onPress={handleBiometricLogin}>
          <Text style={styles.buttonText}>Login com biometria</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000000',
  },
  main: {
    flex: 1, // Faz o conteúdo principal ocupar o espaço restante
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    paddingHorizontal: 10,
    paddingBottom: 10, // Espaço para garantir que o conteúdo não sobreponha o footer
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  title2: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  titleAdm: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#FFDE59',
    textAlign: 'center',
  },
  image: {
    height: 175.50,
    width: 281,
    marginTop: 20,
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: '#1E5E8B',
    padding: 8,
    borderRadius: 10,
    margin: 10,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginPage;