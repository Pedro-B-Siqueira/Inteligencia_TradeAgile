import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Checkout = ({ route, navigation }) => {
  const { cart, setCart } = route.params;

  const handleConfirmOrder = () => {
    Alert.alert('Pedido Confirmado', 'Obrigado pelo seu pedido!');
    setCart([]); // Limpa o carrinho após confirmação
    navigation.goBack(); // Volta para a tela anterior
  };

  const totalPrice = cart.reduce((total, item) => {
    const itemFinalPrice = item.finalPrice || 0;
    return total + itemFinalPrice * item.quantity;
  }, 0);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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

      <View style={styles.headerBottom}>
        <TouchableOpacity
          style={styles.sairBtn}
          onPress={() => {
            navigation.navigate('Produtos');
          }}
        >
          <Text style={styles.sairBtnText}>Voltar</Text>
          <Icon name="arrow-upward" size={24} color="#ffffff" style={styles.btnIrIcon_R} />
        </TouchableOpacity>
      </View>

      {cart.length > 0 ? (
        <View>
          {cart.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>
                {item.description || 'Sem descrição'} | Preço Unitário: R$ <Text style={styles.itemTotalPrice}>{(item.price ? item.price.toFixed(2) : '0.00')}</Text>
              </Text>
              {item.selectedOption?.label && (
                <Text style={styles.itemCustomization}>
                  Personalização: {item.selectedOption.label} (+R$ {(item.selectedOption.price ? item.selectedOption.price.toFixed(2) : '0.00')})
                </Text>
              )}
              <Text style={styles.itemTotal}>
                Total: R$ <Text style={styles.itemTotalPrice}> {((item.finalPrice || 0) * item.quantity).toFixed(2)} </Text>
              </Text>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Geral: R$ <Text style={styles.itemTotalPrice}>{totalPrice.toFixed(2)} </Text></Text>
            <Text style={styles.totalText}>Total de Itens: <Text style={styles.itemTotalPrice}>{totalItems} </Text></Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
            <Text style={styles.buttonText}>Confirmar Pedido</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.emptyCart}>Seu carrinho está vazio.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
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
  headerBottom: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  sairBtn: {
    width: "25%",
    padding: 4,
    backgroundColor: "#1E5E8B",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  sairBtnText: {
    fontSize: 24,
    color: "#ffffff",
  },
  btnIrIcon_R: {
    marginLeft: 8,
  },
  itemContainer: {
    marginTop: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: '#1E5E8B',
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  itemDetails: {
    fontSize: 16,
    color: '#9EB9CC',
  },
  itemCustomization: {
    fontSize: 16,
    color: '#D9D9D9',
    marginTop: 5,
  },
  itemTotal: {
    fontSize: 14,
    color: '#ffffff',
  },
  itemTotalPrice: {
    fontSize: 16,
    color: '#FFDE59',
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFDE59',
  },
  totalText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1E5E8B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  emptyCart: {
    marginTop: 15,
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Checkout;