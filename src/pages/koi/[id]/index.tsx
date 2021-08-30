import { useRouter } from "next/router";
import Link from "next/link";
// Import the generated React hook for fetching a post
import { useGetKoiQuery } from "../../../client/graphql/getKoi.generated";

const Koi = () => {
  // Get the ID of the post from the URL
  const router = useRouter();
  const { id } = router.query;

  // Fetch the post!
  const [{ data, fetching, error }] = useGetKoiQuery({
    variables: {
      id: id,
    },
  });

  return (
    <div>
      <div>{data?.koi?.variety}</div>
      <Link href="/koi">Koi</Link>
    </div>
  );
};

export default Koi;
