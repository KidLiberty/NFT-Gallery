import React, { useState } from 'react'
import './App.css'

export default function App() {
  const [gallery, setGallery] = useState([])
  const [savedGallery, setSavedGallery] = useState([])
  const [id, setId] = useState(0)

  function savePhotos() {
    let newGallery = gallery.map(image => ({ ...image, isLoading: true }))
    setSavedGallery([...newGallery, ...savedGallery])
    newGallery = gallery.map(image => ({ ...image, isLoading: false }))
    setTimeout(() => {
      setSavedGallery(
        [...newGallery, ...savedGallery].sort((a, b) => {
          return b.id - a.id
        })
      )
    }, 1000)
    setGallery([])
  }

  return (
    <div>
      <div className='btn-container'>
        <button
          onClick={() => {
            const sort = [
              ...gallery,
              {
                id: id,
                image: <img src={require('./images/samo.png')} alt='Samo Pic' />
              }
            ].sort((a, b) => {
              return b.id - a.id
            })
            setGallery(sort)
            setId(id + 1)
          }}
        >
          Take Photo
        </button>
        <button onClick={() => savePhotos()}>Save Photos</button>
      </div>
      <div className='gallery'>
        {gallery.map(object => (
          <div key={object.id} className='photo-container'>
            <div className='photo-id-container'>
              <div className='photo-id'>{object.id + 1}</div>
            </div>
            <img src={require('./images/samo.png')} alt='Samo Pic' />
          </div>
        ))}
        {savedGallery.map(object => (
          <div key={object.id} className='photo-container'>
            <div className='photo-id-container'>
              <span className='photo-id'>{object.id + 1}</span>
            </div>
            <img
              src={require('./images/samo.png')}
              alt='Samo Pic'
              style={
                object.isLoading
                  ? { border: '1px solid #fddc6d' }
                  : { border: '1px solid #34ffaa' }
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}
