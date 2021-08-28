import React from 'react'

const EmojiConatiner = ({emojies,loading}) => {
// console.log("emojicontainer",emojies)
    return (
        <div className="emoji_container">
            {emojies==="" && !loading && <h3>Search Emoji</h3>}
            {
                loading && <h3>Loading...</h3>
            }
              {
                !emojies.length && emojies!=="" && (<h3>No Info found</h3>)
            }
            {
                
                emojies!=="" && emojies.map((_emoji)=>
                
                    (<div className="emoji_info" key={_emoji.aliases}>
                 <div className="emoji">{_emoji.emoji}</div>
                 <div className="row">
                 <div className="emoji_desc"><span>Description</span><p>{_emoji.description}</p></div>
                 <div className="emoji_aliases"><span>Aliases</span><p>{_emoji.aliases}</p></div>
                 <div className="emoji_category"><span>Category</span><p>{_emoji.category}</p></div>
                 </div>
                </div>
                )
            
                )
            }
          
        </div>
    )
}

export default EmojiConatiner
