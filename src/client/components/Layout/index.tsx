import Footer from "../Footer";
import Navbar from "../Navbar";
import { useGetCurrentUserQuery } from "../../graphql/getCurrentUser.generated";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [{ data }] = useGetCurrentUserQuery();
  return (
    <>
    {data?.currentUser &&  <Navbar />}
      {children}
    </>
  );
}
