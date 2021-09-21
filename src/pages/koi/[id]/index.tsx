import { useRouter } from "next/router";
import Link from "next/link";
import { BiPencil } from "@react-icons/all-files/bi/BiPencil";
import { AiOutlineHistory } from "@react-icons/all-files/ai/AiOutlineHistory";
import { AiOutlineLineChart } from "@react-icons/all-files/ai/AiOutlineLineChart";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { useGetKoiQuery } from "../../../client/graphql/getKoi.generated";
import { useDeleteKoiMutation } from "../../../client/graphql/deleteKoi.generated";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";
import {
  slugify,
  Title,
} from "../../../client/components/utils/styledComponents";
import Evolution from "../../../client/components/KoiPage/Evolution";
import TitleContainer from "../../../client/components/utils/TitleContainer";
import ActionButton from "../../../client/components/utils/ActionButton";

const withLink = (to, children) => <Link href={to}>{children}</Link>;

const KoiDetailPage = () => {
  const [, deleteKoi] = useDeleteKoiMutation();
  const router = useRouter();
  const { id } = router.query;

  const [{ data, fetching, error }] = useGetKoiQuery({
    variables: {
      id: String(id),
    },
  });

  if (fetching || data == null || data.koi == null) return <div />;

  if (error) return <p>{error.message}</p>;

  const koi = data.koi;
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
      src: `/koi`,
      icon: <AiOutlineDelete />,
      buttonSrc: `/koi/${koi.id}`,
      handleClick: () => deleteKoi({ id: koi.id }),
    },
  ];
  const actions = [
    {
      title: "History",
      src: `/koi/${koi.id}?view=History`,
      icon: withLink(`/koi/${koi.id}?view=History`, <AiOutlineHistory />),
    },
    {
      title: "Evolution",
      src: `/koi/${koi.id}?view=Evolution`,
      icon: withLink(`/koi/${koi.id}?view=Evolution`, <AiOutlineLineChart />),
    },
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
          { to: `/koi`, text: "All your koi" },
          { to: `/${slugify(koi.variety)}`, text: koi.variety },
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
          activeIndex={router.query.view == "Evolution" ? 1 : 0}
        />
        <Evolution koi={koi} />
      </div>
      <div className="cp-md-hide">
        <Title>{`${koi.breeder} ${koi.bloodline ? koi.bloodline : ""} ${
          koi.variety
        }`}</Title>
        <Evolution koi={koi} />
        <ActionButton actions={actions} />
      </div>
    </div>
  );
};

export default KoiDetailPage;
