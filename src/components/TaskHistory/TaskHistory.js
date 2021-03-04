import './TaskHistory.scss'

const Storage = ({jsonParseTitle, jsonParseTime}) => {

    const titleUpdate = jsonParseTitle && jsonParseTitle.reduce((acc, b) => ([b, ...acc]), []).slice(0, 3).map((item, id)=>{
        return(
        <li key={id}>{item}</li>)
    })

    const timeUpdate = jsonParseTime && jsonParseTime.reduce((acc, b) => ([b, ...acc]), []).slice(0, 3).map((item, id)=>{
        const slicedItem = item.slice(0,3)
            if(slicedItem > 59) {
                const hours = (slicedItem/60).toFixed(0)
                const minutes = slicedItem%60
                return(<li key={id}>{hours}g {minutes}min</li>)
            }
        
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