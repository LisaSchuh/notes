import {useEffect, useState} from "react";
import {
    gql, useQuery
  } from "@apollo/client";
import  { IBookmarkNote, Tag } from "@notes/types";
import { TagQuery } from "./useTags";


export function useNotes(activeTags:Tag[]) {
    const { error, loading, data } = useQuery<NotesQuery>(GET_TAGS, {
        variables: { activeTags }
    });
    const [ notes, setNotes ] = useState<IBookmarkNote[]>([]);

    useEffect(() => {
        if(data && data.notes) {
            setNotes(data.notes
                .filter(filterNotesNotLinkedWithAllTags)
                .map(n => {
                    const flatTags = n.tags.map((t:any)=> t.name);
                    //TODO: there has to be an easier way...
                    return {
                        guid: n.guid,
                        title: n.title,
                        text: n.text,
                        link: n.link,
                        tags: flatTags
                    }
                }));
        }
    }, [data])

    //TODO Both FilterMethods should be handled by the server not the client
    function filterNotesNotLinkedWithAllTags(n:NoteQuery): boolean {
        return n.tags.length == activeTags.length || activeTags.length == 0
    }

    return {error, loading, notes};
}


interface NotesQuery {
    notes: NoteQuery[]
}
interface NoteQuery {
    guid:string,
    title: string,
    text: string,
    link: string,
    tags: TagQuery[]
}

const GET_TAGS = gql`
query GetNotes($activeTags:[String]!) { 
    notes {
        guid,
        title,
        text,
        link,
        tags(where: { name_IN: $activeTags }) {
            name
        }
    }
}
`;
