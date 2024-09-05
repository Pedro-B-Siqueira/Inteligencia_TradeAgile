import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TelaProdutos from './TelaProdutosCode'

const LaddingPage = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.espacoAcima} >
          <Text style={styles.invTextAcima} 
            onPress={() => {
              navigation.navigate('peg');
            }}
          >_____</Text>
        </TouchableOpacity>
        <View style={styles.headerTop}>
          <Image source={require('../_imagens/logo_tradeagile.png')} style={styles.logo} />
          <View style={styles.inttrade}>
            <Image source={require('../_imagens/favicon_inteligenciatradeagile.png')} style={styles.favicon} />
            <Text style={styles.intText}>Inteligência</Text>
            <Text style={styles.tradeText}>Trade.Agile</Text>
          </View>
        </View>
      </View>

      {/* Conteúdo principal */}
      <View contentContainerStyle={styles.main}>
        <TelaProdutos/>
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.contateNos} onPress={() => {navigation.navigate('ContateNos');} } >
          <Text style={styles.contateNosText} 
          >Fale Conosco</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>&copy; 2024 Inteligência Trade.Agile. Todos os direitos reservados.</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Ajusta para que o footer fique na parte inferior
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E5E8B',
    padding: 8,
    paddingVertical: 10,
    width: "100%",
  },
  headerTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  espacoAcima: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invTextAcima: {
    fontSize: 32,
    color: "#ffffff",
    opacity: 0,
  },
  logo: {
    height: 80,
    width: 128,
  },
  favicon: {
    height: 42,
    width: 60,
  },
  inttrade: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },
  intText: {
    fontSize: 20,
    color: "#ffffff",
  },
  tradeText: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: "100%",
    padding: 2,
    
  },
  footerText: {
    color: '#ffffff',
    width: "100%",
    backgroundColor: '#1E5E8B',
    textAlign: "center",
    paddingVertical: 10,
  },
  contateNos: {
    width: "50%",
    backgroundColor: '#FFDE59',
    alignItems: 'center',
    padding: 6,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  contateNosText: {
    fontSize: 24,
    color: "#000000",
    fontWeight: "bold",
  },
  main: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 60, // Espaço extra para garantir que o footer não sobreponha o conteúdo
  },
});

export default LaddingPage;