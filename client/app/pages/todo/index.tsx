import { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
const UncontrolledKanbanBoard = dynamic(() => import("../../comps/UncontrolledKanbanBoard/UncontrolledKanbanBoard"), { ssr: false })
import styles from "./layout.module.css"
import { fetchWrapper, getAPIURL } from "../../helpers";
import createTypography from "@mui/material/styles/createTypography";

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
      if(data){
        console.log(data)
      setBoard(transformData(data));
      setLoading(false);
      } else{
        alert("unable to connect to server")
      }
      
    })
  }, [])

  const onCardNew = (board, column, card) => {
    const createURL = getAPIURL(`/todo-viewset/TodoList/`)
    console.log("Creating new ", {...card, status: (column.id - 1)})
    fetchWrapper.post(createURL, {...card, status: (column.id - 1)}).then((newCard) => {
      if(newCard){
        setLoading(true);
        const nboard = {...board};
        // update is always the top
        nboard.columns[column.id - 1].cards[0] = {...newCard}
        setBoard(nboard);
        setLoading(false);
      } else{
        console.log("Create unsuccessfully.")
      }
      
      console.log("OnCardNew Board", board);
    })
  }
  
  const onCardDragEnd = (board, card, source, destination) => {
    card.status = getStatus(destination.toColumnId);
    const updateURL = getAPIURL(`/todo-viewset/TodoList/${card.id}/`);
    fetchWrapper.put(updateURL, card).then((data) => {
      console.log("Update card server", card);
    })
  }

  const onCardRemove= (board, column, card) => {
    const deleteURL = getAPIURL(`/todo-viewset/TodoList/${card.id}/`)
    console.log(deleteURL)
    fetchWrapper.delete(deleteURL);
  }

  return (
    <>
      {
        !loading &&
        <div className={styles.page}>
          <UncontrolledKanbanBoard  
            onCardNew={onCardNew}
            onCardDragEnd={onCardDragEnd}
            onCardRemove={onCardRemove}
            onBoardChange={(board) => { console.log("Update", board) }} 
            initialBoard={board}
            ></UncontrolledKanbanBoard>
        </div>
      }
    </>
  )
}

export default ToDoBoard;