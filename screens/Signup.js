import React from 'react';
import {View, Text, Image} from 'react-native';
import {COLORS, SIZES} from "../constants/theme";
import utils from "../utils/Utils";
import {useNavigation} from "@react-navigation/native";
import icons from "../constants/icons";

const Signup = () => {
    const navigation = useNavigation()
    const [email,setEmail] = useState("")
    const [pwd,setPwd] = useState("")
    const [emailerr, setEmailErr] = useState("")
    const [showPwd, setShowPwd] = useState(false)

    return (
        <View>
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
                errorMsg={emailerr}
                appendComponent={
                    <View style={{ justifyContent:'center' }}>
                        <Image
                            source={(email == "")  ? icons.correct : icons.cancel}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: (email == "") ? COLORS.gray : (email != "" && emailerr == "") ? COLORS.primary : COLORS.red
                            }}
                        />
                    </View>
                }
            />
        </View>
    );
};

export default Signup;