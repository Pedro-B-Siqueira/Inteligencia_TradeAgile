import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Cadastro = ({ navigation }) => {
  // Estados para armazenar informações do produto, personalizações e imagem
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [customizations, setCustomizations] = useState([]);
  const [currentCustomization, setCurrentCustomization] = useState('');
  const [customizationPrice, setCustomizationPrice] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Função para selecionar imagem usando o expo-image-picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setImageLoaded(true);
    }
  };

  // Função para remover a imagem selecionada
  const removeImage = () => {
    setImageUri(null);
    setImageLoaded(false);
  };

  // Função para adicionar uma nova personalização à lista de personalizações
  const handleAddCustomization = () => {
    if (currentCustomization && customizationPrice) {
      const newCustomization = {
        option: currentCustomization,
        price: parseFloat(customizationPrice),
      };
      setCustomizations([...customizations, newCustomization]);
      setCurrentCustomization('');
      setCustomizationPrice('');
    } else {
      alert('Por favor, preencha o nome e o preço da personalização.');
    }
  };

  // Função para remover uma personalização específica da lista
  const handleRemoveCustomization = (index) => {
    const updatedCustomizations = customizations.filter((_, i) => i !== index);
    setCustomizations(updatedCustomizations);
  };

  // Função para registrar o produto e salvá-lo no AsyncStorage
  const handleRegister = async () => {
    if (!name || !price || !description || customizations.length === 0 || !imageLoaded) {
      alert('Por favor, preencha todos os campos e adicione uma imagem.');
      return;
    }

    try {
      const newProduct = {
        name,
        price: parseFloat(price),
        description,
        customizations,
        imageUri,
      };
      // Recupera os produtos existentes no AsyncStorage
      let products = await AsyncStorage.getItem('products');
      products = products ? JSON.parse(products) : [];
      // Adiciona o novo produto à lista de produtos
      products.push(newProduct);
      await AsyncStorage.setItem('products', JSON.stringify(products));
      console.log('Product registered:', newProduct);

      // Limpa os estados após o registro
      setName('');
      setPrice('');
      setDescription('');
      setCustomizations([]);
      setCurrentCustomization('');
      setCustomizationPrice('');
      setImageUri(null);
      setImageLoaded(false);

      // Exibe uma mensagem de sucesso
      alert('Sucesso', 'IA cadastrada com sucesso!');
    } catch (error) {
      console.error('Failed to register product', error);
      alert('Ocorreu um erro ao registrar a IA.' + error);
    }
  };

  return (
    // ScrollView permite rolagem em telas menores e centraliza o conteúdo
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
      <Text style={styles.titH1}>Adicione uma nova Inteligência Artificial</Text>

      {/* Picker para selecionar imagem do produto */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {imageUri ? (
          <View style={styles.imageContainer}>
            {/* Exibe a imagem selecionada */}
            <Image source={{ uri: imageUri }} style={styles.selectedImage} />
            <TouchableOpacity style={styles.removeImageButton} onPress={removeImage}>
              <MaterialIcons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.imagePickerText}>
            {imageLoaded ? 'Imagem carregada com sucesso!' : 'Selecionar Imagem'}
          </Text>
        )}
      </TouchableOpacity>

      {/* Container do formulário para adicionar produto */}
      <View style={styles.formContainer}>
        {/* Campos de entrada para o nome, preço e descrição do produto */}
        <TextInput
          style={styles.input}
          placeholder="Nome da I.A."
          placeholderTextColor="#9EB9CC"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          placeholderTextColor="#9EB9CC"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          placeholderTextColor="#9EB9CC"
          value={description}
          onChangeText={setDescription}
        />

        {/* Adiciona um Titulo */}
        <Text style={styles.titH2}>Adicione as Personalizações para essa I.A.</Text>

        {/* Campos de entrada para opções de personalização */}
        <TextInput
          style={styles.input}
          placeholder="Nome da opção de Personalização"
          placeholderTextColor="#9EB9CC"
          value={currentCustomization}
          onChangeText={setCurrentCustomization}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço da Personalização"
          placeholderTextColor="#9EB9CC"
          keyboardType="numeric"
          value={customizationPrice}
          onChangeText={setCustomizationPrice}
        />

        {/* Botão para adicionar personalização */}
        <TouchableOpacity
          style={styles.customizationButton}
          onPress={handleAddCustomization}
        >
          <Text style={styles.customizationButtonText}>Adicionar Personalização</Text>
        </TouchableOpacity>

        {/* Exibe a lista de personalizações adicionadas */}
        <View style={styles.customizationsContainer}>
          {customizations.length > 0 && (
            <View style={styles.customizationsTable}>
              {customizations.map((customization, index) => (
                <View key={index} style={styles.customizationItem}>
                  <Text style={styles.customizationText}>
                    {customization.option}: <Text style={styles.customizationPrice}>R$ {customization.price ? customization.price.toFixed(2) : '0.00'}</Text>
                  </Text>
                  {/* Botão para remover personalização */}
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveCustomization(index)}
                  >
                    <MaterialIcons name="remove-circle-outline" size={24} color="#FF4C4C" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Botão para registrar o produto */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Registrar I.A.</Text>
        </TouchableOpacity>

        {/* Botão para ir para a lista de produtos */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Tabelas')}
        >
          <Text style={styles.buttonText}>Verificar Lista de I.A.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Estilo do container principal, com fundo preto e centralização do conteúdo
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#000000',
    alignItems: 'center',
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
  titH2: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "left"
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
  // Estilo dos campos de entrada
  input: {
    height: 50,
    borderColor: '#9EB9CC', // Borda azul clara
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#FFFFFF', // Texto branco para input
    marginBottom: 15,
  },
  // Estilo do picker de imagem
  imagePicker: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E5E8B',
    borderRadius: 5,
    marginBottom: 20,
    opacity: 0.5,
  },
  // Container da imagem selecionada
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  // Texto padrão do picker de imagem
  imagePickerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: "bold",
  },
  // Estilo da imagem selecionada
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  // Botão para remover a imagem selecionada
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF0000',
    borderRadius: 50,
    padding: 5,
  },
  // Estilo do botão padrão
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
  // Texto dos botões
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
  // Estilo dos campos do formulário
  formContainer: {
    width: '100%',
    maxWidth: 600, // Limita a largura máxima dos campos do formulário
  },
  // Container das personalizações
  customizationsContainer: {
    marginTop: 20,
    width: '100%',
  },
  // Estilo da tabela de personalizações
  customizationsTable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#9EB9CC',
  },
  // Estilo de cada item de personalização
  customizationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1E5E8B',
  },
  // Texto da personalização
  customizationText: {
    fontSize: 16,
    color: '#1E5E8B',
    flex: 1,
  },
  // Preço da personalização em negrito
  customizationPrice: {
    fontWeight: 'bold',
  },
  // Botão para adicionar personalização
  customizationButton: {
    backgroundColor: '#1E5E8B',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  // Texto do botão de personalização
  customizationButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  // Botão para remover personalização
  removeButton: {
    padding: 5,
    marginLeft: 10,
  },
});

export default Cadastro;
