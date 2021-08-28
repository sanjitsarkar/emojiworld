import React from 'react'

const EmojiBox = ({emojiDict,searchEmojiInfoByEmoji}) => {
    return (
        <div>
            <div className="emoji_box">
        <h2>Click below emoji to get info </h2>
        {emojiDict.slice(0, 100).map(function (emoji, index) {
    
          return (
            <span
              style={{ fontSize: "2rem", cursor: "pointer" }}
              key={emoji.emoji}
              onClick={(e) => searchEmojiInfoByEmoji(e,emoji.emoji)}
            >
              {emoji.emoji}{" "}
            </span>
          );
        })}
      </div>
        </div>
    )
}

export default EmojiBox
