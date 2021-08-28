import { useState } from 'react';
import styles from '../styles/App.module.css'
import { Tag } from './api/notes';
import { useTags, useNotes } from '../hooks/useTags';

export default function App() {    
    const [activeTags, setActiveTags] = useState<Tag[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const tags = useTags(activeTags, searchInput);
    const notes = useNotes(activeTags);

    const renderTags = (tags:Tag[]) => {
        return tags.map(t => <button key={t}
            className={`${styles.filter__tag} ${activeTags.includes(t) ? "test123" : ""}`} 
            onClick={() => {
                    setActiveTags( activeTags.includes(t) ? activeTags.filter(at => at != t) : activeTags.concat(t))  
                }
            }
            >
                {t}
            </button>)
    }

    return <main className={styles.main}>
        <nav>
            <div className={styles.filter}>
                { activeTags && renderTags(activeTags)}
            </div>
            <div className={styles.search}>
                <label >search</label>
                <input value={searchInput} onChange={(el)=>{ setSearchInput(el.target.value);}}/>
            </div>
        </nav>

        <div className={styles.filter}>
            { tags && renderTags(tags)}
        </div>


        <div className={styles.notes} >
            { notes && notes.map(note => 
                <div className={styles.note} key={note.guid}>
                    <div className="note note__img">
                                {/* <img src="https://bikepacking.com/wp-content/uploads/2013/06/altravesur-bikepacking-route.jpg"></img> */}
                    </div>
                    <div className="note note__title">{note.meta.title}</div>
                    <div className="note note__description">{note.meta.description}</div>
                </div>
            )}
        </div>

        </main>
}