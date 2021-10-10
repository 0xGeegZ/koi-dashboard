import Link from "next/link";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { useGetCurrentUserFriendsQuery } from "../../client/graphql/getCurrentUserFriends.generated";
import Breadcrumbs from "../../client/components/Breadcrumbs/Breadcrumbs";
import {
  Title,
  withLink,
  Card,
  media,
} from "../../client/components/utils/styledComponents";
import TitleContainer from "../../client/components/utils/TitleContainer";

const ActionButton = dynamic(
  import("../../client/components/utils/ActionButton")
);

const Text = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  color: ${(props) => props.theme.mainColor};

  ${media.md} {
    font-size: 1.5rem;
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
const Container = styled.div`
  ${media.xxl} {
    max-width: 20% !important;
  }

  :hover {
    cursor: pointer;
  }
`;

const actions = [
  {
    icon: withLink("/friends/add", <AiOutlinePlus />),
    title: "Add Friend",
    src: "/friends/add",
  },
];

const options = [
  {
    title: "Add friend",
    src: `/friends/add`,
    icon: <AiOutlinePlus />,
    buttonSrc: `/friends/add`,
    active: true,
  },
];

const Friends = () => {
  const router = useRouter();
  const [{ data, fetching, error }] = useGetCurrentUserFriendsQuery();

  if (fetching)
    return (
      <>
        <Breadcrumbs links={[]} currentBreadcrumbText="All friends" />
        <Title>All friends</Title>
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

  const friends = data.currentUser.friends;
  return (
    <>
      <Breadcrumbs links={[]} currentBreadcrumbText="All friends" />
      <div className="cp-md-hide">
        <Title>All friends</Title>
        <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
          {friends.map(({ name, id }) => (
            <Container className="cp-i-50  cp-i-md-33 cp-i-xl-25" key={id}>
              <Link href={`/friends/${id}`}>
                <StyledCard className="cp-c-column cp-c-align-center-center">
                  <Text>{name ? name : id}</Text>
                </StyledCard>
              </Link>
            </Container>
          ))}
        </div>
        <ActionButton actions={actions} />
      </div>
      <div className="cp-hide cp-md-show-block">
        <TitleContainer
          title="All friends"
          options={options}
          paddingBottom="0"
        />
        <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
          {friends.map(({ name, id }) => (
            <Container className="cp-i-50  cp-i-md-33 cp-i-xl-25" key={id}>
              <Link href={`/friends/${id}`}>
                <StyledCard className="cp-c-column cp-c-align-center-center">
                  <Text>{name ? name : id}</Text>
                </StyledCard>
              </Link>
            </Container>
          ))}
        </div>
      </div>
    </>
  );
};

export default Friends;
