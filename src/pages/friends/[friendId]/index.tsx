import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useGetFriendKoiQuery } from "../../../client/graphql/getFriendKois.generated";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";
import { Title } from "../../../client/components/utils/styledComponents";

const VerticalCard = dynamic(
  import("../../../client/components/Verticalcard/Verticalcard")
);
const BackButton = dynamic(
  import("../../../client/components/utils/BackButton")
);

export default function AllUsersKoi() {
  const router = useRouter();
  const { friendId } = router.query;
  const [{ data, fetching, error }] = useGetFriendKoiQuery({
    variables: {
      id: String(friendId),
    },
  });
  if (fetching)
    return (
      <>
        <Breadcrumbs
          links={[{ to: `/friends`, text: "All friends" }]}
          currentBreadcrumbText="All koi of "
        />
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
      <Breadcrumbs
        links={[{ to: `/friends`, text: "All friends" }]}
        currentBreadcrumbText={`All koi of ${name}`}
      />
      {kois.length > 0 ? (
        <>
          <Title>All koi of {name}</Title>
          <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
            <VerticalCard kois={kois} friendId={friendId} />
          </div>
          <BackButton src="/friends" />
        </>
      ) : (
        <Title>Your friend has no koi yet.</Title>
      )}
    </>
  );
}
