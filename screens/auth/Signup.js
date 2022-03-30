import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SIZES, FONTS} from "../../constants/theme";
import utils from "../../utils/Utils";
import {useNavigation} from "@react-navigation/native";
import icons from "../../constants/icons";
import {AuthLayout, FormInput, TextBtn} from '../../component';
import axios from "axios";

const Signup = () => {
    const navigation = useNavigation()
    const [name, setName] = useState("")
    const [nameErr, setNameErr] = useState("")
    const [email,setEmail] = useState("")
    const [pwd,setPwd] = useState("")
    const [pwdErr, setPwdErr] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [showPwd, setShowPwd] = useState(false)


    const isEnableSignup = () => {
        return email !="" && name !="" && pwd !="" && emailErr == "" && pwdErr == ""
    }

    const signUpHandler = async () => {

        const userInput = {
            name,
            email,
            password : pwd
        }

        try {
            const {data, status} = await axios.post("http://localhost:8000/api/users", userInput)

            if (status == 201) {
                navigation.goBack('Login')
            }

        }catch (err) {
            alert(err.response.data.message)
        }

    }


    return (
        <AuthLayout
            title={"Getting Started"}
            subtitle={"Create an account to continue!"}
            titleContainerStyle={styles.titleContainer}
        >
            <View style={styles.formContainer}>

                <FormInput
                    label={'Username'}
                    containerStyle={{marginTop:SIZES.radius}}
                    value={name}
                    onChange={(value)=> {
                        setName(value)
                    }}
                    errorMsg={nameErr}
                    appendComponent={
                        <View style={{ justifyContent:'center' }}>
                            <Image
                                source={(name == "")  ? icons.correct : icons.cancel}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: (name == "") ? COLORS.gray : (name != "" && nameErr == "") ? COLORS.primary : COLORS.red
                                }}
                            />
                        </View>
                    }
                />
                <FormInput
                    label={'Email'}
                    keyboardType={'email-address'}
                    containerStyle={{marginTop:SIZES.radius}}
                    autoCompleteType={'email'}
                    value={email}
                    onChange={(value)=> {
                        utils.validateEmail(value, setEmailErr)
                        setEmail(value)
                    }}
                    errorMsg={emailErr}
                    appendComponent={
                        <View style={{ justifyContent:'center' }}>
                            <Image
                                source={(email == "")  ? icons.correct : icons.cancel}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: (email == "") ? COLORS.gray : (email != "" && emailErr == "") ? COLORS.primary : COLORS.red
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

                <TextBtn
                    label={"Sign up"}
                    disabled={ isEnableSignup() ? false : true}
                    buttonContainerStyle={{
                        height: 55,
                        alignItems: 'center',
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: isEnableSignup() ? COLORS.primary : COLORS.lightGray1
                    }}
                    onPress={() => signUpHandler()}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.darkGray,
                            ...FONTS.body3
                        }}
                    >
                        Already have an account? {"  "}
                    </Text>
                    <TextBtn
                        label={"Login"}
                        buttonContainerStyle={{backgroundColor: null }}
                        labelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3
                        }}
                        onPress={() => {
                            navigation.goBack('Login')
                        }}
                    />
                </View>

            </View>
        </AuthLayout>


    );
};

const styles= StyleSheet.create({
    formContainer:{
        flex: 1,
        marginTop: SIZES.height > 800 ? SIZES.padding * 2 : 0
    },
    passwordTouchable: {
        width:40,
        alignItems:'flex-end',
        justifyContent:'center'
    },
    eyeicon:{
        height: 20,
        width: 20,
        tintColor: COLORS.gray
    },
    titleContainer:{
        marginTop:SIZES.height > 800 ? SIZES.radius : 0
    },
    signupBtnContainer:{
        height: 55,
        alignItems: 'center',
        marginTop:SIZES.pading,
        borderRadius:SIZES.radius,
        backgroundColor:COLORS.primary

    }
})



export default Signup;