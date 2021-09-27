import styled from "styled-components";
import DesktopNavigation from "../Navbar/DesktopNavigation";
import MobileNavigation from "../Navbar/MobileNavigation";
import { useGetCurrentUserQuery } from "../../graphql/getCurrentUser.generated";

const Container = styled.div`
  padding-bottom: 4rem;
`;

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [{ data }] = useGetCurrentUserQuery();
  const isAuthenticated = !!data?.currentUser;

  return isAuthenticated ? (
    <>
      <div className="cp-hide cp-md-show-block">
        <DesktopNavigation>{children}</DesktopNavigation>
      </div>
      <div className="cp-md-hide">
        <Container>{children}</Container>
        <MobileNavigation />
      </div>
    </>
  ) : (
    <div>{children}</div>
  );
}
