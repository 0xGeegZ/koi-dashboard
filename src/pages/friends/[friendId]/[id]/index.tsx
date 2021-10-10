import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useGetKoiQuery } from "../../../../client/graphql/getKoi.generated";
import Breadcrumbs from "../../../../client/components/Breadcrumbs/Breadcrumbs";
import {
  Title,
  media,
} from "../../../../client/components/utils/styledComponents";
import Evolution from "../../../../client/components/KoiPage/Evolution";

const History = dynamic(
  import("../../../../client/components/KoiPage/History")
);
const BackButton = dynamic(
  import("../../../../client/components/utils/BackButton")
);

const StyledTitle = styled(Title)`
  padding-bottom: 1rem;

  ${media.lg} {
    padding-bottom: 1.5rem;
  }
`;

const KoiDetailPage = () => {
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

  return (
    <div>
      <Breadcrumbs
        links={[
          { to: `/friends`, text: "All friends" },
          {
            to: `/friends/${router.query.friendId}`,
            text: router.query.friendId,
          },
        ]}
        currentBreadcrumbText={`${koi.breeder} ${
          koi.bloodline ? koi.bloodline : ""
        } ${koi.variety}`}
      />
      <StyledTitle>
        {koi.breeder} {koi.bloodline ? koi.bloodline : ""} {koi.variety}
      </StyledTitle>
      <Evolution koi={koi} />
      {koi.updates.length > 1 && <History koi={koi} />}
      <BackButton src="back" />
    </div>
  );
};

export default KoiDetailPage;
