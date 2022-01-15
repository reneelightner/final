import './App.css';
import Chart from './Chart.js';
import Artists from './Artists.js';
import Favs from './Favs.js';
import grammysJSON from './data/dataGrammys.json';
import mtvJSON from './data/dataMTV.json';
import billboardJSON from './data/dataBillboard.json';
import amaJSON from './data/dataAMA.json';
import superbowlJSON from './data/dataSuperBowl.json';
import fixArtistSummary from './fixArtistSummary.js';

// award names for each award show
const grammysAwards = [...new Set(grammysJSON.map(item => item['AWARD']))];
const mtvAwards = [...new Set(mtvJSON.map(item => item['AWARD']))];
const billboardAwards = [...new Set(billboardJSON.map(item => item['AWARD']))];
const amaAwards = [...new Set(amaJSON.map(item => item['AWARD']))];
const superBowlAwards = [...new Set(superbowlJSON.map(item => item['AWARD']))];

// get artist names for drop down:
// create array of unique artist names
let artistArray = [...new Set(grammysJSON.map(item => item['ART-1']))];
grammysJSON.forEach(function (award) {
	if (!artistArray.includes(award['ART-2'])) {artistArray.push(award['ART-2'])}
  if (!artistArray.includes(award['ART-3'])) {artistArray.push(award['ART-3'])}
}); 
mtvJSON.forEach(function (award) {
	if (!artistArray.includes(award['ART-1'])) {artistArray.push(award['ART-1'])}
  if (!artistArray.includes(award['ART-2'])) {artistArray.push(award['ART-2'])}
  if (!artistArray.includes(award['ART-3'])) {artistArray.push(award['ART-3'])}
});
billboardJSON.forEach(function (award) {
	if (!artistArray.includes(award['ART-1'])) {artistArray.push(award['ART-1'])}
  if (!artistArray.includes(award['ART-2'])) {artistArray.push(award['ART-2'])}
  if (!artistArray.includes(award['ART-3'])) {artistArray.push(award['ART-3'])}
});
amaJSON.forEach(function (award) {
	if (!artistArray.includes(award['ART-1'])) {artistArray.push(award['ART-1'])}
});
superbowlJSON.forEach(function (award) {
	if (!artistArray.includes(award['ART-1'])) {artistArray.push(award['ART-1'])}
  if (!artistArray.includes(award['ART-2'])) {artistArray.push(award['ART-2'])}
  if (!artistArray.includes(award['ART-3'])) {artistArray.push(award['ART-3'])}
  if (!artistArray.includes(award['ART-4'])) {artistArray.push(award['ART-4'])}
  if (!artistArray.includes(award['ART-5'])) {artistArray.push(award['ART-5'])}
  if (!artistArray.includes(award['ART-6'])) {artistArray.push(award['ART-6'])}
});
// filter out any empty artists
artistArray = artistArray.filter(item => {
  return item !== ""
})
// sort artist array in alpa order
artistArray = artistArray.sort();
// make array of objects - each obj is an artist (used for drop down options)
const artistOptions = artistArray.map((artist) => { return {text: artist, value: artist} });

function getArtistCount(data, artist) {
  let count = 0;
  for (let k of data) {
    if (k['ART-1'] == artist) { count++; }
    if (k['ART-2'] == artist) { count++; }
    if (k['ART-3'] == artist) { count++; }
    if (k['ART-4'] == artist) { count++; }
    if (k['ART-5'] == artist) { count++; }
    if (k['ART-6'] == artist) { count++; }
  };
  return count;
}

// multiple artist with this name on last fm so we need to fix summary
const artistsFixSummary = ['Chris Brown', 'Creed', 'Eve', 'John Mayer', 'Next', 'Nirvana', 'Roger Miller', 'The Cars', 'Zayn'];

export default function App(props) {

  const handleArtistSelection = (artist) => {
    props.setValue(artist);
    props.setArtist(artist);
    getArtistSummary(artist);
    props.setpickedArtist(true);
    let currArtistAwardsArr = [];

    let grammyCount = getArtistCount(grammysJSON, artist);
    props.setgrammysCountArtist(grammyCount);
    if (grammyCount > 0) {currArtistAwardsArr.push({show: 'Grammy', num: grammyCount})}

    let mtvCount = getArtistCount(mtvJSON, artist);
    props.setmtvCountArtist(mtvCount);
    if (mtvCount > 0) {currArtistAwardsArr.push({show: 'MTV VMA', num: mtvCount})}

    let billboardCount = getArtistCount(billboardJSON, artist);
    props.setbillboardCountArtist(billboardCount);
    if (billboardCount > 0) {currArtistAwardsArr.push({show: 'Billboard Music Award', num: billboardCount})}

    let amaCount = getArtistCount(amaJSON, artist);
    props.setamaCountArtist(amaCount);
    if (amaCount > 0) {currArtistAwardsArr.push({show: 'AMA', num: amaCount})}

    let superbowlCount = getArtistCount(superbowlJSON, artist);
    props.setsuperbowlCountArtist(superbowlCount);
    if (superbowlCount > 0) {currArtistAwardsArr.push({show: 'headlined the Super Bowl halftime show', num: superbowlCount})}

    let currArtistAwards = '';
    for (let key of currArtistAwardsArr) {
      if (key.show == 'headlined the Super Bowl halftime show') {
        let endingText;
        key.num > 1 ? endingText = ' times, ' : endingText = ' time, ';
        currArtistAwards = currArtistAwards + key.show + ' ' + key.num + endingText;
      } else {
        let endingText;
        key.num > 1 ? endingText = 's, ' : endingText = ', ';
        currArtistAwards = currArtistAwards + key.num + ' ' + key.show + endingText;
      }
    }
    currArtistAwards = currArtistAwards.substring(0, currArtistAwards.length - 2);

    props.setartistAwardsTotal(currArtistAwards);
  }


  function getArtistSummary(artist) {
    artist = artist.replace(/’/g, '%27');
    artist = artist.replace(/&/g, '%26');
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${REACT_APP_LASTFM_API_KEY}&format=json`;
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((data) => {
        let summary = data.artist.bio.summary;
        if (artistsFixSummary.includes(props.artist)) {
          summary = fixArtistSummary(artist, summary);
        }
        summary = summary.split('<a href="');
        props.setartistSummary(summary[0]);
        props.setartistURL(data.artist.url);
      });
  }

  const handleFavArtist = (add, theartist) => {
    let currFavs = props.favs;
    if (!props.favs.includes(theartist) && add) {
      currFavs.push(theartist);
      props.setFavs([...currFavs]);
    } else if (props.favs.includes(theartist)) {
      let index = currFavs.indexOf(theartist);
      currFavs.splice(index, 1);
      props.setFavs([...currFavs]);
    }
  }

  const pickedFavs = () => {
    if (props.favs.length) {
      let favsArr = props.favs.map((item, index)=>{
        return <Favs artist={item} artistSelection={handleArtistSelection} handleAristRemove={handleFavArtist}></Favs>
      });
      return favsArr;
    } else {
      return <p class="card-text">There're no favorite artists in your list.</p>;
    }
  }

  const artistAwardText = () => {
    if (props.artist === 'none') {
      return `Pick an artist to see their award(s)`
    } else {
      return `${props.artist}: ${props.artistAwardsTotal}`
    }
  }

  const artistSummaryText = () => {
    if (props.artist === 'none') {
      return 'Pick an artist to read more about them';
    } else {
      return props.artist;
    }
  }

  const chartsConfig = [
    {
      data: grammysJSON,
      awards: grammysAwards,
      awardCountForArist: props.grammysCountArtist,
      id: 'grammy',
      height: 130,
      show: 'Grammys'
    },
    {
      data: mtvJSON,
      awards: mtvAwards,
      awardCountForArist: props.mtvCountArtist,
      id: 'mtv',
      height: 170,
      show: 'MTV Video Music Awards'
    },
    {
      data: billboardJSON,
      awards: billboardAwards,
      awardCountForArist: props.billboardCountArtist,
      id: 'billboard',
      height: 170,
      show: 'Billboard Music Awards'
    },
    {
      data: amaJSON,
      awards: amaAwards,
      awardCountForArist: props.amaCountArtist,
      id: 'ama',
      height: 120,
      show: 'American Music Awards'
    },
    {
      data: superbowlJSON,
      awards: superBowlAwards,
      awardCountForArist: props.superbowlCountArtist,
      id: 'superbowl',
      height: 60,
      show: 'Super Bowl Halftime Show Headliner'
    }
  ];

  const charts = chartsConfig.map((item, index)=>{
    if (item.awardCountForArist > 0) {
      return <Chart data={item.data} awards={item.awards} awardCountForArist={item.awardCountForArist} id={item.id} height={item.height} show={item.show} artist={props.artist} />
    }
  });

  const FavBtn = () => (
    <button className='btn btn-light' onClick={() => {handleFavArtist(true, props.artist)}}>❤️</button>
  );

  const ReadMoreBtn = () => (
    <a className='btn btn-primary' href={props.artistURL} target='new'>Read More</a>
  );

  const ArtistCardFooter = () => (
    <div class="card-footer text-muted">
      <small>Source: <a href='https://www.last.fm/api/intro' target='new'>Last.fm API</a></small>
    </div>
  );

  return (
    <div className="container">
      <div class="row mt-3">
        <div class="col-sm-6">
          <h1>Music Award Show Winners</h1>
          <p>Learn more about famous music artists by seeing their awards! Choose an artist below to see their awards from the: Grammys, MTV Music Awards, Billboard Music Awards, American Music Awards and if they've headlined the Superbowl Halftime Show (not an award show but I'm considering it an honor). <i>Note: only select awards are shown.</i></p>
          <Artists options={artistOptions} onArtistChange={handleArtistSelection} placeholder={'Pick an Artist'} value={props.value}/>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-sm-8">
          <div class="card">
            <div class="card-header">
              About this Artist
            </div>
            <div class="card-body">
              <h5 class="card-title">{artistSummaryText()}</h5>
              <p class="card-text">{props.artistSummary}</p>
              { props.pickedArtist ? <ReadMoreBtn /> : null }
              { props.pickedArtist ? <FavBtn /> : null }
            </div>
            { props.pickedArtist ? <ArtistCardFooter /> : null }
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-header">
              My Favorite Artists
            </div>
            <div class="card-body">
              {pickedFavs()}
            </div>
            <div class="card-footer text-muted">
              <small>Pick an artist. Then select the ❤️ icon to 'bookmark' that artist. Click X to remove them.</small>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header">
              Awards for this Artist
            </div>
            <div class="card-body">
              <h5 class="card-title">{artistAwardText()}</h5>
              {charts}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}