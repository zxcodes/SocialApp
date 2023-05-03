/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

type FlexContainerProps = {
  position?: 'start' | 'center' | 'end' | 'rowBetween' | 'columnBetween';
  direction?: 'row';
  fillHeight?: boolean;
  style?: ViewStyle;
  children: React.ReactNode | React.ReactNode[];
};

export default ({
  children,
  position,
  direction,
  fillHeight,
  style,
}: FlexContainerProps) => {
  return (
    <View
      style={
        position === 'start'
          ? {
              ...styles.flexStart,
              flexDirection: direction === 'row' ? 'row' : 'column',
              height: fillHeight ? '100%' : 'auto',
              ...style,
            }
          : position === 'center'
          ? {
              ...styles.flexCenter,
              flexDirection: direction === 'row' ? 'row' : 'column',
              height: fillHeight ? '100%' : 'auto',
              ...style,
            }
          : position === 'end'
          ? {
              ...styles.flexEnd,
              flexDirection: direction === 'row' ? 'row' : 'column',
              height: fillHeight ? '100%' : 'auto',
              ...style,
            }
          : position === 'rowBetween'
          ? {
              ...styles.flex,
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: fillHeight ? '100%' : 'auto',
              alignItems: 'center',
              ...style,
            }
          : position === 'columnBetween'
          ? {
              ...styles.flex,
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: fillHeight ? '100%' : 'auto',
              alignItems: 'center',
              ...style,
            }
          : {
              height: fillHeight ? '100%' : 'auto',
              ...styles.flex,
              flexDirection: direction === 'row' ? 'row' : 'column',
              alignItems: 'center',
              ...style,
            }
      }>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
  },
  flexStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

// <FlexContainer  fillHeight position=start|center|end
// rowBetween|columnBetween direction=row|column style >
//   {children}
// </FlexContainer>
