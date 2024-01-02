import { Media } from "src/app/models/Media";

export interface MediaState {
    medias: Media[];
}

export const initialState: MediaState = {
    medias: [],
};
