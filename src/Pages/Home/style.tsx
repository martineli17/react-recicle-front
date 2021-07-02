import styled from 'styled-components';

export const Container = styled.div`
        width: 100%;
        height: 100%;
        margin-bottom: 2%;
        @media screen and (max-width: 500px){
            margin-bottom: 5%;
        }
        .titleInfo{
            margin-bottom: 20px;
        }
        
        .info{
           margin-top: 3%;
           width: 100%;
           height: 100%;
           padding: 20px;
           @media screen and (max-width: 500px){
             margin-top: 8%;
           }
        }

        .login{
            width: 100%;
            height: 100%;
            background-color: #F5F5F5;
            margin-left: 0 !important;
            margin-right: 0 !important;
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
            padding: 50px;
            @media screen and (max-width: 500px){
                margin-top: 0;
                border-bottom-left-radius: 20px;
                border-bottom-right-radius: 20px;
            }
        }
`;