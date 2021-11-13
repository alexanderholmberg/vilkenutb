import styled from "styled-components";

export const InputField = styled.input`
  border: none;
  background-color: white;//${props => props.theme.grey100};
  padding: 20px 12px;
  border-radius: 2px;
  cursor: pointer;
  font-family: ${props => props.theme.primaryFont};
  font-size: ${props => props.theme.fs.pl};
  width: 100%;
`;

export const InputFieldSmall = styled(InputField)`
  //padding: 13px;
`;