import { FC } from "react"
import { ICharacter } from "../../types"
import "./index.css"

interface DerivedParametersProps {
  character: ICharacter
}

const DerivedParameters: FC<DerivedParametersProps> = ({ character }) => {
  return(
    <div className="derived-parameters">
      <h2>Дополнительные параметры</h2>
      <div>Жизненная сила: {character.lifeForce}</div>
      <div>Уклонение: {character.evasion}</div>
      <div>Энергичность: {character.energy}</div>
    </div>
  )
}

export default DerivedParameters