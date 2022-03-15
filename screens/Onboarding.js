import React,{ useRef, useState } from 'react';
import {View, Text, StyleSheet, Animated, Image, Button} from 'react-native';
import {useNavigation} from "@react-navigation/native"; //다른 대로 이동
import {StatusBar} from "expo-status-bar";
import constants from "../constants/constants";
import {TextBtn} from "../component";
import { SIZES, FONTS, COLORS } from "../constants/theme";


const Onboarding = () => {

    const navigation = useNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef();

    const [currentIndex, setCurrentIndex] = useState(0)

    const onViewChangeRef = useRef(({ viewableItems, changed }) => {
        setCurrentIndex(viewableItems[0].index)
    })

    const Dots = () => {
        const dotPosition = Animated.divide(scrollX, SIZES.width)

        return (
            <View style={styles.dotContainer}>
                {
                    constants.onboarding_screens.map((item, index) => {
                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.lightGray1, COLORS.primary, COLORS.lightGray1],
                            extrapolate: "clamp"
                        })

                        const dotWidth = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [10, 30, 10],
                            extrapolate: "clamp"
                        })

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                style={[
                                    styles.dotAnimated,
                                    { width: dotWidth, backgroundColor: dotColor }
                                ]}
                            />
                        )
                    })
                }
            </View>
        )
    }


    const renderFooter = () => {
       return(
           <View style={{height:160, marginBottom : SIZES.base}}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Dots/>
                </View>

                {currentIndex < constants.onboarding_screens.length -1 &&
                    <View style={styles.nextBtnContainer}>
                        <TextBtn
                            label={'go'}
                            buttonContainerStyle={{backgroundColor: null}}
                            labelStyle={{color:COLORS.gray}}
                            onPress={() => navigation.replace('Login')}
                        />
                        <TextBtn
                            label={'next'}
                            buttonContainerStyle={styles.nextBtn}
                            labelStyle={{fontWeight:'800', fontSize:18}}
                            onPress={() => {
                                flatListRef?.current?.scrollToIndex({
                                    index:currentIndex + 1,
                                    animated:true
                                })
                            }}
                        />
                    </View>
               }

               {currentIndex == constants.onboarding_screens.length -1 &&
                   <View style={styles.startBtnContainer}>
                       <TextBtn
                           label={'Login'}
                           buttonContainerStyle={styles.btnTextContainer}
                           labelStyle={styles.btnText}
                           onPress={() => navigation.replace('Login')}
                       />

                   </View>
               }
           </View>
       )
    }


    return (
        <View style={styles.mainContainer}>
            <StatusBar style={"auto"} />
            <Animated.FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled
                data={constants.onboarding_screens}
                scrollEventThrottle={16}
                snapToAlignment={"center"}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [
                        { nativeEvent: { contentOffset: { x: scrollX } } }
                    ],
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={onViewChangeRef.current}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: SIZES.width }}>
                            <View style={{ flex: 3 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        width: '100%',
                                        height: index == 1 ? "86%" : "100%"
                                    }}
                                >
                                    <Image
                                        source={item.bannerImage}
                                        resizeMode={'contain'}
                                        style={{ width: 300, height: 300 }}
                                    />
                                </View>
                            </View>

                            <View style={styles.detailContainer}>
                                <Text style={styles.title}>
                                    {item.title}
                                </Text>
                                <Text  style={styles.desc}>
                                    {item.description}
                                </Text>

                            </View>

                        </View>
                    )
                }}
            />
            {renderFooter()}
        </View>
    );
};

export default Onboarding;

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:COLORS.white
    },
    detailContainer: {
        flex:1,
        marginTop:20,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal: SIZES.radius,
        marginVertical:SIZES.padding+15
    },
    title:{
        ...FONTS.h1,
        fontSize: 24
    },
    desc:{
        marginTop:SIZES.radius,
        textAlign:'center',
        color:COLORS.gray,
        paddingHorizontal:SIZES.padding,
        ...FONTS.body3
    },
    dotContainer:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center'
    },
    dotAnimated : {
        borderRadius:5,
        marginHorizontal:6,
        height:10,
    },
    nextBtnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:SIZES.padding,
        marginVertical:SIZES.padding + 10
    },
    nextBtn:{
        height:60,
        width:200,
        borderRadius:SIZES.padding + 10,
        marginRight: -80

    },
    startBtnContainer:{
        paddingHorizontal: SIZES.padding,
        marginVertical: SIZES.padding + 10
    },
    btnText:{
        fontWeight: '800',
        fontSize:18
    },
    btnTextContainer:{
        height:60,
        borderRadius:SIZES.padding + 10

    }



})