// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import axios from 'axios';
import React from 'react';


function TextToImg() {
    // let textval=inputText.value
    
    const [inputText, setInputText]=React.useState<any>(null)
    const [img, setImg]=React.useState<any>(null)
    // let data = new FormData()
    
const data={
    'id':"xf-tfu-ydfcgv",
    'url':"https://www.altexsoft.com/media/2021/03/rest_api_works.png"
}
   const handleSubmit=()=>{
        // console.log(inputText);
        // data.append('text' , inputText)
        // let params={"text":inputText};
        // console.log(params , "asd" ,data);
        const formData=new FormData();
    formData.append('text',inputText)
        const headers = {
            'content-type': 'multipart/form-data',
            'api-key': '7590deaf-5d23-45e2-a7d5-2a51ec3c8310'
          }
        const apiRes= axios.post("https://api.deepai.org/api/text2img",formData,{headers: headers} 
        ).then((res)=>{
            console.log("rdtfghj",data);
           

        }).catch((err)=>{
            console.log(data.url);
            setImg(data.url);


        })
        // curl -X POST 'https://api.deepai.org/api/text2img'
        // -H 'Content-Type: application/json'
        // -d '{"text":"inputText"}' 
    }
  return (
    <div>
      <input type="text" name='inputText' onChange={(e)=> setInputText(e.target.value)}/>
      <label>Enter Your text</label><br/>
      <button type='submit' onClick={handleSubmit}>GENERATE</button>
      <img src={img} width={"50%"}/>
    </div>
  );
}

export default TextToImg;
