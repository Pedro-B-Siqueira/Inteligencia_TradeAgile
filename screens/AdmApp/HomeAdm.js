import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeAdm = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {/* Parte Superior do Cabeçalho, do Voltar */}
        <View style={styles.headerBottom}>
          <TouchableOpacity
              style={styles.sairBtn}
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              <Icon name="arrow-back" size={24} color="#ffffff" style={styles.btnIrIcon_L} />
              <Text style={styles.sairBtnText}>Sair</Text>
            </TouchableOpacity>
        </View>

        {/* Cabeçalho */}
        <View style={styles.header}>

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
        <View style={styles.main}>

          <Text style={styles.apreBase}>Olá, <Text style={styles.apreAdm}>Administrador</Text></Text>

          <View style={styles.cardContainer}>

            {/* Card */}
            <View style={styles.cardOp}>
              <Text style={styles.cardText}>Adicione uma Inteligência Artificial</Text>
              <TouchableOpacity
                style={styles.cardBtn}
                onPress={() => {
                  navigation.navigate('CadastroIA');
                }}
              >
                <Text style={styles.cardBtnText}>Ir para as I.As</Text>
                <Icon name="arrow-forward" size={24} color="#ffffff" style={styles.btnIrIcon_R} />
              </TouchableOpacity>
            </View>

            {/* Card */}
            <View style={styles.cardOp}>
              <Text style={styles.cardText}>Adicione um Cliente ao Sistema</Text>
              <TouchableOpacity
                style={styles.cardBtn}
                onPress={() => {
                  navigation.navigate('CadastroClientes');
                }}
              >
                <Text style={styles.cardBtnText}>Ir aos Clientes</Text>
                <Icon name="arrow-forward" size={24} color="#ffffff" style={styles.btnIrIcon_R} />
              </TouchableOpacity>
            </View>

            {/* Card */}
            <View style={styles.cardOp}>
              <Text style={styles.cardText}>Adicione um Fornecedor ao Sistema</Text>
              <TouchableOpacity
                style={styles.cardBtn}
                onPress={() => {
                  navigation.navigate('CadastroFornecedores');
                }}
              >
                <Text style={styles.cardBtnText}>Ir aos Fornecedores</Text>
                <Icon name="arrow-forward" size={24} color="#ffffff" style={styles.btnIrIcon_R} />
              </TouchableOpacity>
            </View>

            {/* Card */}
            <View style={styles.cardOp}>
              <Text style={styles.cardText}>Verifique as Tabelas de Dados do Sistema</Text>
              <TouchableOpacity
                style={styles.cardBtn}
                onPress={() => {
                  navigation.navigate('Tabelas');
                }}
              >
                <Text style={styles.cardBtnText}>Ir as Tabelas</Text>
                <Icon name="arrow-forward" size={24} color="#ffffff" style={styles.btnIrIcon_R} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 60, // Espaço para garantir que o conteúdo não sobreponha o footer
  },
  header: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 8,
    paddingVertical: 10,
    width: "100%",
    marginTop: 20,
    marginBottom: 0,
  },
  headerTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerBottom: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sairBtn: {
    width: "25%",
    padding: 4,
    paddingTop: 48,
    backgroundColor: "#1E5E8B",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 0, // Arredonda o canto superior esquerdo
    borderTopRightRadius: 0, // Arredonda o canto superior direito
    borderBottomLeftRadius: 0, // Arredonda o canto inferior esquerdo
    borderBottomRightRadius: 12, // Mantém o canto inferior direito reto
  },
  sairBtnText: {
    fontSize: 24,
    color: "#ffffff",
    marginLeft: 8,
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
  main: {
    flex: 1, // Faz o conteúdo principal ocupar o espaço restante
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    paddingHorizontal: 10,
  },
  apreBase: {
    fontSize: 24,
    color: "#ffffff",
  },
  apreAdm: {
    fontSize: 32,
    color: "#FFDE59",
    fontWeight: "bold",
  },
  cardContainer: {
    flexDirection: "column",
    alignItems: 'center',
    width: "100%",
    paddingVertical: 12,
  },
  cardOp: {
    backgroundColor: 'trasparent',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%', // Ajuste a largura dos cards
  },
  cardText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardBtn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E5E8B',
    padding: 10,
    borderRadius: 10,
  },
  cardBtnText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
    marginRight: 8,
  },
  btnIrIcon_R: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
  },

});

export default HomeAdm;