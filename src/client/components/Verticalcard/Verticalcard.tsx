import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@material-ui/core/Skeleton";
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

const VerticalCard = ({ kois }: Props) =>
  kois
    ? kois.map(({ id, sex, updates, bloodline, birthDate, breeder }) => (
        <Container
          className="cp-i-50 cp-i-sm-33 cp-i-md-25 cp-i-lg-20 cp-i-xl-15"
          key={id}
        >
          <Link href={`/koi/${id}`}>
            <StyledCard>
              <div>
                <ImageContainer>
                  <Image
                    src={
                      updates[updates.length - 1].image
                        ? updates[updates.length - 1].image
                        : "/default.png"
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
              </div>
            </StyledCard>
          </Link>
        </Container>
      ))
    : new Array(2).fill("a").map((index) => (
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

export default VerticalCard;