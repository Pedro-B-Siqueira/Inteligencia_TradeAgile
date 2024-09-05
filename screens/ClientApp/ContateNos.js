import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import emailjs from 'emailjs-com';

const ContateNos = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {

    if (!form.name || !form.email || !form.message ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message
    };

    const serviceID = "service_testechico15"
    const templateID = "template_recebo_inttrade"
    const userIDorAPI = "jYrFKcNaRTqREDHLT"

    emailjs.send(serviceID, templateID, templateParams, userIDorAPI)
      .then(response => {
        Alert.alert('Mensagem enviada com sucesso!');
        setForm({ name: '', email: '', message: '' });
      })
      .catch(error => {
        Alert.alert('Erro ao enviar mensagem. Tente novamente mais tarde.' + error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.espacoAcima}>
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

        {/* Parte Inferior do Cabeçalho, do Voltar */}
        <View style={styles.headerBottom}>
          <TouchableOpacity
            style={styles.sairBtn}
            onPress={() => {
              navigation.navigate('Ladding');
            }}
          >
            <Text style={styles.sairBtnText}>Voltar</Text>
            <Icon name="arrow-upward" size={24} color="#ffffff" style={styles.btnIrIcon_R} />
          </TouchableOpacity>
        </View>

        {/* Conteúdo principal */}
        <View style={styles.main}>
          <Text style={styles.formTitle}>Fale conosco</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#9EB9CC"
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9EB9CC"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Mensagem"
            placeholderTextColor="#9EB9CC"
            multiline
            numberOfLines={4}
            value={form.message}
            onChangeText={(text) => handleChange('message', text)}
          />
          
          <TouchableOpacity style={styles.enviarBtn}  onPress={handleSubmit}>
            <Text style={styles.enviarBtnText}>Enviar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>&copy; 2024 Inteligência Trade.Agile. Todos os direitos reservados.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 60, // Adiciona espaço extra no fundo para o rodapé
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
  headerBottom: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'center',
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
    borderBottomRightRadius: 12,
  },
  sairBtnText: {
    fontSize: 24,
    color: "#ffffff",
  },
  btnIrIcon_R: {
    marginLeft: 8,
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
    backgroundColor: '#1E5E8B',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerText: {
    color: '#ffffff',
    textAlign: "center",
  },
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 60, // Espaço para o botão de enviar
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 20,
  },
  textArea: {
    width: "90%",
    height: 200,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#ffffff',
    textAlignVertical: 'top',
    fontSize: 20,
  },
  enviarBtn: {
    width: "30%",
    padding: 8,
    backgroundColor: "#1E5E8B",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  enviarBtnText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default ContateNos;