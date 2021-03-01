import './TimeboxEditor.scss'

const TimeboxEditor = ({
    title, 
    totalTimeInMinutes, 
    titleChange, 
    totalTimeInMinutesChange, 
    startOnClick,
    isRunning
}) => {
    
    
    return ( 
        <section className="timebox-editor">
            <label className="timebox-editor__title">
                Co chcesz zrobić?: 
                <input 
                    className="timebox-editor__input"
                    value={title}
                    type="text"
                    onChange={titleChange}
                />
            </label>
            <label className="timebox-editor__title">
                Ile minut?: 
                <input 
                    className="timebox-editor__input"
                    value={totalTimeInMinutes} 
                    type="number"
                    onChange={totalTimeInMinutesChange}
                    />
            </label>
            <button 
                onClick={startOnClick} 
                className="timebox-editor__button"
                disabled={isRunning}
                >Zacznij
            </button>
        </section>
     );
}
 
export default TimeboxEditor;