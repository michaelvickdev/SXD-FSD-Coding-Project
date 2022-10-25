import React, { useRef, useState } from 'react';
import './App.css';
import Gallery from './Gallery';
import { CustomImage, images } from './images';

function App() {
  const [data, setData] = useState<CustomImage[]>(images);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    if (e.target.files) {
      const newData = Array.from(data);
      for (let index = 0; index < e.target.files.length; index++) {
        const file = e.target.files[index];
        const url = URL.createObjectURL(file);

        newData.unshift({
          src: url,
          original: url,
          width: 320,
          height: 212,
          caption: file.name
        })
      }

      setData(newData);
    }
  }

  return (
    <div className="container">
      <div className='header'>
        <h2 className='title'>Gallery</h2>
        <button onClick={() => inputRef.current?.click()} className='upload'>Upload</button>
        <input onChange={handleChange} ref={inputRef} style={{ display: 'none' }} accept="image/*" type="file" />
      </div>
      <Gallery images={data} />
    </div>
  );
}

export default App;
