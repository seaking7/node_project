import React, {useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import ImageBox from './components/ImageBox';

function App() {
  const inpRef = useRef<HTMLInputElement>(null);

  // const [imageList, setImageList] = useState<string[]([])

  return (
    <div className="container">
      <div className ='initial-box'>
        <div className="text-center">
          이미지가 없습니다. <br />
          이미지를 추가해주세요.
        </div>
        <input type="file" ref={inpRef} onChange={(event) => {
          console.log(event.currentTarget.value)
        }}/>
        <div className='plus-box'
        onClick={()=>{
          inpRef.current?.click()
        }}>
          +
        </div>
      </div>
      <ImageBox src="./a.jpg" />
    </div>
  );
}

export default App;
