import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineApartment } from "@react-icons/all-files/ai/AiOutlineApartment";
import { AiOutlineUsergroupAdd } from "@react-icons/all-files/ai/AiOutlineUsergroupAdd";
import { useGetCurrentUserQuery } from "../client/graphql/getCurrentUser.generated";
import {
  KoiSVG,
  Card,
  Title,
  media,
} from "../client/components/utils/styledComponents";
import PolarAreaContainer from "../client/components/Home/PolarAreaContainer";

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

export default function Dashboard() {
  const router = useRouter();
  const [{ data, fetching, error }] = useGetCurrentUserQuery();

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
      </div>
    </>
  );
}
