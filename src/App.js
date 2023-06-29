import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchInput} onChange={handleInputChange} placeholder="Enter a word" />
      <Button id="butSearch" type="submit" variant="primary">Search</Button>{' '}
    </form>
  );
};

const SearchResult = ({ word, meanings, phonetic, phonetics, sourceUrls }) => {
  const playAudio = (audioUrl) => new Audio(audioUrl).play();

  return (
    <div className='container'>
      <div className='content-header'>
        <br />
        <div className='row'>
          <div className='col'>
            <h2>{word}</h2>
            <h3>{phonetic}</h3>
          </div>
          <div className='col'>
            {phonetics.map((phonetic) => (
              <div key={uuidv4()} className="phonetics">
               {phonetic.audio && (
                  <div>
                    <img onClick={() => playAudio(phonetic.audio)} src='play.png' alt="add item" width="50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='cont'>
        {meanings.map((meaning) => (
          <div className='text-start border-bottom' key={uuidv4()}>
            <h3>{meaning.partOfSpeech}</h3>
            <div className='text-start border-bottom'></div>
            <br />
            <div className='text-start text-muted'><h5>Meaning</h5></div>

            <div>
              {meaning.definitions.map((definition) => (
                <ul key={uuidv4()}>
                  <li>
                    <p>{definition.definition}</p>
                    <div className='text-muted'>{definition.example}</div>
                  </li>
                </ul>
              ))}
            </div>
            <div className='text-start text-muted'><h5>Synonyms</h5></div>
            <p>{meaning.synonyms[0]}</p>
          </div>
        ))}

        {sourceUrls && (
          <div className="sourceUrls" key={uuidv4()}>
            <br />
            <h3>Source</h3>
            <a href={sourceUrls} target="_blank" rel="noopener noreferrer">
              {sourceUrls}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [selectedFont, setSelectedFont] = useState('serif');
  const [initialLoad, setInitialLoad] = useState(true); // Variable de estado para controlar la carga inicial


  const handleSearch = async (searchInput) => {
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`;
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);
      setSearchResults(Array.isArray(data) ? data : []);
      setError(Array.isArray(data) ? '' : 'No results found.');
    } catch (error) {
      console.error(error);
      setSearchResults([]);
      setError('An error occurred. Please try again.');
    }
    setInitialLoad(false);
  };

  
  const renderResults = () => {
    if (error && !initialLoad) { // Verificar si no es la carga inicial para mostrar el mensaje de error
      return <p>{error}</p>;
    }

    return searchResults.map((data) => (
      <SearchResult 
        key={uuidv4()}
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
