import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

export const ButtonCustom = styled(Button)`
    font-weight: bolder;
    width: ${props => `${props.width}px`};
    margin-top: ${props => `${props.marginTop}px`};
    margin-bottom: ${props => `${props.marginBottom}px`};
    margin-left: ${props => `${props.marginLeft}px`};
    margin-right: ${props => `${props.marginRight}px`};
`;