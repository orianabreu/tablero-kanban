import styled from 'styled-components';

export const MyColumn = styled.div`
    width: 25%;
    height: 85vh;
    background-color: ${({theme})=> theme.palette.lightblue};
    padding: 15px;
    margin-right: 10px;
    border-radius: 10px;
    box-shadow: 4px 4px rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

