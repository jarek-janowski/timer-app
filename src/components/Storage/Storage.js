import './Storage.scss'


const Storage = ({jsonParseTitle, jsonParseTime}) => {
    const titleUpdate = jsonParseTitle && jsonParseTitle.reduce((acc, b) => ([b, ...acc]), []).slice(0, 3).map((item, id)=>{
        return(
        <li key={id}>{item}</li>)
    })

    const timeUpdate = jsonParseTime && jsonParseTime.reduce((acc, b) => ([b, ...acc]), []).slice(0, 3).map((item, id)=>{
        return(
        <li key={id}>{item}</li>)
    })
        return ( 
            <section className="storage">
                <h2 className="storage__heading">Ostatnie 3 zadania</h2>
                <div className="storage-wrapper">
                    <ul className="storage-list">
                        <h3 className="storage-list__heading">Nazwa</h3>
                        {titleUpdate}
                    </ul>
                    <ul className="storage-list storage-list--time">
                        <h3 className="storage-list__heading">Czas</h3>
                        {timeUpdate}
                    </ul>
                </div>
            </section>
         );
}
  
export default Storage;