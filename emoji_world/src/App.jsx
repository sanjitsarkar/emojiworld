import React, { useEffect, useState } from 'react'
import './App.css'
import useInput from './useInput'
import emojiDict from './store/emoji.json'
import EmojiConatiner from './components/EmojiConatiner'
import EmojiBox from './components/EmojiBox'

function App() {
const [emoji, bindEmoji,resetEmoji] = useInput("")
const [emojiName, bindEmojiName,resetEmojiName] = useInput("")
const [emojiInfo, setEmojiInfo] = useState("")
const [showEmojiInput1, setShowEmojiInput1] = useState(true)
const [showEmojiInput2, setShowEmojiInput2] = useState(false)
// useEffect(() => {
//   console.log("emojiDict",emojiDict)
// }, [])
// useEffect(() => {
//   console.log("showEmojiInput2",showEmojiInput2)
  
// }, [showEmojiInput2])

const searchEmojiInfoByEmoji = async(__emoji) => {
  if(__emoji!==undefined)
  {
    
  let _emoji_info = await emojiDict.find((_emoji)=>_emoji.emoji==__emoji)
  if(_emoji_info!==undefined)
  {
    console.log("Hello",_emoji_info)
  setEmojiInfo([_emoji_info])
  }
  else{
    console.log("emojinot",emoji)

    setEmojiInfo([])
  
    }
  }
  else{
  resetEmojiName()
  setEmojiInfo("")
  if(emoji.trim()!=="")
  {

  let _emoji_info = await emojiDict.find((_emoji)=>_emoji.emoji==emoji)
  // console.log(_emoji_info)
  if(_emoji_info!==undefined)
  {
    console.log("Hello",_emoji_info)
  setEmojiInfo([_emoji_info])
  }
  else{
    console.log("emojinot",emoji)

    setEmojiInfo([])
  
    }
    // resetEmoji()
  }
}
}

const searchEmojiInfoByEmojiName = async() => {
  resetEmoji()
  setEmojiInfo("")
  if(emojiName.trim()!=="")
  {
    console.log("emojiName",emojiName)
 
  let _emoji_info = await emojiDict.filter(_emoji => {
    if((_emoji.category.toLowerCase().includes(emojiName.toLowerCase()) || _emoji.description.toLowerCase().includes(emojiName.toLowerCase() || _emoji.aliases.toLowerCase().includes(emojiName.toLowerCase()))))
    {
      return true
    }
    return false
  
  })
  if(_emoji_info!==undefined)
  {
  // console.log("Hello2",_emoji_info)
  setEmojiInfo(_emoji_info)
  }
  else{
  setEmojiInfo([])

  }
  // resetEmojiName()
}


}
useEffect(() => {
searchEmojiInfoByEmoji()
}, [emoji])
useEffect(() => {
  searchEmojiInfoByEmojiName()
}, [emojiName])
  return (
    <div className="App">
     <h1>Emoji World</h1>
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
     (<input type="text" placeholder="Search by emoji"  {...bindEmoji} />)
    }
    {
      showEmojiInput2 &&
     (<input type="text" placeholder="Search by emoji name,category" {...bindEmojiName}/>)
    }
    <div className="row">
    <EmojiConatiner emojies = {emojiInfo}/>
    <EmojiBox emojiDict = {emojiDict} searchEmojiInfoByEmoji = {searchEmojiInfoByEmoji}/>
    </div>
    </div>
  )
}

export default App
