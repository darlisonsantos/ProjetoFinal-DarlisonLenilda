import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ingredient} from '../types';
const PANTRY_KEY='nutrimov:pantry:v1'; const FAV_KEY='nutrimov:favorites:v1';
export async function loadPantry():Promise<Ingredient[]>{const raw=await AsyncStorage.getItem(PANTRY_KEY);return raw?JSON.parse(raw):[]}
export async function savePantry(items:Ingredient[]){await AsyncStorage.setItem(PANTRY_KEY,JSON.stringify(items))}
export async function loadFavorites():Promise<string[]>{const raw=await AsyncStorage.getItem(FAV_KEY);return raw?JSON.parse(raw):[]}
export async function saveFavorites(items:string[]){await AsyncStorage.setItem(FAV_KEY,JSON.stringify(items))}