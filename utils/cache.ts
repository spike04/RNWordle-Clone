import * as SecureStore from 'expo-secure-store'
import { TokenCache } from '@clerk/clerk-expo/dist/cache/types'
import { Platform } from 'react-native'

const createTokenCache = (): TokenCache => {
  return {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key)
        if (item) {
          console.log(`${key} was used 🔐 \n`)
        } else {
          console.log('No values stored under key: ' + key)
        }
        return item
      } catch (error) {
        console.error('SecureStore get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    async saveToken(key: string, value: string) {
      return SecureStore.setItemAsync(key, value)
    },
  }
}

// SecureStore is not supported on the web
// https://github.com/expo/expo/issues/7744#issuecomment-611093485
export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined
