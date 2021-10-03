import Link from "next/link";
import { useRouter } from "next/router";
import { useGetCurrentUserQuery } from "../client/graphql/getCurrentUser.generated";

export default function Dashboard() {
  const router = useRouter();
  const [{ data, fetching, error }] = useGetCurrentUserQuery();

  if (fetching) return <div />;

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
  router.push("/app");
}
