import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
    input{
        color: white;
    }
    table{
        width: 90%;
    }
    .card-hover:hover{
        box-shadow: 0.5px 0.5px 6px 0.5px lightgray;
    }
    .card-hover{
        transition: box-shadow 0.5s;   
    }
`;