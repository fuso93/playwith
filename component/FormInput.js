import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

import {FONTS, SIZES, COLORS} from "../constants/theme"

const FormInput = ({
   containerStyle,
   inputContainerStyle,
   label,
   placeholder,
   inputStyle,
   value = "",
   prependComponent,
   appendComponent,
   onChange,
   secureTextEntry,
   keyboardType = "default",
   autoCompleteType = "off",
   autoCapitalize = "none",
   errorMsg = "",
   maxLength,
}) => {
    return (
        <View style={{ ...containerStyle }}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{label}</Text>
                <Text style={styles.err}>{errorMsg}</Text>
            </View>

            <View style={[styles.inputContainer, { ...inputContainerStyle }]}>
                {prependComponent}
                <TextInput
                    style={{ flex: 1, ...inputStyle }}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCompleteType={autoCompleteType}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    onChangeText={(text) => onChange(text)}
                />
                {appendComponent}
            </View>
        </View>
    )
}

export default FormInput

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: COLORS.gray,
        ...FONTS.body4,
        marginLeft: SIZES.base
    },
    err: {
        color: COLORS.red,
        ...FONTS.body4
    },
    inputContainer: {
        flexDirection: 'row',
        height: SIZES.height > 800 ? 55 : 45,
        paddingHorizontal: SIZES.padding,
        marginTop: SIZES.height > 800 ? SIZES.base : 0,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
    }
})