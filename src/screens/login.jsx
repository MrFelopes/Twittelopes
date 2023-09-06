import {View} from "react-native"
import {Text, Button, TextInput} from "react-native-paper"
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function Login({navigation}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")    

    function handleLogin(){
        signInWithEmailAndPassword(auth, email, password)
        .then ((userCredential) => {
            alert("Usuário logado com sucesso!");
            navigation.navigate("Home")
        }).catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/wrong-password') {
                alert('Senha incorreta!');
            } else if (errorCode == 'auth/user-not-found') {
                alert('Usuário não encontrado!');
            } else {
                alert("Não foi possível logar o usuário:" + errorCode);
            }
        });
    }

    return(
        <View>
            <Text>Entre em sua conta!</Text>
            <TextInput
                label="Email"
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
                mode = "outlined"
                style={{margin: 10}}
            />
            <TextInput
                label="Senha"
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                mode = "outlined"
                secureTextEntry = {true}
                style={{margin: 10}}
            />
            <Button onPress={handleLogin} mode="contained" style={{margin:20}}>Login</Button>
        </View>
    )
}