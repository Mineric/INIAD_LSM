const Card = function ({ card, dragging, allowRemoveCard, onCardRemove }) {
    console.log(card);
    return (
      <div key={card.id ? card.id : card.name} className={`react-kanban-card ${dragging ? 'react-kanban-card--dragging' : ''}`}>
        <span>
          <div className='react-kanban-card__title'>
            <span>{card.name}</span>
            {allowRemoveCard && (
              <span style={{ cursor: 'pointer' }} onClick={() => onCardRemove(card)}>
                ×
              </span>
            )}
          </div>
        </span>
        <div className='react-kanban-card__description'>{card.description}</div>
        <div className='react-kanban-card__deadline'>{card.deadline}</div>
      </div>
    )
  }
  export default Card;