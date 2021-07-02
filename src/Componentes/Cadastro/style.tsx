import styled from 'styled-components';
import Select from '@material-ui/core/Select';

export const SelectCustom = styled(Select)`
    width: 70%;

    @media screen and (max-width: 500px){
        width: 70%;
    }
`;

export const Container = styled.div`
   .input-field{
       width: 70%;
   }
`;