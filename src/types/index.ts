export interface ICharacter {
  name: string;
  strength: number;
  agility: number;
  intelligence: number;
  charisma: number;
  lifeForce: number;
  evasion: number;
  energy: number;
  skills: ISkill[];
};

export interface ISkill {
  name: string;
  level: number;
  baseParameter: keyof ICharacter;
};
