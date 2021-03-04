import './Clock.scss'
import styled, { css } from 'styled-components'

const P = styled.p`
        
    ${props =>
        props.$blink &&
    css`
        animation: blink 2s linear infinite;
        @keyframes blink {  
            50% { opacity: 0.6; }
        }
    `};
    ${props =>
        props.$scale &&
    css`
        animation: scale 2s linear infinite;
        @keyframes scale {  
            50% { font-size: 36px; }
        }
    `};
    `     
const Clock = ({minutes, seconds, paused}) => {
        const hours = Math.floor(minutes/60);
        const hoursLeft = hours > 9 ? hours : `0${hours}`;
        const minutesFormat = Math.floor(minutes%60)
        const minutesLeft = minutesFormat > 9 ? minutesFormat : `0${minutesFormat}`
        const secondsLeft = seconds > 9 ? seconds: `0${seconds}`
    return ( 
        <P
        $blink={paused}  
        $scale={minutes===0 && seconds < 30 && seconds !== 0 && !paused} 
        className="clock">
            {!hoursLeft && !seconds && !minutes ? "Koniec" : `${hoursLeft}:${minutesLeft}:${secondsLeft}`}
        </P>
        );
}

 export default Clock;