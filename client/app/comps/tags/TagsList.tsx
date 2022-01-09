import {useState, useEffect} from "react"
import TagBox from "./TagBox"

const TagsList = ({selectedTags, suggestions, handleTagClick, classNames}) => {
    const [tags, setTags] = useState([])
    const [tagsList, setTagsList] = useState([])
    useEffect(() => {
        setTags(selectedTags)
        setTagsList(suggestions.map((tag) => {
            return {
                "text": tag.text,
                "selected": (selectedTags.find(_tag => _tag.text === tag.text) !== undefined)
            }}).sort((e1, e2) => {
                if(e1.selected === e2.selected){
                    if(e1.text <= e2.text)
                        return -1;
                    else
                        return 1;
                } else{
                    if(e1.selected || (!e2.selected))
                        return -1;
                    else
                        return 1;
                }
            })
        )
        console.log(tagsList)
    }, [selectedTags, suggestions])
    return (
        <div className={classNames.tagsList}>
            {tagsList.map((tag, index) => {
                return <TagBox key={tag.text} text={tag.text} selected={tag.selected} 
                            tagBoxClassName={classNames.tags}
                            selectedClassName={classNames.selectedBox}
                            unselectedClassName={classNames.unselectedBox}
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