import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Button from '$components/common/Button';

import styles from './index.module.scss';

const dragIcon = require('$assets/images/icons/drag-icon.svg');
const settingsIcon = require('$assets/images/icons/settings.svg');

// utility functions
const grid = 8;

const handleReorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const getItemStyle = (isDragging, draggableStyle, isLast) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#FFFFFF",
  borderBottom: !isLast ? "1px solid #EAEAEA" : '',
  // styles we need to apply on draggables
  ...draggableStyle
});

 const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "#FFFFFF",
    padding: grid,
  });

// TEMP
// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

const DraggableList = (props) => {
  // props
  const { list } = props;

  // state
  const [items, setItems] = useState(getItems(15));

  // handlers
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = handleReorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  }

  const handleView = (item, index) => {
    console.log('item ', item, index);
  }

  // render
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable
        droppableId="droppable"
      >
        {
          (provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {
                items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                  >
                    {
                      (innerProvided, innerSnapshot) => (
                        <div
                          ref={innerProvided.innerRef}
                          {...innerProvided.draggableProps}
                          {...innerProvided.dragHandleProps}
                          style={getItemStyle(
                            innerSnapshot.isDragging,
                            innerProvided.draggableProps.style,
                            index === items.length - 1
                          )}
                        >
                          <div className="d-flex">
                            <div>
                              <img
                                className={styles.dragIcon}
                                src={dragIcon}
                                alt=""
                              />
                            </div>
                            <div className={`d-flex flex-column ${styles.contentWrapper}`}>{item.content}</div>
                            <div>
                              <Button
                                onClick={() => handleView(item, index)}
                                isCustom
                                hideDefault
                              >
                                <img
                                  className={styles.settingsIcon}
                                  src={settingsIcon}
                                  alt=""
                                />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </Draggable>
                ))
              }
              { provided.placeholder}
            </div>
          )}
      </Droppable>
    </DragDropContext>
  );
}

export default DraggableList;
