import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useGetCurrentUserQuery } from "../../graphql/getCurrentUser.generated";
import { useWindowSize } from "../utils/styledComponents";

const DesktopNavigation = dynamic(import("../Navbar/DesktopNavigation"));
const MobileNavigation = dynamic(import("../Navbar/MobileNavigation"));

const Container = styled.div`
  padding-bottom: 4rem;
`;

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [{ data, fetching }] = useGetCurrentUserQuery();
  const router = useRouter();
  const isAuthenticated = !!data?.currentUser;
  const width = useWindowSize();
  const isMobile = width < 568;

  if (fetching && width > 0)
    return isMobile ? (
      <>
        <Container>{children}</Container>
        <MobileNavigation />
      </>
    ) : (
      <DesktopNavigation>{children}</DesktopNavigation>
    );

  if (!fetching && !isAuthenticated) {
    if (process.browser) router.push("/login");
    return (
      <p>
        Redirecting to <Link href="/login">/login</Link>
        ...
      </p>
    );
  }

  return (
    <>
      {isMobile ? (
        <>
          <Container>{children}</Container>
          <MobileNavigation />
        </>
      ) : (
        <DesktopNavigation>{children}</DesktopNavigation>
      )}
    </>
  );
}
