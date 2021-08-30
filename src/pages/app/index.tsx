import Link from "next/link";
import { useRouter } from "next/router";
import styled from 'styled-components';
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import { Card, Title } from "../../client/components/utils/styledComponents";

const Text = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: ${(props) => props.theme.mainColor};
`;

const StyledCard = styled(Card)`
  position: relative;
  overflow: hidden;
  padding-top: 65%;
  :hover {
    box-shadow: ${(props) => props.theme.boxShadowHover};
  }
`;

const links = [
  {
    title: 'My koi',
    path: '/koi'
  },
  {
    title: 'Add new koi',
    path: '/koi/create'
  },
  {
    title: 'User settings',
    path: '/app/settings'
  },
]

export default function Dashboard() {
  const router = useRouter();
  const [{ data, fetching, error }] = useGetCurrentUserQuery();

  if (fetching) return <div/>;

  if (error) return <p>{error.message}</p>;

  if (!data?.currentUser) {
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
      <Title>Hello {data.currentUser.name}!</Title>
      <div className='cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3'>
      {links.map(({title,path}) => (
          <div
            className="cp-i-50 cp-i-md-33 cp-i-lg-25 cp-i-xl-20"
            key={title}
          >
            <Link href={path}>
              <a>
                <StyledCard className="cp-c-column cp-c-align-center-center">
                  <Text>{title}</Text>
                </StyledCard>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
