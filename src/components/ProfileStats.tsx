/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ViewStyle} from 'react-native';
import AppText from './AppText';

type ProfileStatsProps = {
  stat: string;
  indicatorText: string;
  style?: ViewStyle;
};

function ProfileStats({
  stat,
  indicatorText,
  style,
}: ProfileStatsProps): JSX.Element {
  return (
    <View style={{...style}}>
      <AppText medium poppinsBold style={{textAlign: 'center'}}>
        {stat}
      </AppText>
      <AppText small>{indicatorText}</AppText>
    </View>
  );
}
export default ProfileStats;
