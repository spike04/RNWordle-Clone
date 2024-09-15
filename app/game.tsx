import OnScreenKeyboard from '@/components/OnScreenKeyboard'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'

const ROW = 6

export default function Game() {
  const colorScheme = useColorScheme()
  const backgroundColor = Colors[colorScheme ?? 'light'].gameBg
  const textColor = Colors[colorScheme ?? 'light'].text
  const grayColor = Colors[colorScheme ?? 'light'].gray

  const [rows, setRows] = useState<string[][]>(
    new Array(ROW).fill(new Array(5).fill('a')),
  )
  const [curRow, setCurRow] = useState(0)
  const [curCol, setCurCol] = useState(0)

  const [greenLetters, setGreenLetters] = useState<string[]>([])
  const [yellowLetters, setYellowLetters] = useState<string[]>([])
  const [grayLetters, setGrayLetters] = useState<string[]>([])

  const addKeys = (key: string) => {
    console.log('addKeys', key)
    // TODO
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.headerIcon}>
              <Ionicons
                name="help-circle-outline"
                size={28}
                color={textColor}
              />
              <Ionicons name="podium-outline" size={28} color={textColor} />
              <Ionicons name="settings-sharp" size={28} color={textColor} />
            </View>
          ),
        }}
      />

      <View style={styles.gameField}>
        {rows.map((row, rowIndex) => (
          <View style={styles.gameFieldRow} key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <View key={`cell-${rowIndex}-${cellIndex}`} style={styles.cell}>
                <Text style={styles.cellText}>{cell}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <OnScreenKeyboard
        onKeyPressed={() => {}}
        greenLetters={greenLetters}
        yellowLetters={yellowLetters}
        grayLetters={grayLetters}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
  },
  headerIcon: {
    flexDirection: 'row',
    gap: 10,
  },
  gameField: {
    alignItems: 'center',
    gap: 8,
  },
  gameFieldRow: {
    flexDirection: 'row',
    gap: 8,
  },
  cell: {
    width: 62,
    height: 62,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    textTransform: 'uppercase',
    fontSize: 30,
    fontWeight: 'bold',
  },
})
