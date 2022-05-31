import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CreateList from "./CreateList/CreateList";
import List from "./List/List";
import './KanbanBoard.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { onDragEndList } from "../../kanbanSlice";
const KanbanBoard = () => {
    let { id } = useParams();
    const dispatch = useDispatch();
    let board = useSelector(state => state.kanban.boards[id]);
    let { name, lists } = board;
    const handleOnDrag = result => {
        if (!result.destination) return
        let payload = {
            BIndex: id,
            DIndex: result.destination.index,
            SIndex: result.source.index
        }
        dispatch(onDragEndList(payload))
    }


    return (
        <div>
            <div id="board_title">
                <h2>{name}</h2>
            </div>
            <div id="content">
                <DragDropContext onDragEnd={handleOnDrag}>
                    <Droppable droppableId="droppable_lists" direction="horizantal" type="LIST">
                        {(provided, snapshotDrop) => {
                            return (
                                <div id="lists" {...provided.droppableProps} ref={provided.innerRef}>
                                    <DragDropContext onDragEnd={result => console.log(result)}>

                                        {lists.map((list, LIndex) => <List LIndex={LIndex} BIndex={id} />)}

                                        {provided.placeholder}
                                    </DragDropContext>
                                </div>
                            )
                        }}
                    </Droppable>
                    <CreateList />
                </DragDropContext>
            </div>
        </div >
    )
}

export default KanbanBoard;