import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// URLs de imagens para o carrossel
const carouselImages = [
  { src: 'https://tiinside.com.br/wp-content/uploads/2023/08/IA-Generativa-Precisamos-falar-sobre-seguranca-scaled.jpg' },
  { src: 'https://www.questionpro.com/blog/wp-content/uploads/2023/04/Thumb-blog-BR-and-PT-42-750x420.png' },
  { src: 'https://telesintese.com.br/wp-content/uploads/2023/04/Inteligencia-Artificial-IA-AI-freepik-2023.jpg' },
];

// URLs de imagens e nomes para a galeria
const galleryItems = [
  { src: 'https://tiinside.com.br/wp-content/uploads/2023/08/IA-Generativa-Precisamos-falar-sobre-seguranca-scaled.jpg', name:'Geradora de Imagem' , preco: 'R$ 50.000,00'},
  { src: 'https://ravel.com.br/blog/wp-content/uploads/2023/08/renderizacao-3d-do-conceito-de-biorobos-1000x640.jpg', name:'Recomendações de Conteúdo', preco: 'R$ 50.000,00' },
  { src: 'https://telesintese.com.br/wp-content/uploads/2023/04/Inteligencia-Artificial-IA-AI-freepik-2023.jpg', name:'Análise de Imagem', preco: 'R$ 20.000,00' },
  { src: 'https://t2.tudocdn.net/708183?w=1920', name:'Tradução de Texto', preco: 'R$ 15.000,00' },
  { src: 'https://www.hardware.com.br/static/20160104/jarvis.jpg', name:'Assistente Virtual', preco: 'R$ 100.000,00' },
  { src: 'https://img.odcdn.com.br/wp-content/uploads/2021/01/shutterstock_1306964536.jpg', name:'Reconhecimento de Voz', preco: 'R$ 30.000,00' },
];

export default function TelaProdutos() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 15500,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const handleBuyPress = () => {
    navigation.navigate('Produtos');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botão de Comprar */}
      <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
        <Icon name="arrow-back" size={24} color="#ffffff" style={styles.btnIrIcon_R} />
        <Text style={styles.buyButtonText}>Adquira a sua I.A</Text>
      </TouchableOpacity>

      {/* Carrossel no topo */}
      <View style={styles.carouselContainer}>
        {carouselImages.map((item, index) => {
          const rotateY = rotateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [`${index * 120}deg`, `${360 + index * 120}deg`],
          });

          const scale = rotateAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1, 1],
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.imageContainer,
                {
                  transform: [
                    { perspective: 1000 },
                    { rotateY },
                    { scale },
                  ],
                },
              ]}
            >
              <ImageBackground source={{ uri: item.src }} style={styles.imageBackground}>
                {/* <Text style={styles.text}>{item.label}</Text> */}
              </ImageBackground>
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.conhecaNossos}>
        <Icon name="arrow-downward" size={24} color="#ffffff" style={styles.btnIrIcon_R} />
        <Text style={styles.conhecaNossosText}>Conheça as Opções</Text>
        <Icon name="arrow-downward" size={24} color="#ffffff" style={styles.btnIrIcon_R} />
      </View>

      {/* Galeria de Imagens */}
      <View style={styles.galleryContainer}>
        {galleryItems.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: item.src }} style={styles.galleryImage} />
            <Text style={styles.galleryText}>
              {"\n"}
              IA{"\n"}
              {item.name}
              {"\n"}
            </Text>
            <Text style={styles.priceText}>{item.preco}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 60, // Espaço extra para não sobrepor o rodapé
  },
  carouselContainer: {
    marginTop: 20,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    position: 'absolute',
    width: 300,
    height: 200,
    borderRadius: 10,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: '#1e5e8b',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center', // Alinha os itens ao centro horizontalmente
    alignItems: 'center',
    width: "60%", // Ajuste a largura para centralizar melhor
  },
  buyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  conhecaNossos: {
    flexDirection: 'row',
    justifyContent: 'center', // Alinha os itens ao centro horizontalmente
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    width: "60%", // Ajuste a largura para centralizar melhor
  },
  conhecaNossosText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
    marginTop: 10,
  },
  card: {
    backgroundColor: 'tranparent',
    width: '48%',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1E5E8B',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  galleryImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  galleryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFDE59',
    marginTop: 0,
    textShadowColor: '#FFDE59',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});