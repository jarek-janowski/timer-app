import './TaskHistory.scss'

const Storage = ({jsonParseTitle, jsonParseTime}) => {

    const titleUpdate = jsonParseTitle && jsonParseTitle.reduce((acc, b) => ([b, ...acc]), []).slice(0, 3).map((item, id)=>{
        return(
        <li key={id}>{item}</li>)
    })

    const timeUpdate = jsonParseTime && jsonParseTime.reduce((acc, b) => ([b, ...acc]), []).slice(0, 3).map((item, id)=>{
        const slicedItem = item.slice(0,3)
        return(
        <li key={id}>{slicedItem < 1 ? `<1` : slicedItem}min</li>)
    })
        return ( 
            <section className="history">
                <h2 className="history__heading">Ostatnie trzy zadania</h2>
                <div className="history-wrapper">
                    <ul className="history-list">
                        <h3 className="history-list__heading">Nazwa</h3>
                        {titleUpdate}
                    </ul>
                    <ul className="history-list">
                        <h3 className="history-list__heading">Czas</h3>
                        {timeUpdate}
                    </ul>
                </div>
            </section>
         );
}
  
export default Storage;