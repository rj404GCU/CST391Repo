import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
//import Card from './Card';
import SearchAlbum from './SearchAlbum';
import NavBar from './NavBar';
import OneAlbum from './OneAlbum';
import EditAlbum from './EditAlbum';
import './App.css';
//import albums from './albums.json';
import dataSource from './dataSource';

const App = () => {
  const [searchPhase, setSearchPhrase] = useState('');
  const [albumList, setAlbumList] = useState([]);
  const [currentlySelectedAlbumId, setCurrentlySelectedAlbumId] = useState(0);
  
  let refresh = false;
  
  const updateSearchResults = async (phrase) => {
    console.log('phrase is ' + phrase);
    setSearchPhrase(phrase)
  };

  //set up intialization call back
  useEffect(() => {
    //update album list
    loadAlbums();
  }, [refresh]);
  
  const loadAlbums = async() => {
    const response = await dataSource.get('/albums');

    setAlbumList(response.data);
  };

  const updateSingleAlbum = (id, navigate, uri) => { 
    console.log('Update Single Album = ', id);
    console.log('Update Single Album = ', navigate);

    var indexNumber = 0;

    for (var i = 0; i < albumList.length; ++i) {
      if (albumList[i].id === id) indexNumber = i;
    };
    
    setCurrentlySelectedAlbumId(indexNumber);

    let path = uri + indexNumber;
    console.log('path' + indexNumber); 
    navigate(path);
  };

  const renderedList = albumList.filter((album) => {
      if (
        album.description.toLowerCase().includes(searchPhase.toLowerCase()) ||
        searchPhase === '')  
        {
          return true
        } else {
        return false;
        }
  });

  console.log('renderedList ', renderedList);

  const onEditAlbum = (navigate) => { 
    loadAlbums();
    navigate("/");
  };


  return (
    <>
    <BrowserRouter> 
      <NavBar />
      <Routes>
        <Route exact path='/' element={
          <SearchAlbum
            updateSearchResults={updateSearchResults}
            albumList={renderedList}
            updateSingleAlbum={updateSingleAlbum}
          />
        }
        />
        <Route exact path='/new' element={<EditAlbum onEditAlbum={onEditAlbum} />} />
        <Route exact path='/edit/:albumId' element={<EditAlbum onEditAlbum={onEditAlbum} album={albumList[currentlySelectedAlbumId]}/>} />
        <Route exact path='/show/:albumId' element={<OneAlbum album={albumList[currentlySelectedAlbumId]} />}
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
