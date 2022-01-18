import { useState, useEffect } from "react";
// import dynamic from 'next/dynamic'
import Board from "@asseinfo/react-kanban"
// import '@asseinfo/react-kanban/dist/styles.css'
import Card from "./Card"

const UncontrolledKanbanBoard = ({initialBoard, onBoardChange, 
    onCardNew=undefined,
    onCardDragEnd=undefined,
    onCardRemove=undefined,
    }) => {
    const updateBoard = (board) => {
      onBoardChange(board);
    }

      return (
        <Board
          allowRemoveCard
          initialBoard={initialBoard}
          allowAddCard={{ on: "top" }}
          onNewCardConfirm={draftCard => ({
            ...draftCard,
            id: new Date().getTime(),
            deadline: draftCard.deadline.toISOString().split('T')[0],
          })}
          onCardNew={(board, column, card) => {
            if(onCardNew){
              onCardNew(board, column, card);
            }
            console.log("New card", board, column, card);
          }}
          onCardDragEnd={(board, card, source, destination) => {
            if(onCardDragEnd){
              onCardDragEnd(board, card, source, destination);
            }
            console.log("Drag card", board, card);
          }}
          onCardRemove={(board, card, column) => {
            console.log("Remove card", board, card);
            if(onCardRemove){
              onCardRemove(board, card, column);
            }
            
          }}
          renderCard={(card, {removeCard, dragging}) => (
            <Card card={card} allowRemoveCard={true} onCardRemove={removeCard} dragging={dragging}></Card>
          )}
        />
      );
}

export default UncontrolledKanbanBoard;