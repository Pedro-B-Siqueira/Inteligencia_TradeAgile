// ff#fg63.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ff3fg63 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
          style={styles.btnVoltarHome} 
          onPress={() => {
            navigation.navigate('Ladding');
          }}>
          <Text style={styles.btnVoltarHomeText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.texto}>Sou eu que conserto os problemas aqui, {"\n"} to só descansando</Text>
      <Image source={require('./p0b3b3.png')} style={styles.imagem} />
      <Text style={styles.ojogo}>O Jogo 👍</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  btnVoltarHome: {
    backgroundColor: '#1E5E8B',
    padding: 12,
    borderRadius: 8,
    marginBottom: 72,
  },
  btnVoltarHomeText: {
    fontSize: 24,
    color: '#ffffff',
  },
  texto: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#000000',
    textAlign: "center",
  },
  ojogo: {
    fontSize: 32 ,
    fontWeight: "bold",
    color: '#000000',
    textAlign: "center",
  },
  imagem: {
    width: 400,
    height: 400,
  },
});

export default ff3fg63;