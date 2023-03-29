
import { useEffect, useState } from 'react';
import { BasicParameters, DerivedParameters, ExportImport, Skills } from './components';
import './App.css'

import { ICharacter } from './types';

function App() {
  const [character, setCharacter] = useState<ICharacter>({
    name: "",
    strength: 0,
    agility: 0,
    intelligence: 0,
    charisma: 0,
    lifeForce: 0,
    evasion: 0,
    energy: 0,
    skills: [
      {name: 'Атака', level: 0, baseParameter: "strength" },
      {name: 'Стелс', level: 0, baseParameter: "agility" },
      {name: 'Стрельба из лука', level: 0, baseParameter: "agility" },
      {name: 'Обучаемость', level: 0, baseParameter: "intelligence" },
      {name: 'Выживание', level: 0, baseParameter: "intelligence" },
      {name: 'Медицина', level: 0, baseParameter: "intelligence" },
      {name: 'Запугивание', level: 0, baseParameter: "charisma" },
      {name: 'Проницательность', level: 0, baseParameter: "charisma" },
      {name: 'Внешний вид', level: 0, baseParameter: "charisma" },
      {name: 'Манипулирование', level: 0, baseParameter: "charisma" },
    ],
  });

  useEffect(() => {
    setCharacter({
      ...character,
      lifeForce: 3 + character.strength,
      evasion: 10 + character.agility,
      energy: character.agility + character.intelligence,
    });
  }, [character.strength, character.agility, character.intelligence]);

  return (
    <div className='App'>
      <BasicParameters character={character} setCharacter={setCharacter} />
      <DerivedParameters character={character} />
      <Skills character={character} setCharacter={setCharacter} />
      <ExportImport character={character} setCharacter={setCharacter} /> 
    </div>
  );
}

export default App;
