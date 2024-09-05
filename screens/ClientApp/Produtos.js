// Produtos.js

import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Produtos = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const productsData = await AsyncStorage.getItem('products');
      if (productsData) {
        const productsArray = JSON.parse(productsData);
        console.log('Produtos carregados:', productsArray);
        setProducts(productsArray);
      } else {
        console.log('Nenhum produto encontrado no AsyncStorage.');
        setProducts([]);
      }
    } catch (error) {
      console.error('Falha ao carregar produtos', error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProducts();
    });
    return unsubscribe;
  }, [navigation]);

  const handleAddToCart = (product) => {
    const selectedOption = selectedOptions[product.id] || { price: 0, label: '' };
    const finalPrice = product.price + selectedOption.price;
    const quantity = 1;

    setCart([...cart, { ...product, quantity, finalPrice, selectedOption }]);

    Alert.alert(
      'Item Adicionado',
      `${product.name} foi adicionado ao carrinho.`,
      [{ text: 'OK' }]
    );
  };

  const handleOptionChange = (productId, optionPrice, optionLabel) => {
    setSelectedOptions(prev => ({
      ...prev,
      [productId]: { price: optionPrice, label: optionLabel }
    }));
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.espacoAcima}>
            <Text
              style={styles.invTextAcima}
              onPress={() => {
                navigation.navigate('peg');
              }}
            >
              _____
            </Text>
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

        {/* Parte Inferior do Cabeçalho, do Voltar */}
        <View style={styles.headerBottom}>
          <TouchableOpacity
            style={styles.sairBtn}
            onPress={() => {
              navigation.navigate('Ladding');
            }}
          >
            <Text style={styles.sairBtnText}>Voltar</Text>
            <Icon name="arrow-forward" size={24} color="#ffffff" style={styles.btnIrIcon_R} />
          </TouchableOpacity>
        </View>

        {products.map((product) => {
          const selectedOption = selectedOptions[product.id] || { price: 0, label: '' };
          const finalPrice = product.price + selectedOption.price;

          return (
            <View key={product.id} style={styles.product}>
              {product.imageUri ? (
                <Image source={{ uri: product.imageUri }} style={styles.productImage} />
              ) : (
                <Image source={require('../_imagens/logo_tradeagile.png')} style={styles.productImage} />
              )}
              <View style={styles.details}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.desc}>{product.description}</Text>
                <Text style={styles.price}>
                  R$ <Text style={styles.itemTotalPrice}>{finalPrice.toFixed(2)}</Text>
                </Text>

                {product.customizations && (
                  <View style={styles.optionsContainer}>
                    <Text style={styles.optionsLabel}>Opções de Personalização:</Text>
                    <Picker
                      selectedValue={selectedOptions[product.id]?.price || 0}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        const option = product.customizations[itemIndex - 1];
                        handleOptionChange(product.id, itemValue, option ? option.option : '');
                      }}
                    >
                      <Picker.Item label="Sem modificações | Clique para Escolher..." value={0} />
                      {product.customizations.map((option, index) => (
                        <Picker.Item 
                          key={index} 
                          label={`${option.option} (+R$ ${option.price.toFixed(2)})`} 
                          value={option.price} 
                        />
                      ))}
                    </Picker>
                  </View>
                )}
                <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(product)}>
                  <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.checkoutContainer}>
          <TouchableOpacity 
            style={styles.buttonCheck} 
            onPress={() => navigation.navigate('Checkout', { cart, setCart })}
          >
            <Text style={styles.buttonCheckText}>Continuar Compra</Text>
          </TouchableOpacity>
          {totalItems > 0 && (
            <View style={styles.cartCountContainer}>
              <Text style={styles.cartCountText}>{totalItems}</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>&copy; 2024 Inteligência Trade.Agile. Todos os direitos reservados.</Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
    justifyContent: 'space-between', // Garantir que o conteúdo ocupe todo o espaço disponível
  },
  scrollContainer: {
    flexGrow: 1,
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
  headerBottom: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sairBtn: {
    width: "30%",
    padding: 4,
    backgroundColor: "#1E5E8B",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 0,
  },
  sairBtnText: {
    fontSize: 24,
    color: "#ffffff",
  },
  btnIrIcon_R: {
    marginLeft: 8,
  },
  footerContainer: {
    paddingBottom: 20, // Adiciona padding no fundo para que o botão de checkout não fique colado no rodapé
  },
  footer: {
    width: "100%",
    backgroundColor: '#1E5E8B',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    color: '#ffffff',
  },
  product: {
    marginTop: 15,
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#1E5E8B',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'transparent',
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
    color: '#ffffff',
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
    color: '#ffffff',
    fontWeight: "bold",
  },
  itemTotalPrice: {
    fontSize: 16,
    color: '#FFDE59',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 12,
    marginBottom: 10,
    color: '#9EB9CC',
  },
  button: {
    backgroundColor: '#1E5E8B',
    padding: 12,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  checkoutContainer: {
    padding: 0,
    backgroundColor: 'transparent',
    width: "100%",
    alignItems: 'center',
  },
  buttonCheck: {
    width: "100%",
    backgroundColor: '#FFDE59',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 16,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonCheckText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: 'center',
  },
  cartCountContainer: {
    position: 'absolute',
    marginTop: -6,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: 30,
    height: 30,
    borderColor: '#1E5E8B',
    borderWidth: 1,
  },
  cartCountText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionsLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ffffff',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#ffffff',
  },
});

export default Produtos;