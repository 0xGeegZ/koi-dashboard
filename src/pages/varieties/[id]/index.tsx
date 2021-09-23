import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { orderBy } from "lodash";
import { useGetCurrentUserQuery } from "../../../client/graphql/getCurrentUser.generated";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";
import { Title } from "../../../client/components/utils/styledComponents";
import VerticalCard from "../../../client/components/Verticalcard/Varticalcard";

const LowerCase = styled.span`
  text-transform: lowercase;
`;

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
      <Breadcrumbs
        links={[{ to: `/varieties`, text: "Varieties" }]}
        currentBreadcrumbText={`All your ${kois[0].variety}`}
      />
      <Title>
        {`You have ${kois.length} `}
        <LowerCase>
          {kois[0].variety}
          {kois.length > 1 ? "s" : ""}
        </LowerCase>
      </Title>
      <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
        <VerticalCard kois={kois} />
      </div>
    </>
  );
}
