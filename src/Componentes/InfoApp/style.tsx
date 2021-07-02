import styled from 'styled-components';

export const Title = styled.h3`
    font-weight: bolder;
    font-family: 'Kalam', cursive;
    font-size: 40px;
    border-bottom: 3px solid #3CB371;
    border-right: 5px solid #3CB371;
    padding: 15px;
    border-radius: 15px;
    @media screen and (max-width: 500px){
        font-size: 23px;
    }
`;

export const Paragrafo = styled.p`
    font-family: 'Kalam', cursive;
    font-size: 22px;
    @media screen and (max-width: 500px){
        font-size: 18px;
    }
`;

export const DivCabecalho = styled.div`
    text-align: center;
    img{
        width: 150px;
        height: 50px;
    }
`;