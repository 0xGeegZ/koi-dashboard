import styled from "styled-components";
import DesktopNavigation from "../Navbar/DesktopNavigation";
import MobileNavigation from "../Navbar/MobileNavigation";
import { useGetCurrentUserQuery } from "../../graphql/getCurrentUser.generated";
import { useWindowSize } from "../utils/styledComponents";

const Container = styled.div`
  padding-bottom: 4rem;
`;

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [{ data }] = useGetCurrentUserQuery();
  const isAuthenticated = !!data?.currentUser;
  const width = useWindowSize();
  const isMobile = width < 568;

  return isAuthenticated ? (
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
  ) : (
    <div />
  );
}
