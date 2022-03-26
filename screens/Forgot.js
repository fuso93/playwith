//


import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {AuthLayout, FormInput, TextBtn} from "../component";
import {COLORS, FONTS, SIZES} from "../constants/theme";
import icons from "../constants/icons";
import { useNavigation } from "@react-navigation/native";

const Forgot = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState("")
    const [emailErr, setEmailErr] = useState("")

    const isEnableSendEmail = () => {
        return email != "" && emailErr == ""
    }


    return (
        <AuthLayout
            title={"Password Recovery"}
            subtitle={"Please enter your email address to recover your password"}
            titleContainerStyle={{ marginTop: SIZES.padding * 2 }}
        >
            <View
                style={{ flex: 1, marginTop: SIZES.padding * 2 }}
            >
                <FormInput
                    label={"Email"}
                    keyboardType={"email-address"}
                    autoCompleteType={"email"}
                    value={email}
                    onChange={(value) => {
                        setEmail(value)
                    }}
                    errorMsg={emailErr}
                    appendComponent={
                        <View style={{ justifyContent: 'center' }}>
                            <Image
                                source={(email == "") || (email != "" && emailErr == "") ? icons.correct : icons.cancel}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: (email == "") ? COLORS.gray : (email != "" && emailErr == "") ? COLORS.green : COLORS.red
                                }}
                            />
                        </View>
                    }
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
                        Already have an account? {"   "}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
                            Log In
                        </Text>
                    </TouchableOpacity>
                </View>

                <TextBtn
                    label={"Send Email"}
                    disabled={isEnableSendEmail() ? false : true}
                    buttonContainerStyle={{
                        height: 55,
                        alignItems: 'center',
                        marginTop : SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor:isEnableSendEmail() ? COLORS.primary : COLORS.lightGray1

                    }}
                    onPress={() => alert("jdsklfjdsl")}
                />
            </View>
        </AuthLayout>
    );
};

export default Forgot;