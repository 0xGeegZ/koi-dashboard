import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useGetKoiQuery } from "../../../../client/graphql/getKoi.generated";
import Breadcrumbs from "../../../../client/components/Breadcrumbs/Breadcrumbs";
import {
  slugify,
  Title,
} from "../../../../client/components/utils/styledComponents";
import Evolution from "../../../../client/components/KoiPage/Evolution";

const Loading = dynamic(
  import("../../../../client/components/KoiPage/Loading")
);
const History = dynamic(
  import("../../../../client/components/KoiPage/History")
);

const KoiDetailPage = () => {
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
        <Title>
          {koi.breeder} {koi.bloodline ? koi.bloodline : ""} {koi.variety}
        </Title>
      </div>
      <div className="cp-md-hide">
        <Title>{`${koi.breeder} ${koi.bloodline ? koi.bloodline : ""} ${
          koi.variety
        }`}</Title>
      </div>
      <Evolution koi={koi} />
      {koi.updates.length > 1 && <History koi={koi} />}
      <div className="cp-md-hide"></div>
    </div>
  );
};

export default KoiDetailPage;
