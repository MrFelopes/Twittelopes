import {View} from "react-native"
import {Text, Button, TextInput} from "react-native-paper"
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleRegister(){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert ("Usuário cadastrado com sucesso!");
            navigation.navigate("Login")
        }).catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/weak-password') {
                alert('Senha muito fraca!');
            } else if (errorCode == 'auth/email-already-in-use') {
                alert('Email já cadastrado!');
            }
            else{
                alert("Não foi possível cadastrar o usuário:" + errorCode);
            }
        });
        
    }

    return (
        <View>
            <View>
                <Text>Cadastre-se no Twittelopes!</Text>
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
                <Button onPress={handleRegister} mode="contained" style={{margin:20}}>Registrar</Button>
            </View>
        </View>
    );
}   