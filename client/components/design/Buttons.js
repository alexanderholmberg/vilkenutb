import styled from "styled-components";
import { primaryFont } from "../../utils";

export const Button = styled.button`
  padding: 8px 12px;
  border-radius: 2px;
  min-width: 100px;
  cursor: pointer;
  font-family: ${primaryFont};
  font-size: ${props => props.theme.fs.pl};
  transition: background-color 0.2s linear, color 0.2s linear;

  &:hover {
    background-color: ${props => props.theme.primary400};
    color: ${props => props.theme.primaryTextInverted};
  }

  &:focus, &:active {
    outline: 3px solid ${props => props.theme.primary200};
    outline-offset: 2px;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${props => props.theme.primary100};
  color: ${props => props.theme.primaryTextInverted};
  border: 2px solid transparent;

  &:disabled {
    background-color: ${props => props.theme.neutral400};
    color: ${props => props.theme.neutral300};
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled(Button)`
  border: 2px solid ${props => props.theme.primary200};
  background: none;
  color: ${props => props.theme.primary200};

  &:disabled {
    background: none;
    border: 2px solid ${props => props.theme.neutral400};
    color: ${props => props.theme.neutral400};
    cursor: not-allowed;
  }
`;

export const TertiaryButton = styled(Button)`
  background: none;
  border: 2px solid transparent;
  color: ${props => props.theme.primary100};

  &:disabled {
    color: ${props => props.theme.neutral400};
    cursor: not-allowed;
  }
`;

export const LargePrimaryButton = styled(PrimaryButton)`
  padding: 9px 12px;
  font-size: 1.65rem;
  width: 100%;
`;