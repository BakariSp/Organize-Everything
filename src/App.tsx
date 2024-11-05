import React, { useContext, useEffect } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import Connections from './components/Connections';
import Card from './components/Card';
import { WorkspaceContext } from './context/WorkspaceContext';
import axios from 'axios';

const App: React.FC = () => {
  const { state, dispatch } = useContext(WorkspaceContext);

  useEffect(() => {
    console.log('Current cards in state:', state.cards);
  }, [state.cards]);

  const handleAddCard = async (type: 'text' | 'image' | 'link') => {
    const newCard = {
      id: crypto.randomUUID(),
      type,
      content: type === 'text' 
        ? { text: 'New Text' } 
        : type === 'image' 
        ? { src: 'image_url', title: 'New Image' } 
        : { url: 'https://example.com', title: 'New Link' },
      position: { x: 100, y: 100 },
      metadata: { tags: [], notes: '', date: new Date().toISOString().split('T')[0] },
    };

    console.log('Adding new card:', newCard);

    dispatch({ type: 'ADD_CARD', payload: newCard });

    try {
      const response = await axios.post('/api/cards', newCard);
      console.log('API response:', response.data);
      
      if (response.data.id !== newCard.id) {
        dispatch({ type: 'UPDATE_CARD', payload: response.data });
      }
    } catch (error) {
      console.error('Error adding card:', error);
      if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data);
        console.error('Status:', error.response?.status);
      }
    }
  };

  const handleUpdatePosition = async (id: string, position: { x: number; y: number }) => {
    try {
      await axios.put(`/api/cards/${id}`, { position });
      dispatch({ type: 'UPDATE_CARD_POSITION', payload: { id, position } });
    } catch (error) {
      console.error('Error updating position:', error);
    }
  };

  const handleUndo = () => {
    console.log('Undo action');
  };

  const handleRedo = () => {
    console.log('Redo action');
  };

  const handleExport = () => {
    console.log('Export action');
  };

  const handleUpdateContent = async (id: string, content: any) => {
    try {
      await axios.put(`/api/cards/${id}`, { content });
      dispatch({ type: 'UPDATE_CARD_CONTENT', payload: { id, content } });
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  return (
    <div className="App">
      <Toolbar 
        onAddCard={handleAddCard} 
        onUndo={handleUndo} 
        onRedo={handleRedo} 
        onExport={handleExport} 
      />
      <Canvas>
        <Connections elements={[]} onConnect={() => {}} />
        {state.cards.map(card => (
          <Card 
            key={card.id}
            id={card.id}
            type={card.type}
            content={card.content}
            position={card.position}
            metadata={card.metadata}
            onUpdatePosition={handleUpdatePosition}
            onUpdateContent={handleUpdateContent}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default App; 