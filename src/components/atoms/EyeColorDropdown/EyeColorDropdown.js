import fonts from 'assets/fonts';
import { mvs } from 'config/metrices';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const OPTIONS = ['Slim', 'Athletic', 'Average', 'Curvy', 'Large'];

const EyeColorChips = () => {
  const [selected, setSelected] = useState('Slim');

  return (
    <View style={styles.container}>
      <View style={styles.chipsContainer}>
        {OPTIONS.map(item => {
          const isSelected = selected === item;

          return (
            <TouchableOpacity
              key={item}
              activeOpacity={0.8}
              onPress={() => setSelected(item)}
              style={[
                styles.chip,
                isSelected && styles.selectedChip,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.selectedText,
                ]}
              >
                {item}
              </Text>

              {isSelected && (
                <Text style={styles.closeIcon}>✕</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default EyeColorChips;
const styles = StyleSheet.create({
  container: {
    // padding: mvs(16),
  },

  title: {
    fontSize: mvs(16),
    fontWeight: '500',
    color: '#3B4CCA',
    marginBottom: mvs(12),
  },

  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mvs(14),
    paddingVertical: mvs(8),
    borderRadius: mvs(24),
    borderWidth: 1,
    borderColor: '#8C8C8C',
    backgroundColor: '#FFFFFF',
    marginRight: mvs(12),
    marginBottom: mvs(6),
  },

  chipText: {
    fontSize: mvs(12),
    color: '#8C8C8C',
    fontFamily:fonts.regular,
    fontWeight: '400',
  },

  selectedChip: {
    backgroundColor: '#3A3E90', // exact purple tone
    borderColor: '#3A3E90',
    borderWidth: 1,
  },

  selectedText: {
    color: '#FFFFFF',
    marginRight: mvs(6),
  },

  closeIcon: {
    color: '#FFFFFF',
    fontSize: mvs(10),
    marginLeft: mvs(4),
  },
});
