import './Clock.scss'

const Clock = ({minutes, seconds}) => {
    return ( 
        <p className="clock">Pozostało: {minutes}:{seconds}min</p>
     );
}

 export default Clock;