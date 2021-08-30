import Link from "next/link";
import styled from 'styled-components';
import { useGetCurrentUserQuery } from "../../graphql/getCurrentUser.generated";

const Container = styled.div`
background: #fff;`;

function Navbar() {
  const [{ data }] = useGetCurrentUserQuery();
  const isAuthenticated = !!data?.currentUser;

  return (
    <Container className='cp-c-padding-2' style={{ display: `flex`, justifyContent: `space-between` }}>
      <Link href={isAuthenticated ? `/app` : `/`}>SaaS</Link>
      {isAuthenticated && <Link href="/api/auth/logout">Logout</Link>}
    </Container>
  );
}

export default Navbar;
