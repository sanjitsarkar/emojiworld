import React, { useEffect, useState } from 'react'
import './App.css'
import useInput from './useInput'
import emojiDict from './store/emoji.json'
import EmojiConatiner from './components/EmojiConatiner'
import EmojiBox from './components/EmojiBox'
function App() {
const [emoji,bindEmoji,setEmoji,resetEmoji] = useInput("")
const [emojiName, bindEmojiName,resetEmojiName] = useInput("")
const [emojiInfo, setEmojiInfo] = useState("")
const [showEmojiInput1, setShowEmojiInput1] = useState(true)
const [showEmojiInput2, setShowEmojiInput2] = useState(false)
const [loading, setLoading] = useState(false)

const emojiWorker1 = new window.Worker("./worker/emojiWorker1.js")
const emojiWorker2 = new window.Worker("./worker/emojiWorker2.js")
useEffect(() => {
  // searchEmojiInfoByEmojiName()
  searchEmojiInfoByEmoji()
}, [])

// useEffect(async() => {
//   // console.log("emojiDict",emojiDict)
// //   console.log("emojiWorker1",emojiWorker1)
// // console.log("emojiWorker2",emojiWorker2)
// emojiWorker1.postMessage([emojiDict,"sad"])


// }, [])
// emojiWorker1.onmessage = (e)=>{
//   console.log(e.data)
// }
// useEffect(() => {
//   console.log("showEmojiInput2",showEmojiInput2)
  
// }, [showEmojiInput2])

const searchEmojiInfoByEmoji = (e,__emoji) => {
  if(e!==undefined)
  e.preventDefault()
  if(__emoji!==undefined)
  {
  setEmojiInfo("")
    setEmoji(__emoji)
    setLoading(true)
emojiWorker2.postMessage([emojiDict,__emoji])
  
  emojiWorker2.onmessage = (e)=>{
    let _emoji_info = e.data
    if(_emoji_info!==undefined)
  {
    // console.log("Hello",_emoji_info)
    setLoading(false)

  setEmojiInfo([_emoji_info])
  }
  else{
    // console.log("emojinot",emoji)
    setLoading(false)

    setEmojiInfo([])
  
    }
  }
  
  }
  else{
  resetEmojiName()
  setEmojiInfo("")
  if(emoji.trim()!=="")
  {
setLoading(true)
  emojiWorker2.postMessage([emojiDict,emoji])

  emojiWorker2.onmessage = (e)=>{
    let _emoji_info = e.data
    if(_emoji_info!==undefined)
  {
setLoading(false)

  setEmojiInfo([_emoji_info])
  }
  else{
    setLoading(false)

    setEmojiInfo([])
  
    }
  }
}
}
}
const searchEmojiInfoByEmojiName = (e) => {
  if(e!==undefined)

  e.preventDefault()

  resetEmoji()
  setEmojiInfo("")
  if(emojiName.trim()!=="")
  {
    setLoading(true)

  emojiWorker1.postMessage([emojiDict,emojiName])

  emojiWorker1.onmessage = (e)=>{
    let _emoji_info = e.data
    if(_emoji_info!==undefined)
  {
setLoading(false)

  setEmojiInfo(_emoji_info)
  }
  else{
    setLoading(false)

    setEmojiInfo([])
  
    }
  }
}
 // resetEmojiName()
}



// useEffect(() => {
// searchEmojiInfoByEmoji()
// }, [emoji])
// useEffect(() => {
//   searchEmojiInfoByEmojiName()
// }, [emojiName])
  return (
    <div className="App">
     <h1>Emoji <span>World</span></h1>
     <div className="btn_group">
     <button className="emoji_button" onClick={()=>{
       setShowEmojiInput1(true)
       setShowEmojiInput2(false)
    }}>Search by emoji</button>
       <button className="emoji_name_button" onClick={()=>{
       setShowEmojiInput1(false)
       setShowEmojiInput2(true)
    }}>Search by emoji name,category</button>
    </div>
   
    {
      showEmojiInput1 &&
     (
     <form onSubmit={(e)=>searchEmojiInfoByEmoji(e)}>
     <input type="text" placeholder="Search by emoji"  {...bindEmoji} />
     <button type="submit">Search</button>
     </form>
     )
    }
    {
      showEmojiInput2 &&
     (
      <form onSubmit={(e)=>searchEmojiInfoByEmojiName(e)}>
     <input type="text" placeholder="Search by emoji name,category" {...bindEmojiName}/>
     <button type="submit">Search</button>
    </form>)
    }
    <div className="row">
    <EmojiConatiner emojies = {emojiInfo} loading = {loading}/>
    <EmojiBox emojiDict = {emojiDict} searchEmojiInfoByEmoji = {searchEmojiInfoByEmoji}/>
    </div>
    </div>
  )
}

export default App
