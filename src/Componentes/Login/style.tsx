import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

export const ButtonCustom = styled(Button)`
    margin-top: 0px;
    font-weight: bolder;
    width: 200px;
`;

export const Imagem = styled.img`
    margin-bottom: 1.5%;
    width: 30%;
`;

export const Container = styled.div`
   .input-field{
       width: 20%;

       @media screen and (max-width: 500px){
        width: 90%;
    }
   }
`;