import React, { useState } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend';
import MovableItem from '../MovableItem';
import Column from '../Column';

export default function Kanban () {
const [items, setItems] = useState([
    {id: 1, name: 'Item 1', column: 'Column 1'},
    {id: 2, name: 'Item 2', column: 'Column 1'},
    {id: 3, name: 'Item 3', column: 'Column 1'},
  ]);

  const isMobile = window.innerWidth < 600;

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const copiedStateArray = [...prevState];
        
        const prevItems = copiedStateArray.splice(hoverIndex, 1, dragItem);

        copiedStateArray.splice(dragIndex, 1, prevItems[0]);

        return copiedStateArray;
      })
    }
  }

  const returnItemsForColumn = (columnName) => {
    return items
      .filter((item)=> item.column === columnName)
      .map((item, index)=> <MovableItem 
      key={item.id} 
      name={item.name} 
      setItems={setItems}
      index={index}
      moveCardHandler={moveCardHandler}
      />)
  }

  return (
    <div className="container">
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Column title="Column 1" className="column first-column">
          {returnItemsForColumn('Column 1')}
        </Column>

        <Column title="Column 2" className="column second-column">
          {returnItemsForColumn('Column 2')}
        </Column>
      </DndProvider>
    </div>
  );
}