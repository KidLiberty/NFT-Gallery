import React, { useState } from 'react'
import './App.css'

export default function App() {
  const [gallery, setGallery] = useState([])
  const [savedGallery, setSavedGallery] = useState([])
  const [id, setId] = useState(0)
  const [photoNumber, setPhotoNumber] = useState('1')

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

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  return (
    <div>
      <div className='title'>Photo Gallery v1.1</div>
      <div className='btn-container'>
        <button
          onClick={() => {
            setPhotoNumber(parseInt(getRandomInt(1, 5)))
            const sort = [
              ...gallery,
              {
                id: id,
                photoNumber: photoNumber,
                image: (
                  <img
                    src={require(`./images/samo_${photoNumber}.png`)}
                    alt='Samo Pic'
                  />
                )
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
            <img
              src={require(`./images/samo_${object.photoNumber}.png`)}
              alt='Samo Pic'
            />
          </div>
        ))}
        {savedGallery.map(object => (
          <div key={object.id} className='photo-container'>
            <div className='photo-id-container'>
              <span className='photo-id'>{object.id + 1}</span>
            </div>
            <img
              src={require(`./images/samo_${object.photoNumber}.png`)}
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
