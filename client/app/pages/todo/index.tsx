import { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
const UncontrolledKanbanBoard = dynamic(() => import("../../comps/UncontrolledKanbanBoard"), {ssr: false})

const boardData = {
    columns: [
      {
        id: 1,
        title: 'Backlog',
        cards: [
          {
            id: 1,
            title: 'Add card',
            description: 'Add capability to add a card in a column'
          },
        ]
      },
      {
        id: 2,
        title: 'Doing',
        cards: [
          {
            id: 2,
            title: 'Drag-n-drop support',
            description: 'Move a card between the columns'
          },
        ]
      }
    ]
  }

const ToDoBoard = () => {
    const [board, setBoard] = useState(boardData)
    
    return <UncontrolledKanbanBoard onBoardChange={(board) => {console.log("Update", board)}} initialBoard={board}></UncontrolledKanbanBoard>
}

export default ToDoBoard;