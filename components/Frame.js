import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import ProgressWebView from 'react-native-progress-webview'

import { smoothScroll } from '../lib/scroll.js'

export default function Frame({ currentUrl, webviewRef, handleStateChange }) {
  return (
    <View style={styles.container}>
      <ProgressWebView
        source={{ uri: currentUrl }}
        ref={webviewRef}
        onNavigationStateChange={handleStateChange}
        onLoad={() => webviewRef.current.injectJavaScript(smoothScroll)}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        allowsBackForwardNavigationGestures={true}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            color="black"
            size="large"
            style={styles.container}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
