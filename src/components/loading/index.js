import styled from 'styled-components/native';

import { ViewCustom, CustomActivityIndicator } from './styles';

const Loading = ({navigation}) => {

    return (
        <ViewCustom>
            <CustomActivityIndicator size="large" color={props => props.theme.primary} />
        </ViewCustom>
    );
};

export default Loading;