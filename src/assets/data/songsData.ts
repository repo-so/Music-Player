// src/data.ts
import track1Img from '../images/funicar.jpg';
import track1Audio from '../tracks/critical.m4a';

import track2Img from '../images/bhoos.png';
import track2Audio from '../tracks/Double.m4a';

export interface TrackData {
  id: number;
  title: string;
  artist: string;
  image: string; // imported file becomes a string path
  audio: string;
  liked: boolean;
}

export const trackList: TrackData[] = [
  {
    id: 1,
    title: 'Track One',
    artist: 'bho1',
    image: track1Img,
    audio: track1Audio,
    liked: false,
  },
  {
    id: 2,
    title: 'Track Two',
    artist: 'bho2',
    image: track2Img,
    audio: track2Audio,
    liked: false,
  },
];
