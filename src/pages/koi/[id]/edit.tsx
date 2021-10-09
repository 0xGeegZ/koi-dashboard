// @ts-nocheck

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import styled from "styled-components";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import orderBy from "lodash/orderBy";
import isEqual from "lodash/isEqual";
import { AiOutlineSave } from "@react-icons/all-files/ai/AiOutlineSave";
import { IoMdReturnLeft } from "@react-icons/all-files/io/IoMdReturnLeft";
import { useUpdateKoiMutation } from "../../../client/graphql/updateKoi.generated";
import { useGetKoiQuery } from "../../../client/graphql/getKoi.generated";
import { UpdateKoiMutationVariables } from "../../../client/graphql/updateKoi.generated";
import {
  Title,
  Wrapper,
  FormButtonContainer,
} from "../../../client/components/utils/styledComponents";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";

const KoiHistoryPreview = dynamic(
  import("../../../client/components/KoiForm/KoiHistoryPreview")
);
const KoiForm = dynamic(import("../../../client/components/KoiForm/KoiForm"));

const Container = styled.span`
  position: fixed;
  bottom: 4.9rem;
  right: 1.1rem;
`;

const EditKoi = () => {
  const router = useRouter();
  const { id } = router.query;
  const [, updateKoi] = useUpdateKoiMutation();

  const [{ data, fetching, error }] = useGetKoiQuery({
    variables: {
      id: String(id),
    },
  });
  const [updates, setUpdates] = useState([]);
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
      if (data.koi.updates.length > 0) {
        setUpdates(() => [...data.koi.updates]);
      }
    }
  }, [data]);

  if (fetching || data == null || data.koi == null)
    return (
      <>
        <Breadcrumbs
          links={[{ to: `/koi`, text: "All koi" }]}
          currentBreadcrumbText=" "
        />
        <Wrapper>
          <Title>Edit koi</Title>
          <KoiForm koi={koi} setKoi={setKoi} />
          <FormButtonContainer>
            <Button
              fullWidth
              startIcon={<AiOutlineSave />}
              disabled={true}
              variant="contained"
              size="large"
            >
              Update koi
            </Button>
          </FormButtonContainer>
          <Title>Updates</Title>
        </Wrapper>
      </>
    );
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Breadcrumbs
        links={[
          { to: `/koi`, text: "All koi" },
          {
            to: `/koi/${koi.id}`,
            text: `${koi.breeder} ${koi.bloodline ? koi.bloodline : ""} ${
              koi.variety
            }`,
          },
        ]}
        currentBreadcrumbText="Edit"
      />
      <Wrapper>
        <Title>Edit koi</Title>
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
          updates={orderBy(updates, ["date"], ["desc"])}
          setUpdates={setUpdates}
        />
        <Container className="cp-md-hide">
          <Fab size="large" color="primary" aria-label="back">
            <Link href={`/koi/${koi.id}`}>
              <IoMdReturnLeft />
            </Link>
          </Fab>
        </Container>
      </Wrapper>
    </>
  );
};

export default EditKoi;
