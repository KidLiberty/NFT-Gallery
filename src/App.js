import React, { useState } from 'react'
import './App.css'

export default function App() {
  const [gallery, setGallery] = useState([])
  const [savedGallery, setSavedGallery] = useState([])
  const [id, setId] = useState(0)
  const [photoNumber, setPhotoNumber] = useState(getRandomInt(1, 5))

  const NFT = props => (
    <div key={props.id} className='photo-container'>
      <div className='photo-id-container'>
        <span className='photo-id'>{props.number + 1}</span>
      </div>
      <img
        src={require(`./images/samo_${props.photoNumber}.png`)}
        alt='Samo Pic'
        style={
          props.isLoading
            ? { border: '2px solid #fddc6d' }
            : { border: '2px solid #25f09b' }
        }
      />
    </div>
  )

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

  function takePhoto() {
    setPhotoNumber(getRandomInt(1, 5))
    setGallery(
      [
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
    )
    setId(id + 1)
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  return (
    <div>
      <div className='title'>NFT Photo Gallery v1.1</div>
      <div className='btn-container'>
        <button className='btn-1' onClick={() => takePhoto()}>
          Take Photo
        </button>
        <button className='btn-2' onClick={() => savePhotos()}>
          Save Photos
        </button>
        <div className='resource-link'>
          <a
            href='https://github.com/KidLiberty'
            target='_blank'
            rel='noreferrer'
          >
            Resources
          </a>
        </div>
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
                  ? { border: '2px solid #fddc6d' }
                  : { border: '2px solid #25f09b' }
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}
