import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import {Alert} from "react-native";

export default function App() {
  const [precoAlcool, setPrecoAlcool] = useState();
  const [precoGasolina, setPrecoGasolina] = useState();
  const [resultado, setResultado] = useState("");
  
  const changePrecoAlcool = (alcool) => {
    setPrecoAlcool(alcool);
    setResultado("");
  }
  
  const changePrecoGasolina = (gasolina) => {
    setPrecoGasolina(gasolina);
    setResultado("");
  }
  
  function calcularRecomendacaoCombustivel() {
    if (!precoGasolina || precoGasolina == 0 ||
        !precoAlcool || precoAlcool == 0
    ) {
      setResultado("");
      Alert.alert(
          "Dados inválidos",
          "Preencha os campos obrigatórios",
          [
            {
              text: "OK"
            }
          ]
      );
      return;
    }
    
    let textoRecomendacao = "";
    let valorReferenciaGasolina = 0.7;
    let divisaoCombustiveis = precoAlcool / precoGasolina;
    
    if (divisaoCombustiveis < valorReferenciaGasolina) {
      textoRecomendacao = "Recomendamos abastecer com Álcool.";
    } else {
      textoRecomendacao = "Recomendamos abastecer com Gasolina.";
    }
    
    setResultado(textoRecomendacao);
  }
  
  return (
    <View style={styles.container}>
      <Image source={require('./assets/bomba.png')} style={{paddingBottom: 20, width: 120, height: 120}}></Image>

      <Text selectionColor='red' style={styles.text}>Qual a melhor opção ?</Text>
      <TextInput value={precoAlcool} onChangeText={changePrecoAlcool} keyboardType="numeric" style={styles.input} placeholder={'Álcool'}></TextInput>
      <TextInput value={precoGasolina} onChangeText={changePrecoGasolina} keyboardType="numeric" style={styles.input} placeholder={'Gasolina'}></TextInput>
      <Button onPress={calcularRecomendacaoCombustivel} title={"Calcular"}></Button>
      
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
