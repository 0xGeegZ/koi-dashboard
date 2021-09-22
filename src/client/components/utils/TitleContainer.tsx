import styled from "styled-components";
import ButtonGroup from "./Buttongroup";
import { Title, media } from "./styledComponents";

type TitleContainerProps = {
  title: string;
  options: any;
  activeIndex: number;
  paddingBottom?: string;
};

const Container = styled.div<{ paddingBottom: any }>`
  padding-bottom: ${(props) =>
    props.paddingBottom ? props.paddingBottom : "1"}rem;
  padding-right: 1rem;

  ${media.lg} {
    padding-bottom: ${(props) =>
      props.paddingBottom ? props.paddingBottom : "1.5"}rem;
    padding-right: 2rem;
  }
`;

const TitleContainer = ({
  title,
  options,
  activeIndex,
  paddingBottom,
}: TitleContainerProps) => (
  <Container
    paddingBottom={paddingBottom}
    className="cp-c-row cp-c-align-spacebetween-center"
  >
    <Title>{title}</Title>
    <ButtonGroup options={options} activeIndex={activeIndex} />
  </Container>
);

export default TitleContainer;
