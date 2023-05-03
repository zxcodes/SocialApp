import {Spacer, AppText} from '@app/components';
import {FlexContainer, MainContainer} from '@app/containers';
import {Colors} from '@app/utils';
import React from 'react';

export default function ChatScreen(): JSX.Element {
  return (
    <MainContainer backgroundColor={Colors.JustWhite} fillHeight>
      <Spacer value={20} />
      <FlexContainer position="center" fillHeight>
        <AppText>Chats</AppText>
      </FlexContainer>
    </MainContainer>
  );
}
