import { View, StyleSheet, ActivityIndicator, ColorValue } from 'react-native'
import React from 'react'
import { colors } from 'config/colors'
import DotWaveLoader from './ModernCircleLoader'

type props = {
    size?: number | "small" | "large" | undefined
    color?: ColorValue | undefined
    variant?: 'default' | 'modern' // Add variant prop to choose loader style
}

export const Loader = (props: props) => {
    const { size = 'small', color = colors.primary, variant = 'default' } = props;
    
        return <DotWaveLoader size={size} color={color} />;

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})