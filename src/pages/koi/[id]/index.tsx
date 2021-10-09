import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { BiPencil } from "@react-icons/all-files/bi/BiPencil";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { useGetKoiQuery } from "../../../client/graphql/getKoi.generated";
import { useDeleteKoiMutation } from "../../../client/graphql/deleteKoi.generated";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";
import {
  slugify,
  Title,
  withLink,
} from "../../../client/components/utils/styledComponents";
import Evolution from "../../../client/components/KoiPage/Evolution";

const ActionButton = dynamic(
  import("../../../client/components/utils/ActionButton")
);
const Loading = dynamic(import("../../../client/components/KoiPage/Loading"));
const History = dynamic(import("../../../client/components/KoiPage/History"));
const TitleContainer = dynamic(
  import("../../../client/components/utils/TitleContainer")
);

const KoiDetailPage = () => {
  const [, deleteKoi] = useDeleteKoiMutation();
  const router = useRouter();
  const { id } = router.query;

  const [{ data, fetching, error }] = useGetKoiQuery({
    variables: {
      id: String(id),
    },
  });

  if (fetching || data == null || data.koi == null) return <Loading />;

  if (error) return <p>{error.message}</p>;

  const koi = data.koi;
  const options = [
    {
      title: "Edit",
      src: `/koi/${koi.id}/edit`,
      icon: <BiPencil />,
      buttonSrc: `/koi/${koi.id}/edit`,
    },
    {
      title: "Delete",
      src: `/koi`,
      icon: <AiOutlineDelete />,
      buttonSrc: `/koi/${koi.id}`,
      handleClick: () => deleteKoi({ id: koi.id }),
    },
  ];
  const actions = [
    {
      title: "Edit",
      src: `/koi/${koi.id}/edit`,
      icon: withLink(`/koi/${koi.id}/edit`, <BiPencil />),
    },
    {
      title: "Delete",
      src: `/koi`,
      icon: <AiOutlineDelete />,
      handleClick: () => deleteKoi({ id: koi.id }),
    },
  ];

  return (
    <div>
      <Breadcrumbs
        links={[
          { to: `/koi`, text: "All koi" },
          { to: `/varieties`, text: "Varieties" },
          { to: `/varieties/${slugify(koi.variety)}`, text: koi.variety },
        ]}
        currentBreadcrumbText={`${koi.breeder} ${
          koi.bloodline ? koi.bloodline : ""
        } ${koi.variety}`}
      />
      <div className="cp-hide cp-md-show-block">
        <TitleContainer
          title={`${koi.breeder} ${koi.bloodline ? koi.bloodline : ""} ${
            koi.variety
          }`}
          options={options}
        />
      </div>
      <div className="cp-md-hide">
        <Title>{`${koi.breeder} ${koi.bloodline ? koi.bloodline : ""} ${
          koi.variety
        }`}</Title>
      </div>
      <Evolution koi={koi} />
      {koi.updates.length > 1 && <History koi={koi} />}
      <div className="cp-md-hide">
        <ActionButton actions={actions} />
      </div>
    </div>
  );
};

export default KoiDetailPage;
