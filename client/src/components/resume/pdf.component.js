import React from 'react'
import resumePDF from './resume.pdf';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import styles from './resume.module.css';

export default function DisplayResume(){
    return(
        <div id="pdf-container">
            <Document file={resumePDF} className={styles.resumePdf}>
                <Page pageNumber={1}/>
            </Document>
        </div>
    )
}
