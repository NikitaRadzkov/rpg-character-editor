import { FC } from "react";
import { ICharacter } from "../../types";
import "./index.css"

interface CharacterProps {
  character: ICharacter
  setCharacter: React.Dispatch<React.SetStateAction<ICharacter>>
}

const BasicParameters: FC<CharacterProps> = ({ character, setCharacter }) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacter({ ...character, name: event.target.value });
  };

  const handleParameterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    parameter: keyof ICharacter
  ) => {
    setCharacter({ ...character, [parameter]: parseInt(event.target.value) });
  };

  return (
    <>
      <h1>Редактор Персонажа</h1>
      <label>
        Имя персонажа:
        <input type="text" value={character.name} onChange={handleNameChange} />
      </label>

      <div className="basic-parameters">
        <h2>Основные параметры</h2>
        <label>
          Сила:
          <input
            type="number"
            value={character.strength}
            onChange={(event) => handleParameterChange(event, "strength")}
          />
        </label>

        <label>
          Ловкость:
          <input
            type="number"
            value={character.agility}
            onChange={(event) => handleParameterChange(event, "agility")}
          />
        </label>

        <label>
          Интеллект:
          <input
            type="number"
            value={character.intelligence}
            onChange={(event) => handleParameterChange(event, "intelligence")}
          />
        </label>

        <label>
          Харизма:
          <input
            type="number"
            value={character.charisma}
            onChange={(event) => handleParameterChange(event, "charisma")}
          />
        </label>
      </div>
    </>
  )
}

export default BasicParameters;