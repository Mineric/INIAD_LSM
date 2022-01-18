import { useState, useEffect } from "react";
// import dynamic from 'next/dynamic'
import Board from "@asseinfo/react-kanban"
// import '@asseinfo/react-kanban/dist/styles.css'
import { update } from "immutable";

const UncontrolledKanbanBoard = ({initialBoard, onBoardChange}) => {
    const updateBoard = (board) => {
      onBoardChange(board);
    }

      return (
        <Board
          allowRemoveCard
          
          initialBoard={initialBoard}
          allowAddCard={{ on: "top" }}
          onNewCardConfirm={draftCard => ({
            id: new Date().getTime(),
            ...draftCard
          })}
          onCardNew={console.log}
          onCardDragEnd={(board) => updateBoard(board)}
          onCardRemove={(board) => updateBoard(board)}
        />
      );
}

export default UncontrolledKanbanBoard;