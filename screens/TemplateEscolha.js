//EscolhaTela.js

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TemplateEscolha = ({ navigation }) => {
  // Lista de produtos padrão
  const defaultProducts = [
    {
      id: 1,
      name: 'Geradora de Imagem',
      description: 'IA que gera imagens com base em descrições de texto.',
      price: 50000,
      imageUri: 'https://tiinside.com.br/wp-content/uploads/2023/08/IA-Generativa-Precisamos-falar-sobre-seguranca-scaled.jpg',
      customizations: [
        { option: 'Aprimoramento de Resolução', price: 5000 },
        { option: 'Edição de Imagens', price: 7000 },
      ],
    },
    {
      id: 2,
      name: 'Recomendações de Conteúdo',
      description: 'IA que recomenda conteúdo com base em preferências do usuário.',
      price: 50000,
      imageUri: 'https://ravel.com.br/blog/wp-content/uploads/2023/08/renderizacao-3d-do-conceito-de-biorobos-1000x640.jpg',
      customizations: [
        { option: 'Personalização de Algoritmo', price: 8000 },
        { option: 'Integração com Redes Sociais', price: 10000 },
      ],
    },
    {
      id: 3,
      name: 'Análise de Imagem',
      description: 'IA que analisa imagens para reconhecimento de objetos e padrões.',
      price: 60000,
      imageUri: 'https://telesintese.com.br/wp-content/uploads/2023/04/Inteligencia-Artificial-IA-AI-freepik-2023.jpg',
      customizations: [
        { option: 'Reconhecimento de Faces', price: 10000 },
        { option: 'Classificação de Objetos', price: 12000 },
      ],
    },
    {
      id: 4,
      name: 'Tradução de Texto',
      description: 'IA especializada na tradução de textos entre diferentes idiomas.',
      price: 40000,
      imageUri: 'https://t2.tudocdn.net/708183?w=1920',
      customizations: [
        { option: 'Tradução em Tempo Real', price: 8000 },
        { option: 'Suporte a Idiomas Raros', price: 9000 },
      ],
    },
    {
      id: 5,
      name: 'Assistente Virtual',
      description: 'IA para assistentes virtuais que ajudam nas tarefas do dia a dia.',
      price: 70000,
      imageUri: 'https://www.hardware.com.br/static/20160104/jarvis.jpg',
      customizations: [
        { option: 'Integração com Dispositivos IoT', price: 15000 },
        { option: 'Aprimoramento de Conversação', price: 20000 },
      ],
    },
    {
      id: 6,
      name: 'Reconhecimento de Voz',
      description: 'IA que reconhece e transcreve voz em texto com precisão.',
      price: 45000,
      imageUri: 'https://img.odcdn.com.br/wp-content/uploads/2021/01/shutterstock_1306964536.jpg',
      customizations: [
        { option: 'Treinamento de Modelo Personalizado', price: 12000 },
        { option: 'Suporte a Múltiplos Idiomas', price: 10000 },
      ],
    },
  ];

  // Função para adicionar produtos padrão ao AsyncStorage, se todos eles forem removidos
  const checkAndAddProducts = async () => {
    try {
      const existingProducts = await AsyncStorage.getItem('products');
      let products = existingProducts ? JSON.parse(existingProducts) : [];

      // Verifica se nenhum produto da lista padrão está presente no JSON
      const noProductsExist = defaultProducts.every(defaultProduct =>
        !products.some(product => product.name === defaultProduct.name)
      );

      if (noProductsExist) {
        // Se nenhum dos produtos padrão estiver presente, adiciona todos os produtos padrão
        products = [...defaultProducts, ...products];
        await AsyncStorage.setItem('products', JSON.stringify(products));
        console.log('Produtos padrão adicionados ao AsyncStorage.');
      } else {
        console.log('Alguns produtos padrão ainda estão presentes no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao verificar ou adicionar produtos:', error);
    }
  };

  // useEffect para verificar e adicionar produtos ao carregar a página
  useEffect(() => {
    checkAndAddProducts();
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.textoH1}>Qual Aplicativo {'\n'} deseja Iniciar?</Text>

      <View style={styles.btnContainerMaster}>

        {/* Botão 1*/}
        <View style={styles.btnContainer}>
          <Text style={styles.textoH2}>Aplicativo para os Clientes</Text>
          <TouchableOpacity 
              style={styles.btnIr} 
              onPress={() => {
                navigation.navigate('Ladding');
              }}>
              <Icon name="arrow-back" size={24} color="#ffffff" style={styles.btnIrIcon_E} />
              <Text style={styles.btnIrText}>Ir</Text>
          </TouchableOpacity>
        </View>

        {/* Botão 2*/}
        <View style={styles.btnContainer}>
          <Text style={styles.textoH2}>Aplicativo para os Administradores</Text>
          <TouchableOpacity 
              style={styles.btnIr} 
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.btnIrText}>Ir</Text>
              <Icon name="arrow-forward" size={24} color="#ffffff" style={styles.btnIrIcon_R} />
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  textoH1: {
    fontSize: 28,
    color: "#ffffff"
  },
  btnContainerMaster: {
    backgroundColor: '#transparent',
    width: "90%",
    height: "30%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnContainer: {
    backgroundColor: '#transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', 
    width: "50%",
    height: "80%",
  },
  textoH2: {
    fontSize: 20,
    color: "#ffffff",
    backgroundColor: 'transparent',
    textAlign: "center",
    marginBottom: 8,
  },
  btnIr: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', 
    backgroundColor: '#1E5E8B',
    borderRadius: 4,
    padding: 8,
    width: "50%",
  },
  btnIrText: {
    fontSize: 24,
    color: '#ffffff',
  },
  btnIrIcon_R: {
    marginLeft: 8,
  },
  btnIrIcon_E: {
    marginRight: 8,
  },
});

export default TemplateEscolha;