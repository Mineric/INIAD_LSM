import { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
const UncontrolledKanbanBoard = dynamic(() => import("../../comps/UncontrolledKanbanBoard/UncontrolledKanbanBoard"), {ssr: false})
import styles from "./layout.module.css"

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
    
    return (
      <div className={styles.page}>
        <UncontrolledKanbanBoard onBoardChange={(board) => {console.log("Update", board)}} initialBoard={board}></UncontrolledKanbanBoard>
      </div>
    )
}

export default ToDoBoard;