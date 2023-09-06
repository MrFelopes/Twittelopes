import { useEffect, useState } from "react"
import {View} from "react-native"
import {Text, Button} from "react-native-paper"
import { Alert } from "react-native"
import { auth, uploadToFirebase } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import Feed from "../utils/feed";
import { ScrollView } from "react-native-web";


export default function HomeScreen({navigation}){
    
    const [logado, setLogado] = useState("Deslogado")

    const pickImage = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos de permissões de rolagem para fazer isso funcionar!');
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
        if (!result.canceled) {
            const { uri } = result.assets[0];
            const fileName = uri.split('/').pop();
            const fileType = fileName.split('.').pop();
            await uploadToFirebase(uri, fileType);
            alert ('Imagem enviada com sucesso!')
        } else if (result.canceled) {
            alert('Você não selecionou uma imagem');
        } else {
            alert('Erro ao selecionar a imagem');
        }
    }

    const user = auth.currentUser;
    function logout(){
        signOut(auth).then(() => {
            alert("Usuário deslogado com sucesso.")
        }).catch((error) => {
            alert("Erro ao deslogar usuário.")
        }
        )
    }
    onAuthStateChanged(auth, (user) => {
        if (user){
            setLogado("Logado")
        } else {
            setLogado("Deslogado")
            navigation.navigate("login")
        }
    })
    if(!user) return(
        <View>
            <Text style={{textAlign:'center'}}>HOME</Text>
            <Button onPress={()=> {navigation.navigate("login")}}>Login</Button>
            <Button onPress={()=> {navigation.navigate("register")}}>Registrar</Button>

            <Text style={{textAlign:'center', fontWeight:'bold',}}>Estado: {logado}</Text>   
        </View>
    )
    else return (
        <ScrollView>
            <View>
                <Text style={{textAlign:'center', paddingTop:20, fontSize:25, fontWeight:"bold"}}>Twittelopes</Text>
                <Button onPress={pickImage} mode="contained" style={{margin:20}}>Envie uma imagem!</Button>
                <Feed />
                <Text style={{textAlign:'center', fontWeight:'bold', padding:10}}>Estado: {logado}</Text>
                <Button onPress={logout} mode="contained" style={{margin:20}}>Sair</Button>
            </View>
        </ScrollView>
    )
}

// Gênesis 1:1 - No princípio, criou Deus os céus e a terra.
// Matuê 2:7 - E, ouvindo eles o rei, partiram; e eis que a estrela, que tinham visto no oriente, ia adiante deles, até que, chegando, se deteve sobre o lugar onde estava o menino.
// Teto 3:16 - Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.
// Orochi 6:9 - E disse Deus: Haja luz; e houve luz.
// RezendeEvil 1:1 - No princípio, criou Deus os céus e a terra.
// Osama Bin Laden 2:7 - E, ouvindo eles o rei, partiram; e eis que a estrela, que tinham visto no oriente, ia adiante deles, até que, chegando, se deteve sobre o lugar onde estava o menino.
// Celso Portiolli 3:16 - Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.
// Fausto Toloi 6:9 - E disse Deus: Haja luz; e houve luz.
// Felipe Neto 1:1 - No princípio, criou Deus os céus e a terra.
// Robert Oppenheimer 2:7 - E, ouvindo eles o rei, partiram; e eis que a estrela, que tinham visto no oriente, ia adiante deles, até que, chegando, se deteve sobre o lugar onde estava o menino.
// Ass: Github Copilot.