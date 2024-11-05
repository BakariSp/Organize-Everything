import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface CanvasProps {
  children: React.ReactNode;
}

const Canvas: React.FC<CanvasProps> = ({ children }) => {
  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
      wheel={{ step: 50 }}
    >
      {({ zoomIn, zoomOut, resetTransform }) => (
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: 'calc(100vh - 60px)',
            backgroundColor: '#f5f5f5',
            overflow: 'hidden',
            minWidth: '100vw',
            minHeight: '100vh',
          }}
        >
          <div className="controls">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>Reset</button>
          </div>
          <TransformComponent>
            <div className="canvas">
              {children}
            </div>
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  );
};

export default Canvas; 