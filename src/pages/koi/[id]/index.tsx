import { useState } from "react";
import { useRouter } from "next/router";
import { BiPencil } from "@react-icons/all-files/bi/BiPencil";
import { AiOutlineHistory } from "@react-icons/all-files/ai/AiOutlineHistory";
import { AiOutlineLineChart } from "@react-icons/all-files/ai/AiOutlineLineChart";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { useGetKoiQuery } from "../../../client/graphql/getKoi.generated";
import { useGetCurrentUserQuery } from "../../../client/graphql/getCurrentUser.generated";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";
import { slugify } from "../../../client/components/utils/styledComponents";
import Evolution from "../../../client/components/KoiPage/Evolution";
import TitleContainer from "../../../client/components/utils/TitleContainer";

const filterOptions = [{ title: "Evolution" }, { title: "History" }];

const KoiDetailPage = () => {
  const [dropdown, setDropdown] = useState("Evolution");
  const router = useRouter();
  const { id } = router.query;

  const [{ data, fetching, error }] = useGetKoiQuery({
    variables: {
      id,
    },
  });

  if (fetching) return <div />;

  if (error) return <p>{error.message}</p>;

  const koi = data?.koi;

  const options = [
    {
      title: "History",
      src: `/koi/${koi.id}?view=History`,
      icon: <AiOutlineHistory />,
      buttonSrc: `/koi/${koi.id}?view=Evolution`,
      setIndex: 1,
    },
    {
      title: "Evolution",
      src: `/koi/${koi.id}?view=Evolution`,
      icon: <AiOutlineLineChart />,
      buttonSrc: `/koi/${koi.id}?view=History`,
      setIndex: 0,
    },
    {
      title: "Edit",
      src: `/koi/${koi.id}/edit`,
      icon: <BiPencil />,
      buttonSrc: `/koi/${koi.id}/edit`,
    },
    {
      title: "Delete",
      src: `/koi/${koi.id}`,
      icon: <AiOutlineDelete />,
      buttonSrc: `/koi/${koi.id}`,
    },
  ];

  return (
    <div>
      <Breadcrumbs
        links={[{ to: `/${slugify(koi.variety)}`, text: koi.variety }]}
        currentBreadcrumbText={`${koi.breeder} ${
          koi.bloodline ? koi.bloodline : ""
        } ${koi.variety}`}
      />
      <TitleContainer
        title={`${koi.breeder} ${koi.bloodline ? koi.bloodline : ""} ${
          koi.variety
        }`}
        link={`/koi/${koi.id}/edit`}
        linkText="Edit"
        linkIcon={<BiPencil />}
        options={options}
      />
      <Evolution koi={koi} />
    </div>
  );
};

export default KoiDetailPage;
