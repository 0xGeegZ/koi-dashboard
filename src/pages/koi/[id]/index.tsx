import { useState } from "react";
import { useRouter } from "next/router";
import { useGetKoiQuery } from "../../../client/graphql/getKoi.generated";
import { useGetCurrentUserQuery } from "../../../client/graphql/getCurrentUser.generated";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";
import { slugify } from "../../../client/components/utils/styledComponents";
import Evolution from "../../../client/components/KoiPage/Evolution";

const filterOptions = [{ title: 'Evolution' }, { title: 'History' }];


const Koi = () => {
  // Get the ID of the post from the URL
  const [dropdown, setDropdown] = useState('Evolution');
  const router = useRouter();
  const { id } = router.query;

  // Fetch the post!
  const [{ data, fetching, error }] = useGetKoiQuery({
    variables: {
      id: id,
    },
  });

  if (fetching) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  const koi = data?.koi;

  return (
    <div>
      <Breadcrumbs
        links={[{ to: `/${slugify(koi.variety)}`, text: koi.variety }]}
        currentBreadcrumbText={`${koi.breeder} ${koi.bloodline ? koi.bloodline : ''
          } ${koi.variety}`}
      />
      {dropdown == 'Evolution' ? (
        <Evolution koi={koi} />
      ) : (
        <History koi={koi} />
      )}
    </div>
  );
};

export default Koi;
