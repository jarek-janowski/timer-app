import './ProgressBar.scss'
import styled, { css } from 'styled-components'

const Div = styled.div`
        ${props =>
            props.blink &&
        css`
            animation: blink 2s linear infinite;
            @keyframes blink {  
                50% { opacity: 0.6; }
            }
        `};
`

const ProgressBar = ({percent, paused}) => {
    return ( 
        <Div blink={paused} className="progress-bar">
            <div className="progress-bar__inside" style={{width: `${percent}%`}}></div>
        </Div>
     );
}
 
export default ProgressBar;