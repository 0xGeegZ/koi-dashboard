import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineApartment } from "@react-icons/all-files/ai/AiOutlineApartment";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import {
  KoiSVG,
  Card,
  Title,
  media,
} from "../../client/components/utils/styledComponents";

const StyledTitle = styled(Title)`
  padding-top: 1rem;

  ${media.lg} {
    padding-top: 2rem;
  }
`;
const StyledCard = styled(Card)`
  position: relative;
  overflow: hidden;
  padding-top: 65%;

  :hover {
    cursor: pointer;
    box-shadow: ${(props) => props.theme.boxShadowHover};
  }
`;
const Container = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: ${(props) => props.theme.secondaryColor};
`;
const Text = styled.div`
  padding-top: 1rem;
  font-size: 1.2rem;

  ${media.md} {
    padding-top: 2rem;
    font-size: 1.5rem;
  }
`;
const LinksContainer = styled.div`
  ${media.xxl} {
    max-width: 20% !important;
  }
`;
const IconContainer = styled.div`
  font-size: 2rem;

  ${media.md} {
    font-size: 2.5rem;
  }
`;
const StyledKoiIcon = styled.svg`
  width: 2rem;
  height: 2rem;
  stroke-width: 100px;
  stroke: ${(props) => props.theme.secondaryColor};

  ${media.md} {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const KoiIcon = (props) => <KoiSVG {...props} />;

export const links = [
  {
    title: "All koi",
    path: "/koi",
  },
  {
    title: "Varieties",
    path: "/varieties",
    icon: <AiOutlineApartment />,
  },
  {
    title: "Add koi",
    path: "/koi/create",
    icon: <AiOutlinePlus />,
  },
  {
    title: "Settings",
    path: "/app/settings",
    icon: <AiOutlineSetting />,
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [{ data, fetching, error }] = useGetCurrentUserQuery();

  if (fetching)
    return (
      <>
        <StyledTitle>Hello</StyledTitle>
        <div className="cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3">
          {links.map(({ title, path, icon }) => (
            <LinksContainer
              className="cp-i-50 cp-i-lg-33 cp-i-xl-25"
              key={title}
            >
              <Link href={path}>
                <StyledCard className="cp-c-column cp-c-align-center-center">
                  <Container>
                    {icon ? (
                      <IconContainer>{icon}</IconContainer>
                    ) : (
                      <StyledKoiIcon>
                        <KoiIcon />
                      </StyledKoiIcon>
                    )}
                    <Text>{title}</Text>
                  </Container>
                </StyledCard>
              </Link>
            </LinksContainer>
          ))}
        </div>
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

  return (
    <>
      <StyledTitle>Hello {data.currentUser.name}!</StyledTitle>
      <div className="cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3">
        {links.map(({ title, path, icon }) => (
          <LinksContainer className="cp-i-50 cp-i-lg-33 cp-i-xl-25" key={title}>
            <Link href={path}>
              <StyledCard className="cp-c-column cp-c-align-center-center">
                <Container>
                  {icon ? (
                    <IconContainer>{icon}</IconContainer>
                  ) : (
                    <StyledKoiIcon>
                      <KoiIcon />
                    </StyledKoiIcon>
                  )}
                  <Text>{title}</Text>
                </Container>
              </StyledCard>
            </Link>
          </LinksContainer>
        ))}
      </div>
    </>
  );
}
