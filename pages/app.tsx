import { useState } from 'react';
import styles from '../styles/App.module.css'
import { Tag } from './api/notes';
import { useTags, useNotes } from './hooks/useTags';

export default function App() {    
    const [activeTags, setActiveTags] = useState<Tag[]>([]);
    const tags = useTags(activeTags);
    const notes = useNotes(activeTags);

    const renderTags = (tags:Tag[]) => {
        return tags.map(t => <button 
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
                <input />
            </div>
        </nav>

        <div className={styles.filter}>
            { tags && renderTags(tags)}
        </div>


        <div className={styles.notes} >
            { notes && notes.map(note => 
                <div className={styles.note}>
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