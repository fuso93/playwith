import React from 'react';
import {useFonts} from "expo-font";
import {NavigationContainer} from "@react-navigation/native";
import OnboardingStack from "./stacks/OnboardingStack";

const App = () => {
    const [loaded] = useFonts({
        NotoSansKRBlack:require('./assets/fonts/NotoSansKR-Black.otf'),
        NotoSansKRBold:require('./assets/fonts/NotoSansKR-Bold.otf'),
        NotoSansKRLight:require('./assets/fonts/NotoSansKR-Light.otf'),
        NotoSansKRMedium:require('./assets/fonts/NotoSansKR-Medium.otf'),
        NotoSansKRRegular:require('./assets/fonts/NotoSansKR-Regular.otf'),
        NotoSansKRThin:require('./assets/fonts/NotoSansKR-Thin.otf')
    }) //fonts 설정1
    if (!loaded) {
        return null;
    } // 설정 2


  return (
      <NavigationContainer>
          <OnboardingStack />
      </NavigationContainer>

  );
};

export default App;
