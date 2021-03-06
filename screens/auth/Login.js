import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet,Image ,TouchableOpacity} from 'react-native';
import {SIZES, COLORS, FONTS} from "../../constants/theme"
import {AuthLayout, FormInput, TextBtn,TextIconButton} from "../../component";
import icons from "../../constants/icons";
import utils from "../../utils/Utils";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

const Login = () => {
    const navigation = useNavigation()
    const [email,setEmail] = useState("")
    const [pwd,setPwd] = useState("")
    const [emailerr, setEmailErr] = useState("")
    const [showPwd, setShowPwd] = useState(false)

    const isEnableLogin = () => {
        return email != "" && pwd !="" && emailerr == ""
    }
    useEffect(() => {
        // const token = AsyncStorage.getItem("token")
        // if(token !== null) {
        //     navigation.replace("Main")
        // }

    },[])

    const LoginHandler = async () => {

        const userInput = {
            email,
            password : pwd
        }

        console.log(userInput)

        try{
            const {data, status} = await axios.post("http://localhost:8000/api/users/login", userInput)
            console.log(data)
            if(status === 200) {
                await AsyncStorage.setItem("token", data.token)
                navigation.replace("Main")
            }

        }catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <AuthLayout
            title={"Lets's Sign You in"}
            subtitle={"Welcome back, you've been missed"}
            titleContainerStyle={styles.titleContainer}
        >
            <View style={styles.formContainer}>
                <FormInput
                    label={'Email'}
                    keyboardType={'email-address'}
                    containerStyle={{marginTop:SIZES.radius}}
                    autoCompleteType={'email'} //
                    value={email}
                    onChange={(value)=> {
                        utils.validateEmail(value, setEmailErr)
                        setEmail(value)
                    }}
                    errorMsg={emailerr}
                    appendComponent={
                        <View style={{ justifyContent:'center' }}>
                            <Image
                                source={(email == "") || (email != "" && emailerr == "") ? icons.correct : icons.cancel}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: (email == "") ? COLORS.gray : (email != "" && emailerr == "") ? COLORS.primary : COLORS.red
                                }}
                            />
                        </View>
                    }
                />
               <FormInput
                   label={'Password'}
                   secureTextEntry={!showPwd}
                   containerStyle={{marginTop:SIZES.radius}}
                   autoCompleteType={'password'} //
                   value={pwd}
                   onChange={(value)=> {
                       setPwd(value)
                   }}
                   appendComponent={
                       <TouchableOpacity
                           style={styles.passwordTouchable}
                           onPress={() => setShowPwd(!showPwd)}
                       >
                           <Image
                                source={showPwd ? icons.eye_close : icons.eye}
                                style={styles.eyeicon}
                           />
                       </TouchableOpacity>

                   }
               />

            </View>
            <View style={styles.btnsContainer}>
                <TextBtn
                    label={"Forgot password"}
                    labelStyle={styles.ForgotText}
                    buttonContainerStyle={{backgroundColor:null}}
                    onPress={() => navigation.push("Forgot")}
                />
            </View>
            <TextBtn
                label={'Log In'}
                disabled={ isEnableLogin() ? false : true }
                buttonContainerStyle={{
                    height:55,
                    alignItems: 'center',
                    marginTop: SIZES.padding + 10,
                    borderRadius:SIZES.radius,
                    backgroundColor: isEnableLogin() ? COLORS.primary : COLORS.lightGray2
                }}
                onPress={ () => LoginHandler()}
            />
          <View style={styles.signupContainer}>
              <Text style={{color:COLORS.darkGray, ...FONTS.body3 }}>
                  Don't have an account? {""}
              </Text>
              <TextBtn
                  label={"Sign UP"}
                  buttonContainerStyle={{backgroundColor:null}}
                  labelStyle={{
                      color: COLORS.primary,
                      ...FONTS.body3
                  }}
                  onPress={() => navigation.push("Signup")}

              />
          </View>

          <View style={{marginBottom: SIZES.padding * 2.5}} >
              <TextIconButton
                icon={icons.fb}
                containerStyle={{
                    height: 50,
                    alignItem: 'center',
                    borderRadius: SIZES.radius,
                    backgroundColor:COLORS.blue
                }}
                iconPosition={"LEFT"}
                iconStyle={{tintColor: COLORS.white }}
                label={"Continue with Facebook"}
                labelStyle ={{
                    marginLeft:SIZES.radius,
                    color: COLORS.white
                }}
                onPress={() => alert('gfdsa')}
              />
              <TextIconButton
                  icon={icons.google}
                  containerStyle={{
                      height: 50,
                      alignItem: 'center',
                      borderRadius: SIZES.radius,
                      backgroundColor:COLORS.lightGray2
                  }}
                  iconPosition={"LEFT"}
                  iconStyle={{tintColor: COLORS.red }}
                  label={"Continue with Google"}
                  labelStyle ={{
                      marginLeft:SIZES.radius,
                  }}
                  onPress={() => alert('gfdsa')}
              />
          </View>

        </AuthLayout>
    );
};


export default Login;

const styles = StyleSheet.create({
    formContainer: {
        flex:1,
        marginTop: SIZES.height > 800 ? SIZES.padding * 2 : 0
    },
    titleContainer:{
        marginTop:SIZES.height > 800 ? SIZES.padding + 5 : 0
    },
    passwordTouchable: {

        width:40,
        alignItems:'flex-end',
        justifyContent:'center'
    },
    eyeicon: {
        height:20,
        width:20,
        tintColor: COLORS.gray
    },
    btnsContainer: {
        flexDirection: 'row',
        marginTop:SIZES.padding,
        justifyContent:'space-between'

    },
    signupContainer:{
        flexDirection: 'row',
        marginTop:SIZES.padding,
        justifyContent:'center'
    },
    ForgotText :{
        color: COLORS.gray,
        ...FONTS.body4
    }

})