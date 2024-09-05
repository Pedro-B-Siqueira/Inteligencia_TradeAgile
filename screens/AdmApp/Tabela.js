import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

// Componente principal Tabelas
const Tabelas = ({ navigation }) => {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  // Função para buscar os dados do AsyncStorage
  const fetchData = async () => {
    try {
      const clientesData = await AsyncStorage.getItem('Clientes');
      const produtosData = await AsyncStorage.getItem('products');
      const fornecedoresData = await AsyncStorage.getItem('Fornecedores');

      setClientes(clientesData ? JSON.parse(clientesData) : []);
      setProdutos(produtosData ? JSON.parse(produtosData) : []);
      setFornecedores(fornecedoresData ? JSON.parse(fornecedoresData) : []);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Função para excluir um item da lista
  const handleDelete = async (type, index) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Realmente deseja excluir: \nItem = ${index} | Tipo = ${type} \n?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: async () => {
            let updatedData = [];
            if (type === 'Clientes') {
              updatedData = [...clientes];
              updatedData.splice(index, 1);
              setClientes(updatedData);
              await AsyncStorage.setItem('Clientes', JSON.stringify(updatedData));
            } else if (type === 'Produtos') {
              updatedData = [...produtos];
              updatedData.splice(index, 1);
              setProdutos(updatedData);
              await AsyncStorage.setItem('products', JSON.stringify(updatedData));
            } else if (type === 'Fornecedores') {
              updatedData = [...fornecedores];
              updatedData.splice(index, 1);
              setFornecedores(updatedData);
              await AsyncStorage.setItem('Fornecedores', JSON.stringify(updatedData));
            }
          }
        }
      ]
    );
  };

  // Função para renderizar tabelas
  const renderTable = (data, headers, keyExtractor, type) => {
    return (
      <View style={styles.table}>
        <View style={styles.tableRow}>
          {headers.map((header, index) => (
            <View key={index} style={[styles.tableHeader, { flex: 1 }]}>
              <Text style={styles.headerText}>{header}</Text>
            </View>
          ))}
        </View>
        {data.length > 0 ? (
          data.map((item, index) => (
            <View key={index} style={styles.rowContainer}>
              <View style={styles.tableRow}>
                {keyExtractor(item).map((value, i) => (
                  <View key={i} style={[styles.tableCell, { flex: 1 }]}>
                    <Text style={styles.cellText}>{value}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(type, index)}
              >
                <Text style={styles.buttonText}>Deletar <MaterialIcons name="delete" size={16} color="white" /></Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>Nenhum dado registrado.</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Parte Inferior do Cabeçalho, do Voltar */}
      <View style={styles.headerBottom}>
        <TouchableOpacity
          style={styles.sairBtn}
          onPress={() => {
            navigation.navigate('HomeAdm');
          }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#ffffff" style={styles.btnIrIcon_L} />
          <Text style={styles.sairBtnText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo do aplicativo */}
        <Image source={require('../_imagens/logo_tradeagile.png')} style={styles.logo} />

        {/* Adiciona um Titulo */}
        <Text style={styles.titH1}>Nossos Dados</Text>

        {/* Renderiza tabelas para clientes, produtos e fornecedores */}
        <Text style={styles.title}>Inteligências Artificiais</Text>
        {renderTable(produtos, ['Nome da I.A.', 'Preço', 'Personalizações Disponíveis'], (item) => [
          item.name,
          `R$ ${item.price.toFixed(2)}`,
          item.customizations.map((cust, i) => (
            <Text key={i}>
              {cust.option}: R$ {cust.price.toFixed(2)}{i < item.customizations.length - 1 ? ', ' : ''}
            </Text>
          )),
        ], 'Produtos')}
        
        <Text style={styles.title}>Clientes</Text>
        {renderTable(clientes, ['Nome', 'Email', 'CPF'], (item) => [item.nome, item.email, item.cpf], 'Clientes')}

        <Text style={styles.title}>Fornecedores</Text>
        {renderTable(fornecedores, ['Nome da API', 'Desenvolvedor', 'Onde Usamos'], (item) => [
          item.apiName,
          item.developer,
          item.usage,
        ], 'Fornecedores')}
      </ScrollView>
    </View>
  );
};

// Estilos para o componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  // Estilo da logo do aplicativo
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -50,  // Ajuste o valor para posicionar a logo conforme necessário
    zIndex: 1,       // Garante que a logo fique à frente de outros elementos
  },
  // Estilizando os Titulos organizadores
  titH1: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center"
  },
  // Estilizando o Botao de Voltar
  headerBottom: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "transparent",
    zIndex: 0,       // Garante que o cabeçalho fique atrás da logo
  },
  sairBtn: {
    width: "30%",
    padding: 10,
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
  // Outros
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#9EB9CC',
    marginBottom: 20,
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    padding: 10,
    backgroundColor: '#1E5E8B',
    borderWidth: 1,
    borderColor: '#9EB9CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#9EB9CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: '#9EB9CC',
  },
  rowContainer: {
    marginBottom: 0,
  },
  deleteButton: {
    backgroundColor: '#FF4C4C',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 15,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noData: {
    color: '#9EB9CC',
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default Tabelas;