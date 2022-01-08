import {useState, useEffect} from "react"
import TagBox from "./TagBox"

const TagsList = ({selectedTags, suggestions, handleTagClick}) => {
    const [tags, setTags] = useState([])
    const [tagsList, setTagsList] = useState([])
    useEffect(() => {
        setTags(selectedTags)
        setTagsList(suggestions.map((tag) => {
            return {
                "text": tag.text,
                "selected": (selectedTags.find(_tag => _tag.text === tag.text) !== undefined)
            }
        }))
    }, [selectedTags, suggestions])
    return (
        <div>
            {tagsList.map((tag, index) => {
                return <TagBox key={index} text={tag.text} selected={tag.selected} 
                        handleTagClick={() => {
                            if(tag.selected === false) 
                                handleTagClick(tag.text)
                            }
                        }
                        />
            })}
        </div>
    )
}

export default TagsList;