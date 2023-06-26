
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Button from 'react-bootstrap/Button';



import React, { useState } from 'react';


const SearchForm = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <form onSubmit={handleSubmit} >
      <input type="text" value={searchInput} onChange={handleInputChange} placeholder="Enter a word" />
      <Button id="butSearch" type="submit" variant="primary">Search</Button>{' '}
    </form>
  );
};

const SearchResult = ({ word, meanings, phonetic, phonetics, sourceUrls }) => {
  const playAudio = (audioUrl) => new Audio(audioUrl).play();
  
  return(
  <div className='container'>
    <div className='content-header'>
    <br />
      <div className='row'>
        <div className='col'>
          <h2>{word}</h2>
          <h3>{phonetic}</h3>
        </div>
        <div className='col'>
          {phonetics.map((phonetics, index) => (
            <div key={index} className="phonetics">
              {/* <p>{`Phonetics: ${phonetics.text}`}</p> */}
              {phonetics.audio && (
                <div>
                  <img onClick={() => playAudio(phonetics.audio)} src='play.png' alt="add item" width="50" />
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
    </div>
    <div className='cont'>
    {meanings.length > 0 && (
        <div className='text-start border-bottom'>
          <h3>{meanings[0].partOfSpeech}</h3>
          <div className='text-start border-bottom'></div>
          <br />
          <div className='text-start text-muted'><h5>Meaning</h5></div>
          <ul>
            <li>{meanings[0].definitions[0].definition}</li>
            <li>{meanings[0].definitions[1].definition}</li>
            <li>{meanings[0].definitions[2].definition}</li>
          </ul>
          <br />
          <div className='text-start text-muted'><h5>Synonyms</h5></div>
          <p>{meanings[0].synonyms[0]}</p>
          <h3>{meanings[1].partOfSpeech}</h3>
          <div className='text-start border-bottom'></div>
          <br />
          <div className='text-start text-muted'><h5>Meaning</h5></div>
          <ul>
            <li>{meanings[1].definitions[0].definition}</li>
            <div className='text-muted'>{meanings[1].definitions[0].example}</div>
          </ul>
        </div>
    )}
    
    {sourceUrls && (
        <div className="sourceUrls">
          <br />
          <h3>Source</h3>
          <a href={sourceUrls} target="_blank" rel="noopener noreferrer">
            {sourceUrls}
          </a>
        </div>
    )}
    </div>
  </div>
)};

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [selectedFont, setSelectedFont] = useState('serif');

  const handleSearch = async (searchInput) => {
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      setSearchResults(Array.isArray(data) ? data : []);
      setError(Array.isArray(data) ? '' : 'No results found.');
    } catch (error) {
      console.error(error);
      setSearchResults([]);
      setError('An error occurred. Please try again.');
    }
  };

  const renderResults = () => {
    if (error) {
      return <p>{error}</p>;
    }

    return searchResults.map((data) => (
      <SearchResult 
        key={data.word} 
        word={data.word} 
        phonetic={data.phonetic} 
        phonetics={data.phonetics}
        meanings={data.meanings} 
        sourceUrls={data.sourceUrls}
      />
    ));
  };
  
  const handleFontChange = (selected) => {
    setSelectedFont(selected);
  };

  return (
    <div className={`App ${selectedFont}`}>
      <Navbar onSelectFont={handleFontChange} />
      <br />
      <SearchForm onSearch={handleSearch} />
      {renderResults()}
    </div>
  );
};

export default App;


