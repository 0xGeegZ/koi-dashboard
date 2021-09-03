import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ButtonGroup from "./Buttongroup";
import { Title, media } from "./styledComponents";

const Container = styled.div`
  padding-bottom: 1rem;
  padding-right: 1rem;

  ${media.lg} {
    padding-bottom: 1.5rem;
    padding-right: 2rem;
  }
`;
const StyledButton = styled(Button)`
  background: red;
`;

const TitleContainer = ({ title, options, activeIndex }) => (
  <Container className="cp-c-row cp-c-align-spacebetween-center">
    <Title>{title}</Title>
    <ButtonGroup options={options} activeIndex={activeIndex} />
  </Container>
);

export default TitleContainer;
