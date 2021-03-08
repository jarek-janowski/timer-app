import './EndOfTime.scss'

const EndOfTime = ({stop, title, totalTimeInMinutes}) =>{
    return(
        <section className="end-of-time">
            <div className="info">
                <h3 className="info__title">{title}</h3>
                <p className="info__time">{totalTimeInMinutes<1 ? "<1min" : `${totalTimeInMinutes}min`}</p>
            </div>
            <div className="stop">
                <h2 className="stop__title">Czas upłynął!</h2>
                <button className="stop__button" onClick={stop}>OK</button>
            </div>
        </section>
    )
}

export default EndOfTime