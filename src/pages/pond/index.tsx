import Link from "next/link";
import Breadcrumbs from "../../client/components/Breadcrumbs/Breadcrumbs";
import { Title } from "../../client/components/utils/styledComponents";

const Pond = () => {
  return (
    <section>
      <Breadcrumbs links={[]} currentBreadcrumbText="Pond" />
      <Title>Pond information</Title>
      <div className="cp-c-padding-2 cp-c-lg-padding-3">
        <Link href="/pond/hannah-pocket">Hannah pocket checker</Link>
      </div>
    </section>
  );
};

export default Pond;
