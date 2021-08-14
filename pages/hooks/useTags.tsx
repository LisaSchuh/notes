import {useEffect, useState} from "react";
import  { IBookmarkNote, Tag } from "../api/notes";

interface TagStatistic {
    tag:Tag,
    count:number
}

export function useTags(filterBy:Tag[]) {
    const [tagStatistic, setTagStatistic] = useState<TagStatistic[]>([]);
    const [visibleTags, setVisibleTags] = useState<Tag[]>([]);

    const getUniqueTags = (tags:Tag[]):Tag[] => {
        return [... new Set(tags)];
    }

    useEffect(() => {
        fetch("api/notes").then((data) => data.json())
            .then((notes:IBookmarkNote[]) => {
                let tags:Tag[] = [];
                notes.forEach(n => tags = tags.concat(n.tags) )
                setTagStatistic(getUniqueTags(tags).map(uniqueTag => {
                    return {
                        tag: uniqueTag,
                        count: tags.filter(t => t === uniqueTag).length 
                    }
                }));
            })
    }, []);

    useEffect(() => {
        const sortedStatistics = tagStatistic
            .filter(ts => filterBy.length ? filterBy.filter(t => ts.tag === t).length == 0 : true)
            .sort((tsA, tsB) => tsA.count - tsB.count)
            .reverse();
        setVisibleTags(sortedStatistics.slice(0,5).map(ts => ts.tag));
    }, [tagStatistic, filterBy]);

    return visibleTags;
}

export function useNotes(filterBy:Tag[]) {
    const [notes, setNotes] = useState<IBookmarkNote[]>([]);
    const [visibleNotes, setVisibleNotes] = useState<IBookmarkNote[]>([]);

    useEffect(() => {
        fetch("api/notes").then((data) => data.json())
            .then((notes:IBookmarkNote[]) => { 
                setNotes(notes);
            })
    }, []);
 
    useEffect(()=> {
        if(filterBy && filterBy.length) {
            setVisibleNotes(notes.filter((n) => {
                const found = filterBy.map(f => { 
                    if(n.tags.filter(t => t === f).length) {
                        console.log(`found tag ${f} in note ${n.meta.title}`);
                        return "found";
                    } 
                    return "not found";
                }) 
                .filter(fb => fb === "found")
                console.log(`found length: ${found.length}, filterlenght ${filterBy.length}`)
                return found.length == filterBy.length
            }
            ));
        }
        else {
            setVisibleNotes(notes);
        }
    }, [filterBy, notes])

    return visibleNotes;
}