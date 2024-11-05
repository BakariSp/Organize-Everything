import React, { useState } from 'react';

interface MetadataProps {
  tags: string[];
  notes: string;
  date: string;
  onUpdate: (metadata: { tags: string[]; notes: string; date: string }) => void;
}

const CardMetadata: React.FC<MetadataProps> = ({ tags, notes, date, onUpdate }) => {
  const [localTags, setLocalTags] = useState(tags.join(', '));
  const [localNotes, setLocalNotes] = useState(notes);
  const [localDate, setLocalDate] = useState(date);

  const handleSave = () => {
    onUpdate({
      tags: localTags.split(',').map(tag => tag.trim()),
      notes: localNotes,
      date: localDate,
    });
  };

  return (
    <div className="metadata">
      <input
        type="text"
        value={localTags}
        onChange={(e) => setLocalTags(e.target.value)}
        placeholder="Tags (comma separated)"
      />
      <textarea
        value={localNotes}
        onChange={(e) => setLocalNotes(e.target.value)}
        placeholder="Notes"
      />
      <input
        type="date"
        value={localDate}
        onChange={(e) => setLocalDate(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default CardMetadata; 