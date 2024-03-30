import { useNavigation } from '@react-navigation/native';
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React, { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomIcon } from '../components/ui/CustomIcon';
interface Props extends PropsWithChildren {
    title: string;
    subtitle: string;
    rightAction?: () => void,
    rightActionIcon?: string
}
export const MainLayout = ({ title, subtitle, rightAction, rightActionIcon, children }: Props) => {
    const { top } = useSafeAreaInsets();
    const {canGoBack,goBack} = useNavigation();
    
    
    const renderBackAction = () => (
               <TopNavigationAction icon={<CustomIcon name='arrow-back-outline'></CustomIcon>} onPress={goBack}   />
    )

    const RenderRightAction = () => {
        if (rightAction=== undefined || rightActionIcon=== undefined) {
            return null;
        }        
        return <TopNavigationAction icon={<CustomIcon name={rightActionIcon}/>} onPress={rightAction}   />
        }

    return (
        <Layout style={{ paddingTop: top }}>
            <TopNavigation title={title} subtitle={subtitle} alignment='center'  accessoryRight={()=><RenderRightAction/>}  accessoryLeft={canGoBack()?renderBackAction:undefined} ></TopNavigation>
            <Divider />
            <Layout style={{height:'100%',backgroundColor:'white'}}>
                {children}
            </Layout>

        </Layout>
    )
}