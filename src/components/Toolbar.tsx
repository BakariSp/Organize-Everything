import React from 'react';

interface ToolbarProps {
  onAddCard: (type: 'text' | 'image' | 'link') => void;
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAddCard, onUndo, onRedo, onExport }) => {
  return (
    <div className="toolbar">
      <button onClick={() => onAddCard('text')}>Add Text</button>
      <button onClick={() => onAddCard('image')}>Add Image</button>
      <button onClick={() => onAddCard('link')}>Add Link</button>
      <button onClick={onUndo}>Undo</button>
      <button onClick={onRedo}>Redo</button>
      <button onClick={onExport}>Export</button>
    </div>
  );
};

export default Toolbar; 