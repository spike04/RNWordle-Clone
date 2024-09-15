import Icon from '@/assets/images/wordle-icon.svg'
import SubscribeModal from '@/components/SubscribeModal'
import ThemedText from '@/components/ThemedText'
import { Colors } from '@/constants/Colors'
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { format } from 'date-fns'
import { Link } from 'expo-router'
import { useRef } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'

export default function Index() {
  const colorScheme = useColorScheme()
  const subscribeModalRef = useRef<BottomSheetModal | null>(null)
  const backgroundColor = Colors[colorScheme ?? 'light'].background
  const textColor = Colors[colorScheme ?? 'light'].text
  const { signOut } = useAuth()

  const handlePresentSubscribeModal = () => {
    subscribeModalRef.current?.present()
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SubscribeModal ref={subscribeModalRef} />

      <View style={styles.header}>
        <Icon width={100} height={70} />
        <ThemedText style={styles.title}>Worlde</ThemedText>
        <ThemedText style={styles.text}>
          Get 6 changes to guess a 5-letter word.
        </ThemedText>
      </View>

      <View>
        <ThemedText style={styles.text}>Start a new game</ThemedText>
      </View>
      <View style={styles.menu}>
        <Link
          href="/game"
          asChild
          style={[
            styles.btn,
            { backgroundColor: colorScheme === 'light' ? '#000' : '#4a4a4a' },
          ]}
        >
          <TouchableOpacity>
            <Text style={[styles.btnText, { color: '#fff' }]}>Play</Text>
          </TouchableOpacity>
        </Link>

        <SignedOut>
          <Link
            href="/login"
            asChild
            style={[styles.btn, { borderColor: textColor }]}
          >
            <TouchableOpacity>
              <ThemedText style={[styles.btnText]}>Log in</ThemedText>
            </TouchableOpacity>
          </Link>
        </SignedOut>

        <SignedIn>
          <TouchableOpacity
            style={[styles.btn, { borderColor: textColor }]}
            onPress={() => signOut()}
          >
            <ThemedText style={[styles.btnText]}>Sign Out</ThemedText>
          </TouchableOpacity>
        </SignedIn>

        <TouchableOpacity
          style={[styles.btn, { borderColor: textColor }]}
          onPress={handlePresentSubscribeModal}
        >
          <ThemedText style={[styles.btnText]}>Subscribe</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <ThemedText style={styles.footerDate}>
          {format(new Date(), 'MMMM d, yyyy')}
        </ThemedText>
        <ThemedText style={styles.footerText}>No. 1151</ThemedText>
        <ThemedText style={styles.footerText}>Edited by Simon Grimm</ThemedText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 60,
    gap: 40,
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontFamily: 'FrankRuhlLibre_800ExtraBold',
    fontSize: 40,
  },
  text: {
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'FrankRuhlLibre_500Medium',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 1,
    width: '60%',
    maxWidth: 200,
  },
  btnText: {
    padding: 14,
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#333',
  },
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  footerDate: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})
