import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Button from "@material-ui/core/Button";
import { isEqual } from "lodash";
import { AiOutlineSave } from "@react-icons/all-files/ai/AiOutlineSave";
import { useUpdateKoiMutation } from "../../../client/graphql/updateKoi.generated";
import { useGetKoiQuery } from "../../../client/graphql/getKoi.generated";
import { UpdateKoiMutationVariables } from "../../../client/graphql/updateKoi.generated";
import { GetKoiQueryVariables } from "../../../client/graphql/getKoi.generated";
import {
  Title,
  Wrapper,
  FormButtonContainer,
} from "../../../client/components/utils/styledComponents";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";
import KoiForm from "../../../client/components/KoiForm/KoiForm";
import KoiHistoryPreview from "../../../client/components/KoiForm/KoiHistoryPreview";

export default function CreateKoi() {
  const router = useRouter();
  const { id } = router.query;
  const [, updateKoi] = useUpdateKoiMutation();
  const [drawer, setDrawer] = useState(false);

  const [{ data, fetching, error }] = useGetKoiQuery({
    variables: {
      id: String(id),
    },
  });
  const [koi, setKoi] = useState<UpdateKoiMutationVariables>({
    id: "",
    variety: "",
    breeder: "",
    bloodline: "",
    skinType: "",
    sex: "",
    youtube: "",
  });

  useEffect(() => {
    if (data) {
      setKoi((k) => ({ ...k, ...data.koi }));
    }
  }, [data]);

  if (fetching || data == null || data.koi == null) return <div />;
  if (error) return <p>{error.message}</p>;
  console.log(koi);
  return (
    <>
      <Breadcrumbs
        links={[
          {
            to: `/koi/${koi.id}`,
            text: `${koi.breeder} ${koi.bloodline ? koi.bloodline : ""} ${
              koi.variety
            }`,
          },
        ]}
        currentBreadcrumbText="Edit koi"
      />
      <Wrapper>
        <Title>Edit your koi</Title>
        <KoiForm koi={koi} setKoi={setKoi} />
        <FormButtonContainer>
          <Button
            fullWidth
            startIcon={<AiOutlineSave />}
            disabled={isEqual(data.koi, koi) || !koi.variety}
            variant="contained"
            size="large"
            onClick={() => {
              if (!koi) return;
              toast.promise(updateKoi(koi), {
                loading: `Updating koi...`,
                success: `Koi updated!`,
                error: (err) => err,
              });
            }}
          >
            Update koi
          </Button>
        </FormButtonContainer>
        <KoiHistoryPreview
          koiId={data.koi.id}
          // @ts-ignore: don't know fix
          updates={koi.updates}
        />
      </Wrapper>
    </>
  );
}
