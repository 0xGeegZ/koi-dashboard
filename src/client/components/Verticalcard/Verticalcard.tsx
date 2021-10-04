import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import { Card, media, ImageContainer } from "../utils/styledComponents";
import { getCurrentAgeText } from "../utils/ageCalculator";

type Props = {
  kois?: any;
};

const Container = styled.div`
  ${media.xxl} {
    max-width: 12.5% !important;
  }
`;
const Overlay = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  bottom: -0.25rem;
  left: -0.5rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  border-radius: 20px 20px 0 0;
  text-align: center;
`;
const OverlayText = styled.div`
  z-index: 1;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  font-size: 1.3rem;
  color: #fff;
  width: 100%;
  text-align: center;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
`;
const StyledCard = styled(Card)`
  padding: 0.5rem;
  padding-bottom: 1rem;
  :hover {
    box-shadow: ${(props) => props.theme.boxShadowHover};
  }
`;
const CardText = styled.div`
  height: 2.5rem;
  padding-top: 0.5rem;
  line-height: 1.1rem;
  text-align: center;
  color: ${(props) => props.theme.mainColor};
`;
const Text = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SkeletonText = styled.div`
  height: 2.4rem;
`;
const StyledSkeleton = styled(Skeleton)`
  transform: scale(1, 1);
  border-radius: 20px;
`;

const VerticalCard = ({ kois }: Props) => {
  return kois
    ? kois.map(({ id, sex, updates, bloodline, birthDate, breeder }) => (
        <Container
          className="cp-i-50 cp-i-sm-33 cp-i-md-25 cp-i-lg-20 cp-i-xl-15"
          key={id}
        >
          <Link href={`/koi/${id}`}>
            <StyledCard>
              <ImageContainer>
                <Image
                  src={
                    updates[updates.length - 1] &&
                    updates[updates.length - 1].image
                      ? updates[updates.length - 1].image
                      : "https://res.cloudinary.com/djapnmv8y/image/upload/v1633336739/koi/showablur_alhjww.png"
                  }
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </ImageContainer>
              <CardText>
                <Text>{`${getCurrentAgeText(birthDate)} ${breeder}`}</Text>
                <Text>{`${bloodline ? bloodline : ""} ${sex}`}</Text>
              </CardText>
            </StyledCard>
          </Link>
        </Container>
      ))
    : new Array(2).fill("a").map((a, index) => (
        <Container
          key={index}
          className="cp-i-50 cp-i-sm-33 cp-i-md-25 cp-i-lg-20 cp-i-xl-15"
        >
          <StyledSkeleton width="100%">
            <ImageContainer />
            <SkeletonText />
          </StyledSkeleton>
        </Container>
      ));
};

export default VerticalCard;
