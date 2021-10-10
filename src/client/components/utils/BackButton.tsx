import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Fab from "@mui/material/Fab";
import styled from "styled-components";
import { IoMdReturnLeft } from "@react-icons/all-files/io/IoMdReturnLeft";

const Container = styled.span`
  position: fixed;
  bottom: 4.9rem;
  right: 1.1rem;
`;

const BackButton = ({ src }) => {
  const router = useRouter();

  return (
    <div className="cp-md-hide">
      {src == "back" ? (
        <Container onClick={() => router.back()}>
          <Fab size="large" color="primary" aria-label="back">
            <IoMdReturnLeft />
          </Fab>
        </Container>
      ) : (
        <Link href={src}>
          <Container>
            <Fab size="large" color="primary" aria-label="back">
              <IoMdReturnLeft />
            </Fab>
          </Container>
        </Link>
      )}
    </div>
  );
};

export default BackButton;
