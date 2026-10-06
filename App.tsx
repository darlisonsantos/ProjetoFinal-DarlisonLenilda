import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, View} from 'react-native';
import {RootStackParamList} from './src/types';
import {HomeScreen} from './src/screens/HomeScreen';
import {PantryScreen} from './src/screens/PantryScreen';
import {AddIngredientScreen} from './src/screens/AddIngredientScreen';
import {RecipesScreen} from './src/screens/RecipesScreen';
import {RecipeDetailScreen} from './src/screens/RecipeDetailScreen';
import {MoveScreen} from './src/screens/MoveScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';
import {loadPantry, loadFavorites} from './src/storage/localStore';
import {useNutriStore} from './src/storage/store';
import {colors} from './src/styles/theme';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App(){
 const [ready,setReady]=useState(false);
 const setPantry=useNutriStore(s=>s.setPantry); const setFavorites=useNutriStore(s=>s.setFavorites);
 useEffect(()=>{Promise.all([loadPantry(),loadFavorites()]).then(([p,f])=>{setPantry(p);setFavorites(f);setReady(true)}).catch(()=>setReady(true))},[]);
 if(!ready)return <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:colors.bg}}><ActivityIndicator color={colors.green}/></View>;
 return <NavigationContainer theme={{...DefaultTheme,colors:{...DefaultTheme.colors,background:colors.bg,card:colors.bg,text:colors.ink,primary:colors.green}}}>
  <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false,contentStyle:{backgroundColor:colors.bg},animation:'slide_from_right'}}>
   <Stack.Screen name="Home" component={HomeScreen}/><Stack.Screen name="Pantry" component={PantryScreen}/><Stack.Screen name="AddIngredient" component={AddIngredientScreen}/><Stack.Screen name="Recipes" component={RecipesScreen}/><Stack.Screen name="RecipeDetail" component={RecipeDetailScreen}/><Stack.Screen name="Move" component={MoveScreen}/><Stack.Screen name="Profile" component={ProfileScreen}/>
  </Stack.Navigator>
 </NavigationContainer>
}