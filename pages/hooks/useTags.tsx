import {useEffect, useState} from "react";
import  { IBookmarkNote, Tag } from "../api/notes";

export function useTags() {
    const [tags, setTags] = useState<Tag[]>([]);

    const getUniqueTags = (tags:Tag[]):Tag[] => {
        return [... new Set(tags)];
    }
    useEffect(() => {
        fetch("api/notes").then((data) => data.json())
            .then((notes:IBookmarkNote[]) => {
                let tags:Tag[] = [];
                notes.forEach(n => tags = tags.concat(n.tags) )
                setTags(getUniqueTags(tags));
            })
    }, []);

    return tags;
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
            setVisibleNotes(notes.filter((n) => filterBy.map(f => n.tags.filter(t => t === f).length ? "found" : "not found")
                                                        .filter(fb => fb === "found").length));
        }
        else {
            setVisibleNotes(notes);
        }
    }, [filterBy, notes])

    return visibleNotes;
}