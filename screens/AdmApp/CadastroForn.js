import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa o AsyncStorage para armazenamento local
import { MaterialIcons } from '@expo/vector-icons'; // Ícones para o botão de voltar
import Icon from 'react-native-vector-icons/MaterialIcons';

// Função do componente CadastroForn
const CadastroForn = ({ navigation }) => {
  // Define os estados para armazenar os valores dos campos de entrada do formulário
  const [apiName, setApiName] = useState('');
  const [developer, setDeveloper] = useState('');
  const [usage, setUsage] = useState('');

  // Função para lidar com o registro do fornecedor
  const handleRegister = async () => {
    // Verifica se todos os campos estão preenchidos
    if (!apiName || !developer || !usage) {
      alert('Por favor, preencha todos os campos.');
      return; // Se não estiverem preenchidos, exibe um alerta e encerra a função
    }

    try {
      // Cria um novo objeto de fornecedor com os dados do formulário
      const newSupplier = {
        apiName,
        developer,
        usage,
      };

      // Recupera a lista de fornecedores armazenada no AsyncStorage
      let Fornecedores = await AsyncStorage.getItem('Fornecedores');
      Fornecedores = Fornecedores ? JSON.parse(Fornecedores) : []; // Se não houver fornecedores, cria um array vazio
      Fornecedores.push(newSupplier); // Adiciona o novo fornecedor à lista

      // Salva a lista de fornecedores atualizada no AsyncStorage
      await AsyncStorage.setItem('Fornecedores', JSON.stringify(Fornecedores));

      console.log('Fornecedor registrado:', newSupplier); // Exibe o fornecedor registrado no console
      // Limpa os campos do formulário após o registro
      setApiName('');
      setDeveloper('');
      setUsage('');

      // Exibe uma mensagem de sucesso
      alert('Sucesso', 'Fornecedor cadastrado com sucesso!');

    } catch (error) {
      console.error('Falha ao registrar fornecedor', error); // Exibe um erro no console se ocorrer
      Alert('Ocorreu um erro ao registrar o fornecedor.' + error); // Exibe um alerta em caso de erro
    }
  };

  // Renderiza o formulário de cadastro de fornecedor
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>

      {/* Parte Inferior do Cabeçalho, do Voltar */}
      <View style={styles.headerBottom}>
        <TouchableOpacity
            style={styles.sairBtn}
            onPress={() => {
              navigation.navigate('HomeAdm');
            }}
          >
            <Icon name="arrow-back" size={24} color="#ffffff" style={styles.btnIrIcon_L} />
            <Text style={styles.sairBtnText}>Voltar</Text>
          </TouchableOpacity>
      </View>
      
      {/* Logo do aplicativo */}
      <Image source={require('../_imagens/logo_tradeagile.png')} style={styles.logo} />

      {/* Adiciona um Titulo */}
      <Text style={styles.titH1}>Adicione um novo Fornecedor ao Sistema</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome da API"
          placeholderTextColor="#9EB9CC"
          value={apiName}
          onChangeText={setApiName}
        />
        <TextInput
          style={styles.input}
          placeholder="Desenvolvedor"
          placeholderTextColor="#9EB9CC"
          value={developer}
          onChangeText={setDeveloper}
        />
        <TextInput
          style={styles.input}
          placeholder="Onde Usamos"
          placeholderTextColor="#9EB9CC"
          value={usage}
          onChangeText={setUsage}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Registrar Fornecedor</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Estilos para a página de cadastro, seguindo a paleta de cores usada no projeto
const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#000000', // Fundo preto, mantendo consistência com o restante do app
    alignItems: 'center', // Centraliza o conteúdo do ScrollView
  },
  // Estilo da logo do aplicativo
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
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
  },
  sairBtn: {
    width: "30%",
    padding: 10,
    paddingTop: 24,
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
  // Input e Botões
  input: {
    height: 50,
    borderColor: '#9EB9CC', // Borda azul clara
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#FFFFFF', // Texto branco para input
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1E5E8B', // Fundo azul escuro para o botão
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Texto branco no botão
    fontSize: 20,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 600, // Limite a largura máxima dos campos para 600 pixels
  },
});

export default CadastroForn;
