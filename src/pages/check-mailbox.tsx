import { useRouter } from "next/router";
import {  Title } from '../client/components/utils/styledComponents';
 
function CheckMailbox() {
  const router = useRouter();
  const email = router.query.e && decodeURIComponent(router.query.e.toString());
  const code = router.query.c && decodeURIComponent(router.query.c.toString());

  return (
    <div className='cp-c-column cp-c-align-center-center'>
      <div className='cp-c-padding-4'/>
      <Title>Check your mailbox!</Title>
      <p>We've sent you a magic link to {email ? email : "your email"}.</p>
      <p>Click on the link to finish signing in.</p>
      {code && <p>Make sure the verification code matches {code}!</p>}
    </div>
  );
}

export default CheckMailbox;
