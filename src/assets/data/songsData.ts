// src/data.ts
import track1Img from '../images/criticalImg.jpg';
import track1Audio from '../tracks/critical.m4a';

import track2Img from '../images/doubleImg.png';
import track2Audio from '../tracks/Double.m4a';

import track3Img from '../images/flexupImg.jpg';
import track3Audio from '../tracks/FlexUp.m4a';

import track4Img from '../images/idgafImg.jpg';
import track4Audio from '../tracks/idgaf.m4a';

import track5Img from '../images/moneytwerkImg.png';
import track5Audio from '../tracks/MoneyTwerk.m4a';

import track6Img from '../images/WindowShopperImg.jpg';
import track6Audio from '../tracks/WindowShopper.m4a';

import track7Img from '../images/APImg.png';
import track7Audio from '../tracks/AP.m4a';

import track8Img from '../images/leadtheraceImg.png';
import track8Audio from '../tracks/LeadTheRace.mp3';

import track9Img from '../images/LuvSic2Img.jpg';
import track9Audio from '../tracks/LuvSic2.m4a';

import track10Img from '../images/BeQuietImg.png';
import track10Audio from '../tracks/BËQUIET.m4a';

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
    title: 'Critical (Cyberspeed mix)',
    artist: 'RXKNephew',
    image: track1Img,
    audio: track1Audio,
    liked: false,
  },
  {
    id: 2,
    title: 'Doublë',
    artist: 'Yeat',
    image: track2Img,
    audio: track2Audio,
    liked: false,
  },
  {
    id: 3,
    title: 'Flex Up',
    artist: 'Lil Yachty, Future, Playboi Carti',
    image: track3Img,
    audio: track3Audio,
    liked: false,
  },
  {
    id: 4,
    title: 'IDGAF',
    artist: 'Yeat',
    image: track4Img,
    audio: track4Audio,
    liked: false,
  },
  {
    id: 5,
    title: 'Money Twërk',
    artist: 'Yeat',
    image: track5Img,
    audio: track5Audio,
    liked: false,
  },
  {
    id: 6,
    title: 'Window Shopper',
    artist: '50 Cent',
    image: track6Img,
    audio: track6Audio,
    liked: false,
  },
  {
    id: 7,
    title: 'AP',
    artist: 'Pop Smoke',
    image: track7Img,
    audio: track7Audio,
    liked: false,
  },
  {
    id: 8,
    title: 'Lead The Race (UNDEFEATED)',
    artist: 'Comethazine',
    image: track8Img,
    audio: track8Audio,
    liked: false,
  },
  {
    id: 9,
    title: 'Luv(Sic.) Pt.2',
    artist: 'Nujabes, Shing02',
    image: track9Img,
    audio: track9Audio,
    liked: false,
  },
  {
    id: 10,
    title: 'BË QUIET',
    artist: 'Yeat, Kodak Black',
    image: track10Img,
    audio: track10Audio,
    liked: false,
  },
];
