// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators  } from '@react-navigation/stack';

import TemplateEscolha from '../screens/TemplateEscolha';
import peg from '../ff3fg63';

import LaddingPage from '../screens/ClientApp/LaddingPage';
import Checkout from '../screens/ClientApp/Checkout'
import Produtos from '../screens/ClientApp/Produtos';
import ContateNos from '../screens/ClientApp/ContateNos';

import LoginPage from '../screens/AdmApp/LoginPage';
import HomeAdm from '../screens/AdmApp/HomeAdm';
import CadastroIA from '../screens/AdmApp/Cadastro';
import CadastroClientes from '../screens/AdmApp/CadastroCli';
import CadastroFornecedores from '../screens/AdmApp/CadastroForn';
import Tabelas from '../screens/AdmApp/Tabela';


const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TemplateEscolha" // Define a tela inicial
        // Esconde
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Tela Inicial */}
        <Stack.Screen 
          name="TemplateEscolha" 
          component={TemplateEscolha}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, // Deslizar para cima
            gestureDirection: 'vertical-inverted',
          }}
        />
        <Stack.Screen 
          name="peg" 
          component={peg}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, // Deslizar para cima
            gestureDirection: 'vertical-inverted',
          }}
        />

        {/* ===== Telas dos Clientes */}

        {/* Tela Principal do Cliente */}
        <Stack.Screen 
          name="Ladding" 
          component={LaddingPage}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizar para a esquerda
            gestureDirection: 'horizontal-inverted', // Inverte o sentido do deslize
          }}
        />
        {/* Tela dos Produtos do Adm */}
        <Stack.Screen 
          name="Produtos" 
          component={Produtos}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizar para a direita
            gestureDirection: 'horizontal-inverted', // Inverte o sentido do deslize
          }}
        />
        {/* Tela do Checkout do Cliente */}
        <Stack.Screen 
          name="Checkout" 
          component={Checkout}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, // Deslizar para cima
            gestureDirection: 'vertical-inverted',
          }}
        />
        {/* Tela do Contate-Nos */}
        <Stack.Screen 
          name="ContateNos" 
          component={ContateNos}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, // Deslizar para cima
            gestureDirection: 'vertical-inverted',
          }}
        />

        {/* ===== Telas do ADM */}

        {/* Tela Principal do Adm */}
        <Stack.Screen 
          name="Login" 
          component={LoginPage}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizar para a direita
          }}
        />
        {/* Tela Home do Adm */}
        <Stack.Screen 
          name="HomeAdm" 
          component={HomeAdm}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizar para a direita
          }}
        />
        {/* Tela Cadastro das IA's do Adm */}
        <Stack.Screen 
          name="CadastroIA" 
          component={CadastroIA}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizar para a direita
          }}
        />
        {/* Tela Cadastro dos Fornecedores do Adm */}
        <Stack.Screen 
          name="CadastroFornecedores" 
          component={CadastroFornecedores}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizar para a direita
          }}
        />
        {/* Tela Cadastro dos Clientes do Adm */}
        <Stack.Screen 
          name="CadastroClientes" 
          component={CadastroClientes}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizar para a direita
          }}
        />
        {/* Tela Tabelas do Adm */}
        <Stack.Screen 
          name="Tabelas" 
          component={Tabelas}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizar para a direita
          }}
        />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// options={{
//   cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, // Deslizar para cima
//   gestureDirection: 'vertical-inverted',

//   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizar para a esquerda
//   gestureDirection: 'horizontal-inverted', // Inverte o sentido do deslize

//   ardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Deslizar para a direita (padrão)
//   // ...TransitionPresets.SlideFromRightIOS, // Deslizar para a direita
// }}

export default Navigation;