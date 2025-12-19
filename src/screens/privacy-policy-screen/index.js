import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {goBack} from 'navigation/navigation-ref';
import Regular from 'typography/regular-text';
import Medium from 'typography/medium-text';
import Bold from 'typography/bold-text';

const PrivacyPolicyScreen = () => {
  const loremText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.';

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="chevron-back" size={mvs(30)} color={colors.white} />
        </TouchableOpacity>
        <Medium
          label="Privacy Policy"
          color={colors.white}
          fontSize={mvs(18)}
          style={styles.headerTitle}
        />
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}>
        {/* Clause 1 */}
        <View style={styles.clauseContainer}>
          <Bold
            label="Clause 1"
            fontSize={mvs(16)}
            color={colors.blackgrey}
            style={styles.clauseTitle}
          />
          <Regular
            label={loremText}
            fontSize={mvs(14)}
            numberOfLines={20}

            color={colors.subteXTcOLOR}
            style={styles.clauseText}
          />
        </View>

        {/* Clause 2 */}
        <View style={styles.clauseContainer}>
        <Bold
            label="Clause 1"
            fontSize={mvs(16)}
            color={colors.blackgrey}
            style={styles.clauseTitle}
          />
          <Regular
            label={loremText}
            fontSize={mvs(14)}
            numberOfLines={20}

            color={colors.subteXTcOLOR}
            style={styles.clauseText}
          />
          <Regular
            label={loremText}
            fontSize={mvs(14)}
            color={colors.subteXTcOLOR}
            style={[styles.clauseText, styles.clauseTextMargin]}
          />
        </View>

        {/* Clause 3 */}
        <View style={styles.clauseContainer}>
        <Bold
            label="Clause 1"
            fontSize={mvs(16)}
            color={colors.blackgrey}
            style={styles.clauseTitle}
          />
          <Regular
            label={loremText}
            fontSize={mvs(14)}
            numberOfLines={20}

            color={colors.subteXTcOLOR}
            style={styles.clauseText}
          />
         
        </View>

        {/* Additional clauses can be added here */}
        <View style={styles.clauseContainer}>
        <Bold
            label="Clause 1"
            fontSize={mvs(16)}
            color={colors.blackgrey}
            style={styles.clauseTitle}
          />
          <Regular
            label={loremText}
            fontSize={mvs(14)}
            numberOfLines={20}

            color={colors.subteXTcOLOR}
            style={styles.clauseText}
          />
        </View>

        <View style={styles.clauseContainer}>
        <Bold
            label="Clause 1"
            fontSize={mvs(16)}
            color={colors.blackgrey}
            style={styles.clauseTitle}
          />
          <Regular
            label={loremText}
            fontSize={mvs(14)}
            numberOfLines={20}

            color={colors.subteXTcOLOR}
            style={styles.clauseText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(12),
    height: mvs(60),
  },
  backButton: {
    padding: mvs(5),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: mvs(40),
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    padding: mvs(20),
    paddingBottom: mvs(40),
  },
  clauseContainer: {
    marginBottom: mvs(24),
  },
  clauseTitle: {
    marginBottom: mvs(12),
    fontWeight: '700',
  },
  clauseText: {
    lineHeight: mvs(22),
  },
  clauseTextMargin: {
    marginTop: mvs(12),
  },
});

export default PrivacyPolicyScreen;

