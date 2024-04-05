import { Button } from '@ui-kitten/components';
import React from 'react';

import { CustomIcon } from '../ui/CustomIcon';
import { StyleProp, ViewStyle } from 'react-native';

interface Props{
    iconName: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>
}
export const FAB = ({style,iconName,onPress}:Props) => {
    return (
        <Button style={[style,{
            shadowColor:'black',
            shadowOffset:{width:0,height:10},
            shadowOpacity:0.4,
            shadowRadius:25,
            elevation:3,
            borderRadius:25            
        }]}
        
        onPress={onPress}
        accessoryLeft={
            <CustomIcon name={iconName} white ></CustomIcon>
        }
        />
        
        
    )
}