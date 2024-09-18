import {
  Button,
  Image, Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {useState} from "react";
import {Alert} from "react-native";

export default function App() {
  const [precoAlcool, setPrecoAlcool] = useState(0.0);
  const [precoGasolina, setPrecoGasolina] = useState(0.0);
  const [resultado, setResultado] = useState("");
  
  const changePrecoAlcool = (alcool) => {
    setPrecoAlcool(parseFloat(alcool.replace(",", ".")));
    setResultado("");
  }
  
  const changePrecoGasolina = (gasolina) => {
    setPrecoGasolina(parseFloat(gasolina.replace(",", ".")));
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image source={require('./assets/bomba.png')} style={{paddingBottom: 20, width: 120, height: 120}}></Image>
          
          <Text style={styles.text}>Qual a melhor opção ?</Text>
          
          <Text style={styles.textLabel}>Álcool (preço por litro)</Text>
          <TextInput value={precoAlcool} onChangeText={changePrecoAlcool} keyboardType="numeric" style={styles.input} placeholder={'Álcool'}></TextInput>
          <Text style={styles.textLabel}>Gasolina (preço por litro)</Text>
          <TextInput value={precoGasolina} onChangeText={changePrecoGasolina} keyboardType="numeric" style={styles.input} placeholder={'Gasolina'}></TextInput>
          <Button onPress={calcularRecomendacaoCombustivel} title={"Calcular"}></Button>
          
          <TextInput readOnly="readOnly" style={[styles.resultado, { opacity: resultado ? 1 : 0 }]}>{resultado}</TextInput>
        </View>
      </TouchableWithoutFeedback>
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
    paddingBottom: 10,
    marginTop: 5,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },
  textLabel: {
    color: 'white',
    paddingBottom: 10,
    fontSize: 15
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: '#ffd23b',
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    border: 'none',
    textAlign: 'center',
  }
});
