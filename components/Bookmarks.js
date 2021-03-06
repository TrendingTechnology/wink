import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet
} from 'react-native'
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { BlurView } from 'expo-blur'

import BookmarkItem from './BookmarkItem.js'
import { lightHaptics } from '../lib/alert.js'

import colors from '../config/colors.js'

export default function Bookmarks({
  bookmarks,
  handleSpacePress,
  handleBookmarkPress,
  handleDelete,
  handleReset
}) {
  const [editing, setEditing] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }, [fadeAnim])

  const windowWidth = Dimensions.get('window').width
  const numColumns = Math.floor(windowWidth / 150)

  const renderItem = ({ item }) => (
    <BookmarkItem
      handleBookmarkLongPress={() => {
        if (editing) return
        setEditing(true)
        lightHaptics()
      }}
      {...{ handleBookmarkPress, editing, handleDelete, ...item }}
    />
  )

  return (
    <TouchableWithoutFeedback onPress={handleSpacePress}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <BlurView intensity={100} tint="dark" style={styles.box}>
          <FlatList
            data={bookmarks}
            renderItem={renderItem}
            keyExtractor={(item) => item.url}
            numColumns={numColumns}
            key={numColumns} // rerender when numColumns changes
            pagingEnabled={true}
            pinchGestureEnabled={false}
            keyboardShouldPersistTaps="always"
          />
          <View style={styles.btns}>
            {editing && ( // only show reset button when editing
              <TouchableOpacity style={styles.btn} onPress={handleReset}>
                <Ionicons
                  name="ios-nuclear"
                  size={24}
                  color={colors.bg_white}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setEditing((editing) => !editing)
                lightHaptics()
              }}
            >
              {editing ? (
                <MaterialIcons name="done" size={24} color={colors.bg_white} />
              ) : (
                <MaterialCommunityIcons
                  name="square-edit-outline"
                  size={24}
                  color={colors.bg_white}
                />
              )}
            </TouchableOpacity>
          </View>
        </BlurView>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 0,
    width: '100%',
    height: '50%'
  },
  box: {
    flexGrow: 0,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    padding: 10
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
    height: 25
  },
  btn: {
    marginLeft: 10,
    paddingHorizontal: 10
  }
})
