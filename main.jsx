import { useEffect, useState } from "react"
export function Main(){

    const [meme,setMeme]=useState({
        topText:"",
        bottomText:"",
        imageUrl:"http://i.imgflip.com/1bij.jpg"
    })
    function handleChange(event){
        const {value,name}=event.currentTarget
        setMeme(prevMeme=>({
            ...prevMeme,
            [name]:value
        }))}
const [allMemes,setAllMemes]=useState([])
    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setAllMemes(data.data.memes))

    },[])
    
    function getRandomMeme(){
        const randomNumber=Math.floor(Math.random()*allMemes.length)
        const randome_meme=allMemes[randomNumber].url
        setMeme(prevMeme=>({
            ...prevMeme,
            imageUrl:randome_meme
        }))

    }
    return(
        <main>
            <div className="form">
                <label>Top Text
                    <input type="text" placeholder="One does not simply" name="topText" onChange={handleChange}
                    value={meme.topText}/>
                </label>

                <label>Bottom Text
                    <input type="text" placeholder="Walk into Mordor" name="bottomText" onChange={handleChange} value={meme.bottomText}/>
                </label>
                <button onClick={getRandomMeme}>Get a new meme image</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} value="one does not simplify"/>
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}