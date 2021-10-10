import dynamic from "next/dynamic";
import { useGetCurrentUserQuery } from "../../../client/graphql/getCurrentUser.generated";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";
import {
  Title,
  Wrapper,
} from "../../../client/components/utils/styledComponents";
import FriendsForm from "../../../client/components/Friends/FriendsForm";

const BackButton = dynamic(
  import("../../../client/components/utils/BackButton")
);

const AddFriend = () => {
  const [{ data, fetching }] = useGetCurrentUserQuery();
  const currentUserId = data?.currentUser?.id;

  if (fetching)
    return (
      <>
        <Breadcrumbs
          links={[{ to: `/friends`, text: "All friends" }]}
          currentBreadcrumbText="Add"
        />
        <Wrapper>
          <Title>Add Friend</Title>
        </Wrapper>
      </>
    );

  return (
    <>
      <Breadcrumbs
        links={[{ to: `/friends`, text: "All friends" }]}
        currentBreadcrumbText="Add"
      />
      <Wrapper>
        <Title>Add Friend</Title>
        <FriendsForm currentUserId={currentUserId} />
        <BackButton src="/" />
      </Wrapper>
    </>
  );
};

export default AddFriend;
