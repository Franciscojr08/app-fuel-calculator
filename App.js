import { StatusBar } from 'expo-status-bar';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import { logo } from "./assets/bomba.png"

export default function App() {
  const [base,setBase] = useState();
  const [altura, setAltura] = useState();
  const [resultado, setResultado] = useState("");
  
  function changeBase(base) {
    setBase(base);
    setResultado("");
  }
  
  function changeAltura(altura) {
    setAltura(altura);
    setResultado("");
  }
  
  function calcular() {
    if (base == null) {
      alert("Preencha a base");
      return;
    }
    
    if (altura == null) {
      alert("Preencha a altura");
      return;
    }
    
    let resultado = (parseFloat(base) * parseFloat(altura)) / 2;
    let descricaoResultado = `Resultado: ${resultado}`;
    setResultado(descricaoResultado);
  }
  
  return (
    <View style={styles.container}>
      <Image source={require('./assets/bomba.png')} style={{paddingBottom: 20, width: 120, height: 120}}></Image>

      <Text selectionColor='red' style={styles.text}>Insira os dados abaixo para calcular a área do triangulo II</Text>
      <TextInput value={base} onChangeText={changeBase} keyboardType="numeric" style={styles.input} placeholder={'Base'}></TextInput>
      <TextInput value={altura} onChangeText={changeAltura} keyboardType="numeric" style={styles.input} placeholder={'Altura'}></TextInput>
      <Button onPress={calcular} title={"Calcular"}></Button>
      
      <Text style={[styles.resultado, { opacity: resultado ? 1 : 0 }]}>{resultado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    paddingBottom: 10
  },
  input: {
    width: 300,
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
    outlineStyle: 'none',
    border: 'none',
    textAlign: 'center',
  },
  resultado: {
    width: 300,
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: '#ccc',
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    border: 'none',
    textAlign: 'center',
  }
});
