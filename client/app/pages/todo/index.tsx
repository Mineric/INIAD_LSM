import { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
const UncontrolledKanbanBoard = dynamic(() => import("../../comps/UncontrolledKanbanBoard/UncontrolledKanbanBoard"), { ssr: false })
import styles from "./layout.module.css"
import { fetchWrapper, getAPIURL } from "../../helpers";

const boardData = {
  columns: [
    {
      id: 1,
      title: 'To do',
      cards: [
        {
          id: 1,
          name: 'Add card',
          description: 'Add capability to add a card in a column',
          "deadline": "2012-06-19",
        },
      ]
    },
    {
      id: 2,
      title: 'Doing',
      cards: [
        {
          id: 2,
          name: 'Drag-n-drop support',
          description: 'Move a card between the columns',
          "deadline": "2012-06-19",
        },
      ]
    }
  ]
}

const TODO = 0;
const DOING = 1;
const DONE = 2;

const ToDoBoard = () => {
  const [board, setBoard] = useState({})
  const [loading, setLoading] = useState(true);
  const transformData = (data) => {
    return {
      columns: [
        {
          id: 1,
          title: "To do",
          cards: data.filter(task => task.status === TODO)
        },
        {
          id: 2,
          title: "Doing",
          cards: data.filter(task => task.status === DOING)
        },
        {
          id: 3,
          title: "Done",
          cards: data.filter(task => task.status === DONE)
        }
      ]
    }; 
  }
  const getStatus = (columnId) => {
    return columnId - 1;
  }
  useEffect(() => {
    const getURL = getAPIURL("/todo-viewset/TodoList/");
    fetchWrapper.get(getURL).then((data) => {
      console.log(data)
      setBoard(transformData(boardData));
      setLoading(false);
    })
  }, [])

  const onCardDragEnd = (board, card, source, destination) => {
    card.status = getStatus(destination.toColumnId);
    transformData(board);
    const updateURL = getAPIURL(`http://127.0.0.1:8000/todo-viewset/TodoList/${card.id}`);
    fetchWrapper.put(updateURL, card).then((data) => {

    })
  }
  return (
    <>
      {
        !loading &&
        <div className={styles.page}>
          <UncontrolledKanbanBoard 
            onBoardChange={(board) => { console.log("Update", board) }} 
            initialBoard={board}
            ></UncontrolledKanbanBoard>
        </div>
      }
    </>
  )
}

export default ToDoBoard;