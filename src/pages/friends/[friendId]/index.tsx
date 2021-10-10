import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import orderBy from "lodash/orderBy";
import { useGetFriendKoiQuery } from "../../../client/graphql/getFriendKois.generated";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";
import { Title } from "../../../client/components/utils/styledComponents";

const VerticalCard = dynamic(
  import("../../../client/components/Verticalcard/Verticalcard")
);

export const getSortedKois = (kois, order) => {
  if (order == "Recent") {
    return orderBy(kois, ({ createdAt }) => +createdAt);
  } else {
    return orderBy(kois, ["variety"], ["desc"]);
  }
};

export default function AllUsersKoi() {
  const router = useRouter();
  const [dropdown] = useState(undefined);
  const { friendId } = router.query;
  const [{ data, fetching, error }] = useGetFriendKoiQuery({
    variables: {
      id: String(friendId),
    },
  });
  if (fetching)
    return (
      <>
        <Breadcrumbs links={[]} currentBreadcrumbText="All koi of" />
        <Title>All koi of</Title>
        <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
          <VerticalCard />
        </div>
      </>
    );

  if (error) return <p>{error.message}</p>;

  const kois = data && data.user ? data.user.kois : [];
  const name = data && data.user && data.user.name ? data.user.name : friendId;
  return (
    <>
      <Breadcrumbs links={[]} currentBreadcrumbText={`All koi of ${name}`} />
      {kois.length > 0 ? (
        <>
          <div className="cp-md-hide">
            <Title>All koi of {name}</Title>
            <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
              <VerticalCard kois={getSortedKois(kois, dropdown)} />
            </div>
          </div>
          <div className="cp-hide cp-md-show-block">
            <Title>All koi of {name}</Title>
            <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
              <VerticalCard
                kois={getSortedKois(kois, dropdown)}
                friendId={friendId}
              />
            </div>
          </div>
        </>
      ) : (
        <div>Your friend has no koi yet</div>
      )}
    </>
  );
}
