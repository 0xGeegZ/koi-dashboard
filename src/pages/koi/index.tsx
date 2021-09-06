import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { orderBy } from "lodash";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import Breadcrumbs from "../../client/components/Breadcrumbs/Breadcrumbs";
import { Title } from "../../client/components/utils/styledComponents";
import VerticalCard from "../../client/components/Verticalcard/Varticalcard";
import EmptyKoi from "../../client/components/Koi/EmptyKoi";
import ActionButton from "../../client/components/utils/ActionButton";

export const getSortedKois = (kois, order) => {
  if (order == "Most recent") {
    return orderBy(kois, ({ createdAt }) => +createdAt);
  } else {
    return orderBy(kois, ["variety"], ["desc"]);
  }
};

export default function AllUsersKoi() {
  const router = useRouter();
  const [dropdown, setDropdown] = useState(undefined);
  const [{ data, fetching, error }] = useGetCurrentUserQuery();

  if (fetching) return <div />;

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
  return (
    <>
      <Breadcrumbs links={[]} currentBreadcrumbText="All your koi" />
      {kois.length > 0 ? (
        <>
          <Title>All your koi</Title>
          <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
            <VerticalCard kois={getSortedKois(kois, dropdown)} />
          </div>
          <ActionButton />
        </>
      ) : (
        <EmptyKoi />
      )}
    </>
  );
}
