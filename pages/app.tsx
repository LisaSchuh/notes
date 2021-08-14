import { useState } from 'react';
import styles from '../styles/App.module.css'
import { Tag } from './api/notes';
import { useTags, useNotes } from './hooks/useTags';

export default function App() {    
    const [activeTags, setActiveTags] = useState<Tag[]>([]);
    const tags = useTags();
    const notes = useNotes(activeTags);

    return <main className={styles.main}>
        <header>
            <div className={styles.breadcrump}>Electronics - Projects - Theremin</div>
            <div className={styles.search}>
                <label >search</label>
                <input />
            </div>
        </header>
        {/* warum geht mein debugger nicht */}

        <div className={styles.filter}>
            { tags && tags.map(t => <button className={styles.filter__tag} onClick={() => {setActiveTags(activeTags.concat(t))}}>{t}</button>)}
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