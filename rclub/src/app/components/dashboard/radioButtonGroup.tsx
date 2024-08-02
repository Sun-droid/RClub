import styled from "styled-components";
import {Legend} from "./InputStyles";
import {IInputGroup, IOption, IProp} from "./InputInterface";
import RadioButton from "./radioButton";

const Fieldset = styled.fieldset`
  border: none;
`;

const Wrapper = styled.div`
  padding: 0.5rem;
  display: grid;
  gap: 1rem;
`;

const RadioButtonGroup = ({label, options, onChange, onClick}: IInputGroup) => {
    function renderOptions() {
        return options.map(({label, name, disabled, extra}: IOption, index) => {
            const shortenedOptionLabel = label.replace(/\s+/g, "");
            const optionId = `radio-option-${shortenedOptionLabel + '-' + extra.a.variable}`;
            return (
                <RadioButton
                    value={label}
                    label={label}
                    key={optionId}
                    id={optionId}
                    name={name}
                    disabled={disabled}
                    onChange={onChange}
                    onClick={onClick}
                />
            );
        });
    }

    return (
        <Fieldset>
            <Legend>{label}</Legend>
            <Wrapper>{renderOptions()}</Wrapper>
        </Fieldset>
    );
};
export default RadioButtonGroup;