import React, { useState } from "react";
import dynamic from "next/dynamic";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineApartment } from "@react-icons/all-files/ai/AiOutlineApartment";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import { useGetCurrentUserKoisQuery } from "../../client/graphql/getCurrentUserKois.generated";
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
  const [{ data, fetching, error }] = useGetCurrentUserKoisQuery();

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

  const kois = data?.currentUser ? data.currentUser.kois : [];
  return (
    <>
      <Breadcrumbs links={[]} currentBreadcrumbText="All koi" />
      {kois.length > 0 ? (
        <>
          <div className="cp-md-hide">
            <Title>All koi</Title>
            <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
              <VerticalCard kois={kois} />
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
              <VerticalCard kois={kois} />
            </div>
          </div>
        </>
      ) : (
        <EmptyKoi />
      )}
    </>
  );
}
