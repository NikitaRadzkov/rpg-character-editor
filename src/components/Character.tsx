import { FC, useEffect, useState } from "react";
import { ICharacter } from "../types";

const Character: FC = () => {
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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacter({ ...character, name: event.target.value });
  };
  
  const handleParameterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    parameter: keyof ICharacter
  ) => {
    setCharacter({ ...character, [parameter]: parseInt(event.target.value) });
  };

  const handleSkillLevelChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    skillName: string,
    baseParament: keyof ICharacter
  ) => {
    const skillIndex = character.skills.findIndex(
      (skill) => skill.name === skillName
    );
    if (event.target.value <= character[baseParament]) {
      const updatedSkills = [...character.skills];
      updatedSkills[skillIndex] = {
        ...updatedSkills[skillIndex],
        level: parseInt(event.target.value),
      };
      setCharacter({ ...character, skills: updatedSkills });
    }
  };

  const exportCharacter = () => {
    const characterJson = JSON.stringify(character);
    const element = document.createElement("a");
    element.href = "data:text/plain;charset=utf-8," + encodeURIComponent(characterJson);
    element.download = "my-character.json";
    element.click();
  };

  const importCharacter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const characterJson = reader.result?.toString() || "";
      const parsedCharacter = JSON.parse(characterJson) as ICharacter;
      setCharacter(parsedCharacter);
    };
    reader.readAsText(file);
  };

  return (
    <div className="character">
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


      <div className="derived-parameters">
        <h2>Дополнительные параметры</h2>
        <div>Жизненная сила: {character.lifeForce}</div>
        <div>Уклонение: {character.evasion}</div>
        <div>Энергичность: {character.energy}</div>
      </div>


      <div className="skills">
        <h2>Скиллы</h2>
        <table>
          <thead>
            <tr>
              <th>Уровень</th>
              <th>Скилла</th>
            </tr>
          </thead>
        <tbody>
          {character.skills.map((skill) => (
            <tr key={skill.name}>
              <td>{skill.name}</td>
              <td>
                <select
                  value={skill.level}
                  onChange={(event) => handleSkillLevelChange(event, skill.name, skill.baseParameter)}
                >
                  <option value={0}>Нетренированный</option>
                  <option value={1}>Новичок</option>
                  <option value={2}>Ученик</option>
                  <option value={3}>Адепт</option>
                  <option value={4}>Эксперт</option>
                  <option value={5}>Мастер</option>
                </select>
              </td>
          </tr>
          ))}
        </tbody>
      </table>
      
      </div>

      <div className="export-import">
        <button onClick={exportCharacter}>Экспорт персонажа</button>
        <label>
          Импорт персонажа:
        <input type="file" accept=".json" onChange={importCharacter} />
        </label>
      </div>
    </div>
  );
}

export default Character
