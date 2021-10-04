import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { orderBy, filter } from "lodash";
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

export default function VarietyPage() {
  const router = useRouter();
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const variety: any = router.query.id ? router.query.id : " ";
  const string = variety[0].toUpperCase() + variety.substring(1);

  if (fetching && !data)
    return (
      <>
        <Breadcrumbs
          links={[
            { to: `/koi`, text: "All koi" },
            { to: `/varieties`, text: "Varieties" },
          ]}
          currentBreadcrumbText={`Your ${string}s`}
        />
        <Title>{`Your ${variety}s`}</Title>
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
  const kois = filter(data.currentUser.kois, { variety: string });
  return (
    <>
      <Breadcrumbs
        links={[
          { to: `/koi`, text: "All koi" },
          { to: `/varieties`, text: "Varieties" },
        ]}
        currentBreadcrumbText={`Your ${kois[0].variety}s`}
      />
      <Title>{`Your ${kois[0].variety}s`}</Title>
      <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
        <VerticalCard kois={kois} />
      </div>
    </>
  );
}
