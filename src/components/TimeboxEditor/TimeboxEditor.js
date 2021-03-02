import './TimeboxEditor.scss'
import styled, { css } from 'styled-components'
import Storage from '../Storage/Storage'

const Input = styled.input`
${props =>
    props.redBorder &&
css`
    border: 1px solid #D90429;
`};
`

const TimeboxEditor = ({
    title, 
    totalTimeInMinutes, 
    titleChange, 
    totalTimeInMinutesChange, 
    startOnClick,
    isRunning,
    validationTitle,
    validationMinutes
}) => {
    
    return ( 
        <section className="timebox-editor">
            <label className="timebox-editor__title">
                Co chcesz zrobić?: 
                <Input 
                    className="timebox-editor__input"
                    value={title}
                    type="text"
                    onChange={titleChange}
                    maxLength="30"
                    redBorder={validationTitle}
                />
            </label>
            <label className="timebox-editor__title">
                Ile minut?: 
                <Input 
                    className="timebox-editor__input"
                    value={totalTimeInMinutes} 
                    type="text"
                    pattern="\d*"
                    onChange={totalTimeInMinutesChange}
                    maxLength="3"
                    redBorder={validationMinutes} 
                    />
            </label>
            <button 
                onClick={startOnClick}
                className="timebox-editor__button"
                disabled={isRunning}
                >Zacznij
            </button>
            <Storage />
        </section>
     );
}
 
export default TimeboxEditor;