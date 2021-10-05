import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { orderBy } from "lodash";
import { filter } from "lodash";
import { useGetCurrentUserQuery } from "../../../client/graphql/getCurrentUser.generated";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";
import { Title } from "../../../client/components/utils/styledComponents";
import VerticalCard from "../../../client/components/Verticalcard/Verticalcard";

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
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
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

  if (!data?.currentUser) {
    if (process.browser) router.push("/login");
    return (
      <p>
        Redirecting to <Link href="/login">/login</Link>
        ...
      </p>
    );
  }
  const friendId = router.query.friendId;
  const friendKois = filter(data.currentUser.friends, { id: friendId });
  // @ts-ignore: test
  const kois = friendKois[0].kois;
  // @ts-ignore: test
  const name = friendKois[0].name ? friendKois[0].name : friendId;
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
