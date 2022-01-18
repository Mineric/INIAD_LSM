import { useState, useEffect } from "react";
// import dynamic from 'next/dynamic'
import Board from "@asseinfo/react-kanban"
// import '@asseinfo/react-kanban/dist/styles.css'
import { update } from "immutable";
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
            id: new Date().getTime(),
            name: draftCard.title,
            ...draftCard
          })}
          onCardNew={(board, card) => {
            if(onCardNew){
              onCardNew(board, card);
            }
            console.log("New card", board, card);
          }}
          onCardDragEnd={(board, card, source, destination) => {
            if(onCardDragEnd){
              onCardDragEnd(board, card, source, destination);
            }
            console.log("Drag card", board, card);
          }}
          onCardRemove={(board, card, column) => {
            if(onCardRemove){
              onCardRemove(board, card, column);
            }
            console.log("Remove card", board, card);
          }}
          renderCard={(card, {removeCard, dragging}) => (
            <Card card={card} allowRemoveCard={true} onCardRemove={removeCard} dragging={dragging}></Card>
          )}
        />
      );
}

export default UncontrolledKanbanBoard;