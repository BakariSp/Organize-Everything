import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';

interface CardProps {
  id: string;
  type: 'text' | 'image' | 'link';
  content: any;
  position: { x: number; y: number };
  metadata: { tags: string[]; notes: string; date: string };
  onUpdatePosition: (id: string, position: { x: number; y: number }) => void;
  onUpdateContent?: (id: string, content: any) => void;
}

const Card: React.FC<CardProps> = (props) => {
  const nodeRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(props.content.text || '');

  const handleDragStop = (e: any, data: any) => {
    props.onUpdatePosition(props.id, { x: data.x, y: data.y });
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (props.type === 'text') {
      setIsEditing(true);
      e.stopPropagation();
    }
  };

  const saveChanges = () => {
    setIsEditing(false);
    if (props.onUpdateContent && editText !== props.content.text) {
      props.onUpdateContent(props.id, { text: editText });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveChanges();
    }
    // Allow Shift+Enter for new lines
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(props.content.text || ''); // Reset to original text
    }
  };

  const renderContent = () => {
    switch (props.type) {
      case 'text':
        return isEditing ? (
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={saveChanges}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{
              width: '100%',
              minHeight: '100px',
              border: 'none',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              backgroundColor: 'transparent',
              padding: '0'
            }}
          />
        ) : (
          <div onDoubleClick={handleDoubleClick}>
            {props.content.text || 'Double click to edit'}
          </div>
        );
      case 'image':
        return <img src={props.content.src} alt={props.content.title} />;
      case 'link':
        return <a href={props.content.url}>{props.content.title}</a>;
      default:
        return null;
    }
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={props.position}
      onStop={handleDragStop}
      bounds="parent"
      disabled={isEditing}
    >
      <div 
        ref={nodeRef} 
        className="card"
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          cursor: isEditing ? 'text' : 'move',
          minWidth: '200px',
          minHeight: '100px',
          zIndex: isEditing ? 1000 : 1,
        }}
      >
        {renderContent()}
      </div>
    </Draggable>
  );
};

export default Card;