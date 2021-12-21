import React, {useState, useRef} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';

// Import Youtube Players
import YouTube from 'react-native-youtube';

export const You = () => {
  const youtubePlayerRef: any = useRef();
  const singleVideoId = 'KhTCatAKVpk';
  const listVideoIds = ['KhTCatAKVpk', 'BfmIgt_kPvM', 'F9LwbmIWIr0'];

  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState(null);
  const [quality, setQuality] = useState(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [containerMounted, setContainerMounted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(null);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => {
          if (!containerMounted) setContainerMounted(true);
          if (containerWidth !== width) setContainerWidth(width);
        }}
      >
        {containerMounted && (
          <YouTube
            ref={youtubePlayerRef}
            // You must have an API Key
            // AIzaSyBxnY7t3M5lD9CAgevDVE_XmfWcfhLK9lE
            apiKey="AIzaSyBxnY7t3M5lD9CAgevDVE_XmfWcfhLK9lE"
            // Un-comment one of videoId / videoIds / playlist.
            // videoId={singleVideoId}
            videoIds={listVideoIds}
            // playlistId="PLF797E961509B4EB5"
            play={isPlaying}
            loop={isLooping}
            fullscreen={fullscreen}
            controls={1}
            style={[
              styles.player,
              {
                height: PixelRatio.roundToNearestPixel(
                  containerWidth / (16 / 9),
                ),
              },
            ]}
            onError={(e: any) => setError(e.error)}
            onReady={(e: any) => setIsReady(true)}
            onChangeState={(e: any) => setStatus(e.state)}
            onChangeQuality={(e: any) => setQuality(e.quality)}
            onChangeFullscreen={e => setFullscreen(e.isFullscreen)}
            onProgress={e => {
              setDuration(e.duration);
              setCurrentTime(e.currentTime);
            }}
          />
        )}

        <Text style={styles.titleText}>
          Example of YouTube Video Integration in React Native
        </Text>

        {/* Playing / Looping */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsPlaying(isPlaying => !isPlaying)}
          >
            <Text style={styles.buttonText}>
              {status == 'playing' ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsLooping(isLooping => !isLooping)}
          >
            <Text style={styles.buttonText}>
              {isLooping ? 'Looping' : 'Not Looping'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Previous / Next video */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              youtubePlayerRef.current &&
              youtubePlayerRef.current.previousVideo()
            }
          >
            <Text style={styles.buttonText}>Previous Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              youtubePlayerRef.current && youtubePlayerRef.current.nextVideo()
            }
          >
            <Text style={styles.buttonText}>Next Video</Text>
          </TouchableOpacity>
        </View>

        {/* Go To Specific time in played video with seekTo() */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              youtubePlayerRef.current && youtubePlayerRef.current.seekTo(15)
            }
          >
            <Text style={styles.buttonText}>15 Seconds</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              youtubePlayerRef.current &&
              youtubePlayerRef.current.seekTo(2 * 60)
            }
          >
            <Text style={styles.buttonText}>2 Minutes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              youtubePlayerRef.current &&
              youtubePlayerRef.current.seekTo(15 * 60)
            }
          >
            <Text style={styles.buttonText}>15 Minutes</Text>
          </TouchableOpacity>
        </View>

        {/* Play specific video in a videoIds array by index */}
        {youtubePlayerRef.current &&
          youtubePlayerRef.current.props.videoIds &&
          Array.isArray(youtubePlayerRef.current.props.videoIds) && (
            <View style={styles.buttonGroup}>
              {youtubePlayerRef.current.props.videoIds.map((videoId, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.button}
                  onPress={() =>
                    youtubePlayerRef.current &&
                    youtubePlayerRef.current.playVideoAt(i)
                  }
                >
                  <Text
                    style={[styles.buttonText, styles.buttonTextSmall]}
                  >{`Video ${i}`}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

        {/* Fullscreen */}
        {!fullscreen && (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setFullscreen(true)}
            >
              <Text style={styles.buttonText}>Set Fullscreen</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.instructions}>
          {isReady ? 'Player is ready' : 'Player setting up...'}
        </Text>
        <Text style={styles.instructions}>Status: {status}</Text>
        <Text style={styles.instructions}>Quality: {quality}</Text>

        {/* Show Progress */}
        <Text style={styles.instructions}>
          Progress:
          {Math.trunc(currentTime)}s ({Math.trunc(duration / 60)}:
          {Math.trunc(duration % 60)}s)
        </Text>

        <Text style={styles.instructions}>
          {error ? 'Error: ' + error : ''}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});
