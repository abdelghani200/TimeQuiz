import { Level } from "./Level";
import { Media } from "./Media";
import { Subject } from "./Subject";

export interface Question{
    id:number;
    answerNumber: number;
    answerCorrectNumber: number;
    text: String;
    type: String;
    scorePoints: number;
    level: Level;
    subject: Subject;
    medias: Media[]
}