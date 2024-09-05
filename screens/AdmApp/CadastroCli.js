import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa o AsyncStorage para armazenamento local
import Icon from 'react-native-vector-icons/MaterialIcons';

// Função do componente CadastroCliente
const CadastroCliente = ({ navigation }) => {
  // Define os estados para armazenar os dados de entrada do formulário
  const [nome, setNome] = useState(''); 
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    // Verifica se todos os campos estão preenchidos
    if (!nome || !email || !senha || !confirmarSenha || !cpf || !endereco) {
      alert('Por favor, preencha todos os campos.');
      return; // Se não estiverem preenchidos, exibe um alerta e encerra a função
    }

    // Verifica se a senha e a confirmação de senha coincidem
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return; // Se não coincidem, exibe um alerta e encerra a função
    }

    try {
      // Cria um objeto cliente com os dados do formulário
      const cliente = {
        nome,
        email,
        senha,
        cpf,
        endereco,
      };

      // Recupera os clientes armazenados no AsyncStorage
      let clientes = await AsyncStorage.getItem('Clientes');
      clientes = clientes ? JSON.parse(clientes) : []; // Se não houver clientes, cria um array vazio
      clientes.push(cliente); // Adiciona o novo cliente ao array

      // Salva o array de clientes atualizado no AsyncStorage
      await AsyncStorage.setItem('Clientes', JSON.stringify(clientes));

      // Exibe uma mensagem de sucesso
      alert('Sucesso', 'Cliente cadastrado com sucesso!');

    } catch (error) {
      console.error('Failed to save client', error); // Exibe um erro no console se ocorrer
      Alert.alert('Erro', 'Não foi possível cadastrar o cliente.' + error); // Exibe um alerta em caso de erro
    }
  };

  // Renderiza o formulário de cadastro de cliente
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
            <Icon name="arrow-back" size={24} color="#ffffff" style={styles.btnIrIcon_L} />
            <Text style={styles.sairBtnText}>Voltar</Text>
          </TouchableOpacity>
      </View>
      
      {/* Logo do aplicativo */}
      <Image source={require('../_imagens/logo_tradeagile.png')} style={styles.logo} />

      {/* Adiciona um Titulo */}
      <Text style={styles.titH1}>Adicione um novo Cliente ao Sistema</Text>

      <Text style={styles.title}>Cadastro de Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#9EB9CC"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#9EB9CC"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#9EB9CC"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a Senha"
        placeholderTextColor="#9EB9CC"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#9EB9CC"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        placeholderTextColor="#9EB9CC"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos para a página de cadastro, seguindo a paleta de cores usada no projeto
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Fundo preto como usado nas telas anteriores
    padding: 20,
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
  // Inputs e Botões
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
    backgroundColor: '#1E5E8B',
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
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default CadastroCliente;
