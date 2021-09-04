import Navbar from "../Navbar";
import { useGetCurrentUserQuery } from "../../graphql/getCurrentUser.generated";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [{ data }] = useGetCurrentUserQuery();
  const isAuthenticated = !!data?.currentUser;
  return isAuthenticated ? <Navbar>{children}</Navbar> : <div>{children}</div>;
}
