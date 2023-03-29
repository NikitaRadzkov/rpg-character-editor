import { FC } from "react";
import { ICharacter } from "../../types";
import "./index.css"

interface SkillsProps {
  character: ICharacter
  setCharacter: React.Dispatch<React.SetStateAction<ICharacter>>
}

const Skills: FC<SkillsProps> = ({ character, setCharacter }) => {
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

  return(
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
  )
}

export default Skills