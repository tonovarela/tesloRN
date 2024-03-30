import { Layout, Spinner } from '@ui-kitten/components';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const FullScreenLoader= () => {
    const {top } = useSafeAreaInsets();
return (
<Layout  style={{flex:1,alignItems:'center',marginTop:top+100}}>
    <Spinner size='giant'/>
</Layout>
)
}