import {useEffect, useState} from "react";
import {
    gql, useQuery
  } from "@apollo/client";
import  { IBookmarkNote, Tag } from "@notes/types";


export function useTags(activeTags:Tag[], searchTerm:string) {
    const { error, loading, data } = useQuery<TagsQuery>(GET_TAGS, {
        variables: { searchTerm, activeTags }
    });
    const [ visibleTags, setVisibleTags ] = useState<Tag[]>([]);

    useEffect(() => {
        if(data && data.tags) {
            setVisibleTags(data.tags
                .filter(filterTagsNotLinkedWithAllActiveTags)
                .map(t => t.name));
        }
    }, [data])

    //TODO Both FilterMethods should be handled by the server not the client
    function filterTagsNotLinkedWithAllActiveTags(t:TagQuery):boolean {
        return (activeTags.length == 0 || (t.taggedTogether.length + t.taggedTogetherOUT.length == activeTags.length)) 
    }

    return {error, loading, visibleTags};
}


interface TagsQuery {
    tags: TagQuery[]
}
export interface TagQuery {
    name:string,
    taggedTogether: TagQuery[],
    taggedTogetherOUT: TagQuery[]
}

const GET_TAGS = gql`
    query GetTags($searchTerm:String!, $activeTags:[String]!) { 
        tags(where: { name_CONTAINS: $searchTerm}) {
            name
            taggedTogether(where: { name_IN: $activeTags }) {
                name
            }
            taggedTogetherOUT(where: { name_IN: $activeTags }) {
                name
            }
        }
    }
`;
