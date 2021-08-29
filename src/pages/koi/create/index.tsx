import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useGetCurrentUserQuery } from "../../../client/graphql/getCurrentUser.generated";
import {CreateKoiMutationVariables, useCreateKoiMutation } from '../../../client/graphql/createKoi.generated';

export default function CreateKoi() {
  const router = useRouter();
  const [, createKoi] = useCreateKoiMutation();
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const currentUser = data?.currentUser;
  const [koi, setKoi] = useState<CreateKoiMutationVariables>({
    variety: '',
  });

  useEffect(() => {
    if (currentUser) {
        setKoi(k => ({...k, userId: currentUser.id}));
    }
  }, [currentUser]);

  if (fetching) return <p>Loading...</p>;

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
    <>
      <h1>Add your koi</h1>

      <input
        value={koi.variety}
        placeholder="Natsumi"
        onChange={(evt) => setKoi(k =>({...k, variety:evt.target.value}))}
      />


      <button
        disabled={!koi.variety}
        onClick={() => {
          if (!koi.variety) return;
          
          toast.promise(
            createKoi(koi),
            {
              loading: `Creating koi...`,
              success: `Koi Created!`,
              error: (err) => err,
            }
          );
        }}
      >
        Save
      </button>
      <Link href="/app">Back to dashboard</Link>
    </>
  );
}
