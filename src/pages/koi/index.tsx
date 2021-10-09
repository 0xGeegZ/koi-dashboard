import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import orderBy from "lodash/orderBy";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineApartment } from "@react-icons/all-files/ai/AiOutlineApartment";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import Breadcrumbs from "../../client/components/Breadcrumbs/Breadcrumbs";
import {
  Title,
  withLink,
} from "../../client/components/utils/styledComponents";

const TitleContainer = dynamic(
  import("../../client/components/utils/TitleContainer")
);
const ActionButton = dynamic(
  import("../../client/components/utils/ActionButton")
);
const VerticalCard = dynamic(
  import("../../client/components/Verticalcard/Verticalcard")
);
const EmptyKoi = dynamic(import("../../client/components/Koi/EmptyKoi"));

export const getSortedKois = (kois, order) => {
  if (order == "Recent") {
    return orderBy(kois, ({ createdAt }) => +createdAt);
  } else {
    return orderBy(kois, ["variety"], ["desc"]);
  }
};

const actions = [
  {
    icon: withLink("/koi/create", <AiOutlinePlus />),
    title: "Add koi",
    src: "/koi/create",
  },
  {
    icon: withLink("/koi?order=Recent", <AiOutlineClockCircle />),
    title: "Sort recent",
    src: `/koi?order=Recent`,
  },
  {
    icon: withLink("/koi?order=Variety", <AiOutlineApartment />),
    title: "Sort by variety",
    src: `/koi?order=Variety`,
  },
];

const options = [
  {
    title: "Add koi",
    src: `/koi/create`,
    icon: <AiOutlinePlus />,
    buttonSrc: `/koi/create`,
    active: true,
  },
  {
    title: "Sort recent",
    src: `/koi?order=Recent`,
    icon: <AiOutlineClockCircle />,
  },
  {
    title: "Sort by variety",
    src: `/koi?order=Variety`,
    icon: <AiOutlineApartment />,
  },
];

export default function AllUsersKoi() {
  const router = useRouter();
  const [dropdown] = useState(undefined);
  const [{ data, fetching, error }] = useGetCurrentUserQuery();

  if (fetching)
    return (
      <>
        <Breadcrumbs links={[]} currentBreadcrumbText="All koi" />
        <Title>All koi</Title>
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
  const kois = data.currentUser.kois;
  return (
    <>
      <Breadcrumbs links={[]} currentBreadcrumbText="All koi" />
      {kois.length > 0 ? (
        <>
          <div className="cp-md-hide">
            <Title>All koi</Title>
            <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
              <VerticalCard kois={getSortedKois(kois, dropdown)} />
            </div>
            <ActionButton actions={actions} />
          </div>
          <div className="cp-hide cp-md-show-block">
            <TitleContainer
              title="All koi"
              options={options}
              paddingBottom="0"
            />
            <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
              <VerticalCard kois={getSortedKois(kois, dropdown)} />
            </div>
          </div>
        </>
      ) : (
        <EmptyKoi />
      )}
    </>
  );
}
