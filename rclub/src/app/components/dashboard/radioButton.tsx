import styled from "styled-components";
import {InputElementProps, IOption} from "./InputInterface";
import {StyledLabel, StyledRadio} from "./InputStyles";

const Wrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;
const RadioButton = ({label, id, disabled, ...rest}: InputElementProps, extra: IOption) => (

    <Wrapper>
        <StyledRadio id={id} type="radio" disabled={disabled} {...rest} />
        <StyledLabel htmlFor={id} disabled={disabled}>
            {label}
        </StyledLabel>
    </Wrapper>
);

export default RadioButton;