import {type PlayerClass} from './models.tsx'

export const classesData: Record<string, PlayerClass> = {
    "warrior": {name: "Warrior", imgUrl: "src/assets/warrior.jpg", skill: "STR"},
    "wizard": {name: "Wizard", imgUrl: "src/assets/wizard.jpg", skill: "WIS"},
    "archer": {name: "Archer", imgUrl: "src/assets/archer.webp", skill: "DEX"},
    "assassin": {name: "Assassin", imgUrl: "src/assets/assassin.jpg", skill: "CHR"},
    "paladin": {name: "Paladin", imgUrl: "src/assets/paladin.jpg", skill: "CON"},
    "captain": {name: "Captain", imgUrl: "src/assets/captain.webp", skill: "INT"}
};

export default classesData;