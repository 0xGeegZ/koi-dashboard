import styled from "styled-components";
import Image from "next/image";
import Button from "@mui/material/Button";
import { Title, Wrapper } from "../utils/styledComponents";

const Text = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;
const ImageContainer = styled.div`
  width: 60%;
  margin-top: 2rem;
`;

function EmptyKoi() {
  return (
    <Wrapper className="cp-c-column cp-c-align-center-center">
      <div className="cp-c-padding-4" />
      <Title>You don't have any koi yet!</Title>
      <Text>Add a new koi with the button bellow.</Text>
      <Button href="/koi/create" variant="contained" size="large">
        Add koi
      </Button>
      <ImageContainer>
        <Image
          src="/emptyKoi.svg"
          height="798"
          width="1064"
          layout="responsive"
        />
      </ImageContainer>
    </Wrapper>
  );
}

export default EmptyKoi;
