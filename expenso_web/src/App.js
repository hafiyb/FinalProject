import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Login from './containers/login';

import { useState } from 'react';
import Dashboard from './containers/dashboard';



function App() {
  // var countValue = 0
  const [countValue, setCountValue] = useState(0)
  return (
    <Routes>
      <Route path="/home" element={<Dashboard/>}></Route>
      <Route path="/" element={<Login/>}></Route>
      
    </Routes>

    
    // <div className="w-full bg-gray-600 flex flex-col items-center">
    //   <Header title="title test" subtitle="sub title test" menuTwo="test one" />
    //   <Section title="Section 1" caption="Caption 1">
    //     <div className="flex flex-row">
    //       <div className=" bg-gray-600 m-10" style={{height:'200px',width:'200px'}}></div>
    //       <div className=" bg-gray-600 m-10" style={{height:'200px',width:'200px'}}></div>
    //       <div className=" bg-gray-600 m-10" style={{height:'200px',width:'200px'}}></div>
    //     </div>
    //     <div>
    //       <h1>Count : {countValue}</h1>

    //       <button className="bg-gray-500 py-3 px-6 rounded-xl m-2" onClick={() => {countValue < 20 ? setCountValue(countValue + 1) : setCountValue(countValue) }}>+</button>
    //       <button className="bg-gray-500 py-3 px-6 rounded-xl m-2" onClick={() => {countValue > 0 ? setCountValue(countValue - 1) : setCountValue(countValue) }}>-</button>
    //     </div>

    //   </Section>
    //   <Section title="Section 2" caption="Caption 2">
    //     <Form />
    //   </Section>
    //   <Section />
    //   <Footer />
    // </div>
  );
}

export default App;
