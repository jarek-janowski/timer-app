const TimeboxEditor = () => {
    return ( 
        <section>
            <label>Co chcesz zrobić?: <input defaultValue="Co będę robić" type="text"/></label>
            <label>Ile minut?: <input defaultValue="20" type="number"/></label>
            <button>Zacznij</button>
        </section>
     );
}
 
export default TimeboxEditor;