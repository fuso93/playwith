import React, {useEffect, useState} from 'react';
import {Text, View, Button, Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";

const Main = () => {

    const navigation = useNavigation()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [img, setImg] = useState("")

    const getProfile = async () => {
        try{
            const value = await AsyncStorage.getItem('token')

            console.log(value)
            const config = {
                headers: {
                    "Authorization" : `Bearer ${value}`
                }
            }



            const {data, status} = await axios.get('http://localhost:8000/api/users/profile', config)
            console.log(data)
            if(status === 200) {
                setName(data.name)
                setEmail(data.email)
                setImg(data.profileImage)
            }
            // if(value !== null) {
            //     setToken(value)
            // }

        } catch(err){
            console.log(err.response.data.message)
        }
    }

    useEffect(()=> {
        getProfile()
    }, [])

    const logoutHandler = async () => {
        await AsyncStorage.removeItem("token")
        navigation.replace('Login')
    }

    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Image
                source={{ url : img}}
                style={{
                    width: 300,
                    height: 300
                }}
            />
            <Text>
                {name}
            </Text>
            <Text>
                {email}
            </Text>
            <Button
                title="Log out"
                onClick={() => logoutHandler()}
            />

        </View>
    );
};

export default Main;