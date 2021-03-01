import './TimeboxEditor.scss'
import styled, { css } from 'styled-components'

const Button = styled.button`
        ${props =>
            props.lightpurple && 
            css`
            background: #7d889b;
            `};
        
        `  
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
            <Button 
                onClick={startOnClick} 
                className="timebox-editor__button"
                disabled={isRunning}
                lightpurple={isRunning}
                >Zacznij
            </Button>
        </section>
     );
}
 
export default TimeboxEditor;