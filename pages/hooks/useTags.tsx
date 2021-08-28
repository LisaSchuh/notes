import {useEffect, useState} from "react";
import  { IBookmarkNote, Tag } from "../api/notes";

const MAXTAGS = 10;
interface TagStatistic {
    tag:Tag,
    relatedTags: Tag[],
    count:number
}

export function useTags(filterBy:Tag[], searchTerm:string) {
    const [tagStatistic, setTagStatistic] = useState<TagStatistic[]>([]);
    const [visibleTags, setVisibleTags] = useState<Tag[]>([]);

    const getUniqueTags = (tags:Tag[]):Tag[] => {
        return [... new Set(tags)];
    }

    const tagInFilterOrSearch = (ts: TagStatistic):boolean => {
        const notAlreadySelected = filterBy.length ? filterBy.filter(t => ts.tag === t).length == 0 : true;
        const inFilter = filterBy.length ? filterBy.filter(t => ts.relatedTags.includes(t)).length > 0 : true;
        const inSearch = ts.tag.includes(searchTerm);
        return notAlreadySelected && inFilter && inSearch ;
    }

    useEffect(() => {
        fetch("api/notes").then((data) => data.json())
            .then((notes:IBookmarkNote[]) => {
                let tags:Tag[] = [];
                notes.forEach(n => tags = tags.concat(n.tags) )
                setTagStatistic(getUniqueTags(tags).map(uniqueTag => {
                    let relatedTags:Tag[] = [];
                    notes.filter(n => n.tags.includes(uniqueTag)).forEach(n => relatedTags = relatedTags.concat(n.tags) );
                    return {
                        tag: uniqueTag,
                        relatedTags: getUniqueTags(relatedTags),
                        count: tags.filter(t => t === uniqueTag).length 
                    }
                }));
            })
    }, []);

    useEffect(() => {
        const sortedStatistics = tagStatistic
            .filter(tagInFilterOrSearch)
            .sort((tsA, tsB) => tsA.count - tsB.count)
            .reverse();
        setVisibleTags(sortedStatistics.slice(0,MAXTAGS).map(ts => ts.tag));
    }, [tagStatistic, filterBy, searchTerm]);

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