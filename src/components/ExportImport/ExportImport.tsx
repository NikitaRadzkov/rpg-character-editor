import { FC } from "react"
import { ICharacter } from "../../types";
import "./index.css"

interface ExportImportProps {
  character: ICharacter
  setCharacter: React.Dispatch<React.SetStateAction<ICharacter>>
}

const ExportImport: FC<ExportImportProps> = ({ character, setCharacter }) => {
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

  return(
    <div className="export-import">
      <button onClick={exportCharacter}>Экспорт персонажа</button>
      <label>
        Импорт персонажа:
        <input type="file" accept=".json" onChange={importCharacter} />
      </label>
    </div>
  )
}

export default ExportImport
