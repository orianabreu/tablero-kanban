import React, { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";

export default function MovableItem ({ name, index, moveCardHandler, setItems }) {

    const changeItemColumn = (currentItem, columnName) => {
      setItems((prevState) => {
        return prevState.map(e => {
          return {
            ...e,
            column: e.name ===  currentItem.name ? columnName : e.column,
          }
        })
      })
    }
  
    const ref = useRef(null);
  
    const [, drop] = useDrop({
      accept: 'Our first type',
      hover(item, monitor) {
          if (!ref.current) {
              return;
          }
          const dragIndex = item.index;
          const hoverIndex = index;
          // Don't replace items with themselves
          if (dragIndex === hoverIndex) {
              return;
          }
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // Determine mouse position
          const clientOffset = monitor.getClientOffset();
          // Get pixels to the top
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          // Only perform the move when the mouse has crossed half of the items height
          // When dragging downwards, only move when the cursor is below 50%
          // When dragging upwards, only move when the cursor is above 50%
          // Dragging downwards
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return;
          }
          // Dragging upwards
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return;
          }
          // Time to actually perform the action
          moveCardHandler(dragIndex, hoverIndex);
          // Note: we're mutating the monitor item here!
          // Generally it's better to avoid mutations,
          // but it's good here for the sake of performance
          // to avoid expensive index searches.
          item.index = hoverIndex;
      },
  });
  
    const [{ isDragging }, drag] = useDrag({
      item: { index, name, type: "Our first type" },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (dropResult && dropResult.name === "Column 1") {
          changeItemColumn(item, 'Column 1');
        } else {
          changeItemColumn(item, 'Column 2');
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    });
  
    const opacity = isDragging ? 0.4 : 1;
  
    drag(drop(ref));
  
    return (
      <div ref={ref} className="movable-item" style={{ opacity }}>
        {name}
      </div>
    );
  };