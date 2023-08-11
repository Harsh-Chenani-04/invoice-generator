import React from 'react';
import './Notes.css';

function Notes() {
    return (
        <div className="left-side">
            <span className='xyz' contentEditable="true">Notes</span>
            <textarea placeholder="Add notes here" rows="4" />
            <br>
            </br>
            <span className='xyz' contentEditable="true">Terms</span>
            <textarea placeholder="Terms" rows="4" />
        </div>
    );
}

export default Notes;
