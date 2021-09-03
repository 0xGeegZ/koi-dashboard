import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { Title, Wrapper } from "../client/components/utils/styledComponents";

const Text = styled.div`
  margin-top: 1rem;
  text-align: center;
`;
const ImageContainer = styled.div`
  width: 60%;
  margin-top: 2rem;
`;

function CheckMailbox() {
  const router = useRouter();
  const email = router.query.e && decodeURIComponent(router.query.e.toString());
  const code = router.query.c && decodeURIComponent(router.query.c.toString());

  return (
    <Wrapper className="cp-c-column cp-c-align-center-center">
      <div className="cp-c-padding-4" />
      <Title>Check your mailbox!</Title>
      <Text>
        We've sent you a magic link to <b>{email ? email : "your email"}</b>.
      </Text>
      <Text>Click on the link to finish signing in.</Text>
      {code && <Text>Make sure the verification code matches {code}!</Text>}
      <ImageContainer>
        <Image src="/email.svg" height="439" width="668" layout="responsive" />
      </ImageContainer>
    </Wrapper>
  );
}

export default CheckMailbox;
