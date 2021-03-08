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
// const Alarm = () => {
//     <div>
//         Koniec!
//     </div>
// }
    
const Clock = ({hoursLeft, minutesLeft, secondsLeft, paused}) => {
        const hours = hoursLeft > 9 ? hoursLeft : `0${hoursLeft}`;
        const minutesFormat = Math.floor(minutesLeft%60)
        const minutes = minutesFormat > 9 ? minutesFormat : `0${minutesFormat}`
        const seconds = secondsLeft > 9 ? secondsLeft: `0${secondsLeft}`
    return ( 
        <P
        $blink={paused}  
        $scale={minutesLeft===0 && secondsLeft < 30 && secondsLeft !== 0 && !paused} 
        className="clock">
            {!hoursLeft && !secondsLeft && !minutesLeft ? "Koniec" : `${hours}:${minutes}:${seconds}`}
        </P>
        );
}

 export default Clock;