import React from 'react';
import ReactFlow, { Connection, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

interface ConnectionsProps {
  elements: (Node | Edge)[];
  onConnect: (params: Connection) => void;
}

const Connections: React.FC<ConnectionsProps> = ({ elements, onConnect }) => {
  const nodes = elements.filter((el): el is Node => 'position' in el);
  const edges = elements.filter((el): el is Edge => 'source' in el);

  return (
    <div className="reactflow-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
};

export default Connections; 