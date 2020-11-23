import styled from 'styled-components';

export const Item = styled.div`
    border-radius: 10px;
    background-color: ${({theme})=> theme.palette.grey};
    height: 100px;
    width: 315px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
`;