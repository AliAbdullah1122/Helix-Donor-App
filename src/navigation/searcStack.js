import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchFilterScreen from 'screens/search-filter-screen';
import SearchResultFilterScreen from 'screens/search-ResultFilterscreen';
import SearchScreen from 'screens/search-screen';
import SearchScreenResult from 'screens/search-screen-result';
import SearchScreenTap from 'screens/search-screen-tap';

const SearchStack = createNativeStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
      />
      <SearchStack.Screen
        name="SearchResultFilterScreen"
        component={SearchResultFilterScreen}
      />
      <SearchStack.Screen
        name="SearchScreenTap"
        component={SearchScreenTap}
      />
      <SearchStack.Screen
        name="SearchScreenResult"
        component={SearchScreenResult}
      />
      
    </SearchStack.Navigator>
  );
};
export default SearchStackNavigator;