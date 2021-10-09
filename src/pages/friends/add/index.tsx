import dynamic from "next/dynamic";
import { useGetCurrentUserQuery } from "../../../client/graphql/getCurrentUser.generated";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";
import {
  Title,
  Wrapper,
} from "../../../client/components/utils/styledComponents";

const FriendsForm = dynamic(
  import("../../../client/components/Friends/FriendsForm")
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
      </Wrapper>
    </>
  );
};

export default AddFriend;
