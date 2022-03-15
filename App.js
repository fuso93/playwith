import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import OnboardingStack from "./stacks/OnboardingStack";

const App = () => {
  return (
      <NavigationContainer>
          <OnboardingStack />
      </NavigationContainer>

  );
};

export default App;
