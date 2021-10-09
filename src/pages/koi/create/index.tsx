import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import cuid from "cuid";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { useGetCurrentUserQuery } from "../../../client/graphql/getCurrentUser.generated";
import {
  CreateKoiMutationVariables,
  useCreateKoiMutation,
} from "../../../client/graphql/createKoi.generated";
import {
  Title,
  Wrapper,
  FormButtonContainer,
} from "../../../client/components/utils/styledComponents";
import Breadcrumbs from "../../../client/components/Breadcrumbs/Breadcrumbs";

const KoiForm = dynamic(import("../../../client/components/KoiForm/KoiForm"));

export default function CreateKoi() {
  const router = useRouter();
  const [, createKoi] = useCreateKoiMutation();
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const currentUser = data?.currentUser;
  const uniqueId = cuid();
  const [koi, setKoi] = useState<CreateKoiMutationVariables>({
    id: uniqueId,
    variety: "",
    breeder: "",
    bloodline: "",
    skinType: "",
    sex: "",
    youtube: "",
    birthDate: "01/01/2021",
  });

  useEffect(() => {
    if (currentUser) {
      setKoi((k) => ({ ...k, userId: currentUser.id }));
    }
  }, [currentUser]);

  if (fetching)
    return (
      <>
        <Breadcrumbs links={[]} currentBreadcrumbText="Add koi" />
        <Wrapper>
          <Title>Add koi</Title>
          <KoiForm koi={koi} setKoi={setKoi} />
          <FormButtonContainer>
            <Button
              fullWidth
              startIcon={<AiOutlinePlus />}
              disabled={!koi.variety}
              variant="contained"
              size="large"
              onClick={() => {
                if (!koi) return;
                toast
                  .promise(createKoi(koi), {
                    loading: `Creating koi...`,
                    success: `Koi Created!`,
                    error: (err) => err,
                  })
                  .then((result) => {
                    const slug = result.data?.createKoi?.id;
                    if (slug) router.push(`/koi/${slug}/edit`);
                  });
              }}
            >
              Add koi
            </Button>
          </FormButtonContainer>
        </Wrapper>
      </>
    );

  if (error) return <p>{error.message}</p>;

  if (!currentUser) {
    if (process.browser) router.push("/login");
    return (
      <p>
        Redirecting to <Link href="/login">/login</Link>
        ...
      </p>
    );
  }
  return (
    <>
      <Breadcrumbs links={[]} currentBreadcrumbText="Add koi" />
      <Wrapper>
        <Title>Add koi</Title>
        <KoiForm koi={koi} setKoi={setKoi} />
        <FormButtonContainer>
          <Button
            fullWidth
            startIcon={<AiOutlinePlus />}
            disabled={!koi.variety}
            variant="contained"
            size="large"
            onClick={() => {
              if (!koi) return;
              toast
                .promise(createKoi(koi), {
                  loading: `Creating koi...`,
                  success: `Koi Created!`,
                  error: (err) => err,
                })
                .then((result) => {
                  const slug = result.data?.createKoi?.id;
                  if (slug) router.push(`/koi/${slug}/edit`);
                });
            }}
          >
            Add koi
          </Button>
        </FormButtonContainer>
      </Wrapper>
    </>
  );
}
