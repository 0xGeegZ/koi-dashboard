import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";

export const theme = {
  textColor: "#565656",
  textColorLight: "#949494",
  textColorDark: "#404040",
  mainColor: "#0C4184",
  secondaryColor: "#0b366f",
  materialColor: "#1976d2",
  redColor: "#ea5757",
  lightColor: "#e7f5fe",
  thinBorder: "1px solid #dcdcdc",
  borderRadius: "10px",
  boxShadowHover: "0px 11px 20px rgba(20, 61, 123, 0.15)",
};

export const media = {
  sm: `@media screen and (min-width: ${568 / 16}em)`,
  md: `@media screen and (min-width: ${768 / 16}em)`,
  lg: `@media screen and (min-width: ${1024 / 16}em)`,
  wrapper: `@media screen and (min-width: ${1120 / 16}em)`,
  xl: `@media screen and (min-width: ${1280 / 16}em)`,
  xxl: `@media screen and (min-width: ${1600 / 16}em)`,
};

export const Wrapper = styled("div")`
  box-sizing: border-box;
  max-width: 1120px;
  margin: 0 auto;
`;

export const iconCss = css`
  font-size: 1rem;
  line-height: 1rem;
`;

export const FormButtonContainer = styled.div`
  padding: 1rem;
  padding-top: 0;

  ${media.md} {
    max-width: fit-content;
  }

  ${media.lg} {
    padding: 2rem;
    padding-top: 0;
  }
`;

export const Title = styled.div`
  padding: 1rem;
  font-size: 1.5rem;
  line-height: 2.3rem;
  color: ${(props) => props.theme.mainColor};
  padding-top: 0;
  padding-bottom: 0;

  ${media.lg} {
    font-size: 2rem;
    line-height: 3rem;
    padding: 1.5rem 2rem;
    padding-top: 0;
    padding-bottom: 0;
  }
`;
export const SubTitle = styled.div`
  padding: 0.5rem;
  padding-bottom: 0;
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: ${(props) => props.theme.mainColor};

  ${media.lg} {
    padding: 1rem;
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;

export const Card = styled.div`
  transition: all 0.2s;
  width: 100%;
  padding: 1rem;
  background: #ffffff;
  box-shadow: 5px 5px 40px rgba(20, 61, 123, 0.1);
  border-radius: 20px;
`;

export function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str.toLowerCase();
}

export const KoiSVG = () => (
  <svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeMiterlimit="1.5"
    viewBox="0 0 1802 2031"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      transform="matrix(.00036204 1 -1 .00036204 1986.27 -404.152)"
    >
      <path d="m2187.01 289.049c-81.67-35.815-260.62 59.681-407.32 291.432-27.02 42.682-98.48 146.633-127.88 216.425-149.35 354.614-213.73 577.534-471.15 742.504-75.77 48.56-130.92 13.17-300.601-17.65-47.639-8.66-119.798-6.9-181.025 8.4-73.128 18.27-119.98 61.9-150.831 101.68-8.853 11.42 106.429 75.74 225.062 48.47 15.062-3.47 20.351 2.57 19.394 2.66-206.222 18.53-301.232 93.12-335.884 174.83-3.407 8.03 222.518 75.83 353.977 27.49 75.296-27.69 181.843-114.59 327.088-251.03 8.61-8.09 62.03-26.49 86.99-31.09 384.4-70.91 656.34-378.55 839.01-649.415 38.63-57.284 71.92-114.87 99.52-170.994 115.76-235.467 130.26-446.966 23.65-493.712z" />
      <path d="m2163.36 782.761c97.22 88.884 316.83 389.039 198.2 423.399-86.78 25.14-306.05-36.69-299.09-245.413" />
      <path d="m1806.06 540.424c-72.19-41.832-386.48-141.11-420.54-77.268-42.3 79.286 69.81 291.587 296.14 269.958" />
    </g>
  </svg>
);

export const ImageContainer = styled.div`
  position: relative;
  padding-top: 160%;

  :hover {
    cursor: pointer;
  }
`;

const StyledLink = styled.a`
  stroke: ${(props) => props.theme.textColor} !important;
  margin-top: 0.3rem;
`;
export const withLink = (to, children) => (
  <Link href={to}>
    <StyledLink>{children}</StyledLink>
  </Link>
);

export const useWindowSize = () => {
  const [width, setWindowSize] = useState(0);

  useEffect(() => {
    function handleResize() {
      // @ts-ignore: test
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

export const getVarieties = (kois) => {
  let varieties = [];
  // @ts-ignore: test
  kois.map(({ variety }) => (varieties = [...varieties, variety]));
  return varieties.filter((v, i, a) => a.indexOf(v) === i);
};

export const priceStyling = (value, precision) =>
  value.toLocaleString("NL", {
    style: "currency",
    currency: "eur",
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
