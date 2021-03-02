import React, { Component } from 'react';
import './Storage.scss'

const jsonParseTitle = JSON.parse(localStorage.getItem('title'))
const jsonParseTime = JSON.parse(localStorage.getItem('time'))

class Storage extends Component {
    
    render() { 
        return ( 
            <section className="storage">
                <h2 className="storage__heading">Ostatnie 3 zadania</h2>
                <div className="storage-wrapper">
                    <ul className="storage-list">
                        <h3 className="storage-list__heading">Nazwa</h3>
                        {jsonParseTitle && jsonParseTitle.reduce((acc, b) => ([b, ...acc]), []).slice(0, 3).map((item, id)=>{
                            return(
                            <li key={id}>{item}</li>)
                        })
                        }
                    </ul>
                    <ul className="storage-list storage-list--time">
                        <h3 className="storage-list__heading">Czas</h3>
                        {jsonParseTime && jsonParseTime.reduce((acc, b) => ([b, ...acc]), []).slice(0, 3).map((item, id)=>{
                            return(
                            <li key={id}>{item}</li>)
                        })
                        }
                    </ul>
                </div>
            </section>
         );
    }
}
  
export default Storage;