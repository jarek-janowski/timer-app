import './TimeboxEditor.scss'

const TimeboxEditor = () => {
    return ( 
        <section className="timebox-editor">
            <label className="timebox-editor__title">Co chcesz zrobić?: <input className="timebox-editor__input"defaultValue="Co będę robić" type="text"/></label>
            <label className="timebox-editor__title">Ile minut?: <input className="timebox-editor__input"defaultValue="20" type="number"/></label>
            <button className="timebox-editor__button">Zacznij</button>
        </section>
     );
}
 
export default TimeboxEditor;