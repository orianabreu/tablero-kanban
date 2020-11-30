import React from 'react';
import * as S from './styles';
import { useDrag } from "react-dnd";

export default function MovableItem() {
    
    const [{ isDragging }, drag] = useDrag({
        item: { name: 'Any custom name', type: 'Irrelevant, for now' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <S.Item ref={drag} style={{ opacity }}>
            Movable Item
        </S.Item>
    )
}