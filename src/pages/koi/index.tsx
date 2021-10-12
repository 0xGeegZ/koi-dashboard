import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import sortBy from "lodash/sortBy";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineApartment } from "@react-icons/all-files/ai/AiOutlineApartment";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import { useGetCurrentUserKoisQuery } from "../../client/graphql/getCurrentUserKois.generated";
import Breadcrumbs from "../../client/components/Breadcrumbs/Breadcrumbs";
import {
  Title,
  withLink,
} from "../../client/components/utils/styledComponents";
import TitleContainer from "../../client/components/utils/TitleContainer";

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
  const [kois, setKois] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("kois")) {
        // @ts-ignore: test
        setKois(JSON.parse(localStorage.getItem("kois")));
      }
    }
  }, []);
  useEffect(() => {
    if (data?.currentUser && data.currentUser.kois) {
      // @ts-ignore: test
      setKois(data.currentUser.kois);
      window.localStorage.setItem(
        "kois",
        JSON.stringify(data.currentUser.kois)
      );
    }
  }, [data]);

  if (fetching && kois == [])
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

  const sortedKoi = sortBy(kois, ["modifiedAt", "asc"]);
  return (
    <>
      <Breadcrumbs links={[]} currentBreadcrumbText="All koi" />
      {kois.length > 0 ? (
        <>
          <div className="cp-md-hide">
            <Title>All koi</Title>
            <div className="cp-c-row cp-c-align-start-start cp-c-padding-2 cp-c-lg-padding-3  cp-c-wrap">
              <VerticalCard kois={sortedKoi} />
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
              <VerticalCard kois={sortedKoi} />
            </div>
          </div>
        </>
      ) : (
        <EmptyKoi />
      )}
    </>
  );
}
