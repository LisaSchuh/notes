export interface IMeta {
    title: string;
    description: string;
    img: string;
  }
  
  export type Tag = string;
  

  export interface IBookmarkNote {
    guid:string,
    title: string,
    text: string,
    link: string,
    tags: Tag[]
  } 