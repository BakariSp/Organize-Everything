import React, { createContext, useReducer } from 'react';

interface State {
  cards: any[];
}

const initialState: State = {
  cards: []
};

export const WorkspaceContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const workspaceReducer = (state: State, action: any) => {
  switch (action.type) {
    case 'ADD_CARD':
      return { ...state, cards: [...state.cards, action.payload] };
    case 'UPDATE_CARD_POSITION':
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.payload.id
            ? { ...card, position: action.payload.position }
            : card
        )
      };
    case 'UPDATE_CARD_CONTENT':
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.payload.id
            ? { ...card, content: action.payload.content }
            : card
        )
      };
    default:
      return state;
  }
};

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(workspaceReducer, initialState);

  return (
    <WorkspaceContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkspaceContext.Provider>
  );
}; 