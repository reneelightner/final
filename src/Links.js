import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import {useState} from 'react';
import App from './App.js'
import About from './About.js'
import Layout from './Layout.js'

export default function Links() {
  const [artist, setArtist] = useState('none');
  const [pickedArtist, setpickedArtist] = useState(false);
  const [artistSummary, setartistSummary] = useState(' ');
  const [artistAwardsTotal, setartistAwardsTotal] = useState(null);
  const [artistURL, setartistURL] = useState(' ');

  const [grammysCountArtist, setgrammysCountArtist] = useState(0);
  const [mtvCountArtist, setmtvCountArtist] = useState(0);
  const [billboardCountArtist, setbillboardCountArtist] = useState(0);
  const [amaCountArtist, setamaCountArtist] = useState(0);
  const [superbowlCountArtist, setsuperbowlCountArtist] = useState(0);

  const [value, setValue] = useState(null);
  const [favs, setFavs] = useState([]);

  let props = {
    artist: artist,
    setArtist: setArtist,
    pickedArtist: pickedArtist,
    setpickedArtist: setpickedArtist,
    artistSummary: artistSummary,
    setartistSummary: setartistSummary,
    artistAwardsTotal: artistAwardsTotal,
    setartistAwardsTotal: setartistAwardsTotal,
    artistURL: artistURL,
    setartistURL: setartistURL,
    grammysCountArtist: grammysCountArtist,
    setgrammysCountArtist: setgrammysCountArtist,
    mtvCountArtist: mtvCountArtist,
    setmtvCountArtist: setmtvCountArtist,
    billboardCountArtist: billboardCountArtist,
    setbillboardCountArtist: setbillboardCountArtist,
    amaCountArtist: amaCountArtist,
    setamaCountArtist: setamaCountArtist,
    superbowlCountArtist: superbowlCountArtist,
    setsuperbowlCountArtist: setsuperbowlCountArtist,
    value: value,
    setValue: setValue,
    favs: favs,
    setFavs: setFavs
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<App {...props}/>} />
          <Route path="about" element={<About/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
