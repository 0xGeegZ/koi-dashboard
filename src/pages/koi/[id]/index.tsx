import { useState } from "react";
import { useRouter } from "next/router";
import Button from '@material-ui/core/Button';
import { BiPencil} from '@react-icons/all-files/bi/BiPencil';
import { useGetKoiQuery } from "../../../client/graphql/getKoi.generated";
import { useGetCurrentUserQuery } from "../../../client/graphql/getCurrentUser.generated";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";
import { slugify, Title } from "../../../client/components/utils/styledComponents";
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
      id,
    },
  });

  if (fetching) return <div/>;

  if (error) return <p>{error.message}</p>;

  const koi = data?.koi;

  return (
    <div>
      <Breadcrumbs
        links={[{ to: `/${slugify(koi.variety)}`, text: koi.variety }]}
        currentBreadcrumbText={`${koi.breeder} ${koi.bloodline ? koi.bloodline : ''
          } ${koi.variety}`}
      />
      <div className='cp-c-row cp-c-align-spacebetween-center'>
        <Title>{`${koi.breeder} ${koi.bloodline ? koi.bloodline : ''} ${koi.variety}`}</Title>
        <Button startIcon={<BiPencil />} variant="outlined" href={`/koi/${koi.id}/edit`}>Edit</Button>
      </div>
      {dropdown == 'Evolution' ? (
        <Evolution koi={koi} />
      ) : (
        <History koi={koi} />
      )}
    </div>
  );
};

export default Koi;
