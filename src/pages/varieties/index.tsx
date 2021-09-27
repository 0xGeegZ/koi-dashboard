import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import Breadcrumbs from "../../client/components/Breadcrumbs/Breadcrumbs";
import {
  Title,
  Card,
  slugify,
  media,
} from "../../client/components/utils/styledComponents";

const Text = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: ${(props) => props.theme.mainColor};
`;
const Container = styled.div`
  ${media.xxl} {
    max-width: 20% !important;
  }
`;

const StyledCard = styled(Card)`
  position: relative;
  overflow: hidden;
  padding-top: 65%;
  :hover {
    box-shadow: ${(props) => props.theme.boxShadowHover};
  }
`;

const getVarieties = (kois) => {
  let varieties = [];
  // @ts-ignore: test
  kois.map(({ variety }) => (varieties = [...varieties, variety]));
  return varieties.filter((v, i, a) => a.indexOf(v) === i);
};

export default function Varieties() {
  const router = useRouter();
  const [{ data, fetching, error }] = useGetCurrentUserQuery();

  if (fetching)
    return (
      <>
        <Breadcrumbs links={[]} currentBreadcrumbText="Varieties" />
        <Title>All varieties</Title>
      </>
    );

  if (error) return <p>{error.message}</p>;

  if (!data?.currentUser) {
    if (process.browser) router.push("/login");
    return (
      <p>
        Redirecting to <Link href="/login">/login</Link>
        ...
      </p>
    );
  }

  const kois = data.currentUser.kois;
  const varieties = getVarieties(kois);
  return (
    <>
      <Breadcrumbs links={[]} currentBreadcrumbText="Varieties" />
      <Title>All varieties</Title>
      <div className="cp-c-padding-2 cp-c-lg-padding-3  cp-c-row cp-c-wrap">
        {varieties.map((variety) => (
          <Container
            className="cp-i-100 cp-i-sm-50 cp-i-md-33 cp-i-xl-25"
            key={variety}
          >
            <Link href={`/varieties/${slugify(variety)}`}>
              <a>
                <StyledCard className="cp-c-column cp-c-align-center-center">
                  <Text>{variety}</Text>
                </StyledCard>
              </a>
            </Link>
          </Container>
        ))}
      </div>
    </>
  );
}
