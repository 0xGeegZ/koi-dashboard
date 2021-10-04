import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import UserSettings from "../../client/components/UserSettings/UserSettings";

export default function Dashboard() {
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const currentUser = data?.currentUser;

  // Once we load the current user, default the name input to their name
  useEffect(() => {
    if (currentUser?.name) setName(currentUser.name);
    if (currentUser?.email) setEmail(currentUser.email);
  }, [currentUser]);

  if (fetching)
    return (
      <UserSettings
        id=""
        name=""
        email=""
        setEmail={setEmail}
        setName={setName}
      />
    );

  if (error) return <p>{error.message}</p>;

  if (!currentUser) {
    if (process.browser) router.push("/login");
    return (
      <p>
        Redirecting to <Link href="/login">/login</Link>
        ...
      </p>
    );
  }

  return (
    <UserSettings
      id={currentUser.id}
      name={name}
      email={email}
      setEmail={setEmail}
      setName={setName}
      currentUser={currentUser}
    />
  );
}
