import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineApartment } from "@react-icons/all-files/ai/AiOutlineApartment";
import { AiOutlineUsergroupAdd } from "@react-icons/all-files/ai/AiOutlineUsergroupAdd";
import { useGetCurrentUserDashboardQuery } from "../client/graphql/getCurrentUserDashboard.generated";
import {
  KoiSVG,
  Title,
  media,
  priceStyling,
} from "../client/components/utils/styledComponents";

const PolarAreaContainer = dynamic(
  import("../client/components/Home/PolarAreaContainer")
);

const StyledTitle = styled(Title)`
  padding-top: 1rem;

  ${media.lg} {
    padding-top: 2rem;
  }
`;

export const KoiIcon = (props) => <KoiSVG {...props} />;

export const links = [
  {
    title: "My koi",
    path: "/koi",
  },
  {
    title: "Add koi",
    path: "/koi/create",
    icon: <AiOutlinePlus />,
  },
  {
    title: "Varieties",
    path: "/varieties",
    icon: <AiOutlineApartment />,
  },

  {
    title: "Friends",
    path: "/friends",
    icon: <AiOutlineUsergroupAdd />,
  },
  {
    title: "Settings",
    path: "/app/settings",
    icon: <AiOutlineSetting />,
  },
];

const getTotalKoiValue = (kois) => {
  let totalValue = 0;
  kois.map(({ purchasePrice }) => {
    if (purchasePrice) {
      totalValue = totalValue + purchasePrice;
    }
  });
  return totalValue;
};

export default function Dashboard() {
  const router = useRouter();
  const [{ data, fetching, error }] = useGetCurrentUserDashboardQuery();

  if (fetching)
    return (
      <>
        <StyledTitle>Hello</StyledTitle>
        <div className="cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3"></div>
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
      <StyledTitle>Hello {data.currentUser.name}!</StyledTitle>
      <div className="cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3">
        <PolarAreaContainer kois={kois} />
        <div>
          Your total value of koi is{" "}
          <b>{priceStyling(getTotalKoiValue(kois), 0)}</b>
        </div>
      </div>
    </>
  );
}
