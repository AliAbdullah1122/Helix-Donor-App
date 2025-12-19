import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {colors} from 'config/colors';
import {Row} from 'components/atoms/row';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const RecordAudioScreen = props => {
    const navigation = useNavigation();
  const [hasRecorded, setHasRecorded] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(20); // in seconds
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTapToRecord = () => {
    // Simulate recording - in real app, start actual audio recording
    setRecordingTime(14); // Simulate 14 seconds recorded
    setHasRecorded(true);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // In real app, play/pause audio
  };

  const handleDelete = () => {
    setHasRecorded(false);
    setRecordingTime(0);
    setIsPlaying(false);
  };

  const handleRerecord = () => {
    setHasRecorded(false);
    setRecordingTime(0);
    setIsPlaying(false);
  };

  const handleSaveAndAdd = () => {
    // In real app, save the audio and navigate back
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      {/* Header */}
      <Row style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={mvs(24)} color={colors.textColorSecondary} />
        </TouchableOpacity>
        <Bold label="Record Audio" fontSize={mvs(18)} color={colors.textColorSecondary} />
        <View style={{width: mvs(24)}} />
      </Row>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Instructions */}
        <Bold
          label="Record a short intro"
          fontSize={mvs(18)}
          color={colors.textColorSecondary}
          style={styles.introTitle}
        />
        <Regular
        numberOfLines={10}
          label="Say hello, share a fun fact, or tell us what you're looking for."
          fontSize={mvs(14)}
          color={colors.textColorSecondary || '#8C8C8C'}
          style={styles.introSubtitle}
        />

        {/* Recording Box - Conditional Rendering */}
        {!hasRecorded ? (
          // Image 1: Initial Recording State
          <TouchableOpacity
            style={styles.recordingBox}
            activeOpacity={0.8}
            onPress={handleTapToRecord}>
                        <Regular
              label={`( ${formatTime(recordingTime)} / ${formatTime(30)} )`}
                          fontSize={mvs(14)}
                          color={colors.textColorSecondary}
              style={styles.timerText}
                        />
            <View style={styles.microphoneContainer}>
              <IMG.RecordMicrophone width={mvs(25)} height={mvs(25)} />
                    </View>
            <Regular
              label="Tap to Record"
              fontSize={mvs(16)}
              color={colors.textColorSecondary}
              style={styles.tapToRecordText}
            />
          </TouchableOpacity>
        ) : (
          // Image 2: Post-Recording State
          <View style={styles.recordingBoxRecord}>
            <Regular
              label={`( ${formatTime(recordingTime)} / ${formatTime(30)} )`}
              fontSize={mvs(14)}
              color={colors.textColorSecondary}
              style={styles.timerText}
            />
            <Row style={styles.audioPlayerRow}>
              <TouchableOpacity onPress={handlePlay} style={styles.playButton}>
                <IMG.RecordAudio width={mvs(378)} height={mvs(28)} />
                 {/* <IMG.Audio width={mvs(378)} height={mvs(28)} /> */}
              </TouchableOpacity>
              {/* <View style={styles.waveformContainer}>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((item, index) => {

                  const heights = [8, 12, 18, 25, 30, 28, 22, 15, 10, 8, 12, 20, 28, 32, 30, 25, 18, 12, 8, 10, 15, 22, 28, 30, 25, 20, 15, 10, 8, 12];
                  return (
                    <View
                      key={index}
                      style={[
                        styles.waveformBar,
                        {
                          height: mvs(heights[index % heights.length]),
                          backgroundColor: colors.textColorSecondary || '#9CA3AF',
                        },
                      ]}
                    />
                  );
                })}
              </View> */}
              {/* <Regular
                label={formatTime(audioDuration)}
                fontSize={mvs(14)}
                color={colors.textColorSecondary}
                style={styles.durationText}
              /> */}
            </Row>
            <Row style={styles.audioActionButtons}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}>
                <Medium
                  label="Delete"
                  fontSize={mvs(14)}
                  color="#EF4444"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rerecordButton}
                onPress={handleRerecord}>
                <Medium
                  label="Re-record"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </Row>
          </View>
        )}

        {/* PRO TIPS Section */}
        <View style={styles.proTipsSection}>
          <Bold
            label="PRO TIPS:"
            fontSize={mvs(14)}
            color={colors.textColorSecondary}
            style={styles.proTipsTitle}
          />
          <Regular
            label="• Keep it under 20 seconds."
            fontSize={mvs(14)}
            color={colors.textColorSecondary || '#8C8C8C'}
            style={styles.tipItem}
          />
          <Regular
            label="• Speak clearly and smile!"
            fontSize={mvs(14)}
            color={colors.textColorSecondary || '#8C8C8C'}
            style={styles.tipItem}
          />
          <Regular
            label="• Avoid background noise."
            fontSize={mvs(14)}
            color={colors.textColorSecondary || '#8C8C8C'}
            style={styles.tipItem}
          />
        </View>
      </ScrollView>

      {/* Save & Add Button */}
      <View style={styles.saveButtonContainer}>
        <PrimaryButton
          containerStyle={styles.saveButton}
          onPress={handleSaveAndAdd}
          title="Save & Add"
        />
      </View>
    </View>
  );
};

export default RecordAudioScreen;
