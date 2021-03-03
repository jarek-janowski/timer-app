import './TimeboxEditor.scss'
import styled, { css } from 'styled-components'
import TaskHistory from '../TaskHistory/TaskHistory'

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
    validationMinutes,
    jsonParseTitle,
    jsonParseTime,
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
                    maxLength="25"
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
            <TaskHistory 
                titleChange={titleChange}
                jsonParseTitle={jsonParseTitle}
                jsonParseTime={jsonParseTime}
            />
        </section>
     );
}
 
export default TimeboxEditor;