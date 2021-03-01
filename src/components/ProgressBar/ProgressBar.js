import './ProgressBar.scss'
import styled, { css } from 'styled-components'

const Div = styled.div`
    ${props =>
        props.redBackground &&
        css`
            background: #EF233C;
        `};
    ${props =>
        props.redBorder &&
        css`
            border-color: #EF233C;
        `};
`

const ProgressBar = ({percent, paused}) => {
    return ( 
        <Div redBorder={paused} className="progress-bar">
            <Div redBackground={paused} className="progress-bar__inside" style={{width: `${percent}%`}}></Div>
        </Div>
     );
}
 
export default ProgressBar;