import React, { useState } from 'react';
import Chat from './components/Chat';

const characters = [
  { id: 1, name: 'Step-Sister', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYGD4z8AARgABZcM5AAAAAElFTkSuQmCC' },
  { id: 2, name: 'Step-Mom', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8AQDABzQAF3y5kXAAAAAElFTkSuQmCC' },
  { id: 3, name: 'Aunt', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkwMDwHwAABQECdZxXAAAAAElFTkSuQmCC' },
  { id: 4, name: 'Hot Neighbor', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNgYGD4DwABBAEAH2kTAAAAAElFTkSuQmCC' },
];

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Roleplay Chat</h1>
      {!selectedCharacter ? (
        <div className="grid grid-cols-2 gap-4">
          {characters.map((char) => (
            <button
              key={char.id}
              className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 flex flex-col items-center"
              onClick={() => setSelectedCharacter(char)}
            >
              <img src={char.image} alt={char.name} className="w-16 h-16 rounded-full mb-2" />
              <span>{char.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <Chat character={selectedCharacter} onBack={() => setSelectedCharacter(null)} />
      )}
    </div>
  );
}

export default App;