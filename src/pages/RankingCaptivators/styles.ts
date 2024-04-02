import styled from 'styled-components';

interface RealtorProps {
  position?: string;
}

export const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 3.2rem;

  > svg {
    position: absolute;
    width: 30rem;
    height: 50rem;
    top: 130px;
    left: -8px;
    z-index: 0;
  }

  @media (max-width: 500px) {
    > svg {
      position: absolute;
      width: 22rem;
      height: 34rem;
      top: 78px;
      left: -10px;
      z-index: 0;
    }
  }

  @media (max-width: 375px) {
    > svg {
      position: absolute;
      width: 16rem;
      top: 53px;
      left: 2px;
      z-index: 0;
    }
  }
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  z-index: 10;
  @media (max-width: 500px) {
    font-size: 1.4rem;
  }
  @media (max-width: 375px) {
    font-size: 1.2rem;
  }
`;

export const Bar = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  margin: 1rem 0;
`;

export const Filters = styled.div`
  width: 60%;
  display: flex;
  flex: 1;
  justify-content: space-between;
  z-index: 10;
`;
export const MonthlyFilter = styled.div`
  display: flex;

  div + div {
    margin-left: 0.8rem;
  }
  z-index: 10;
`;

export const RankingContainer = styled.div`
  max-width: 70rem;
  width: 100%;
  z-index: 10;
  @media (max-width: 500px) {
    max-width: 100rem;
    width: 100%;
  }
  @media (max-width: 375px) {
    max-width: 100rem;
    width: 100%;
  }
`;
export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  z-index: 10;
  > div {
    padding: 0 1.8rem;
  }

  @media (max-width: 500px) {
    > div {
      padding: 0 0.8rem;
    }
  }
  @media (max-width: 375px) {
    > div {
      padding: 0 0.8rem;
    }
  }
`;
export const LabelItems = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 4rem;
    margin-bottom: 0;
  }

  .nameTitle {
    margin-left: 8rem;
  }

  .vgvTitle {
    margin-left: 30rem;
  }

  .nameTitle,
  .vgvTitle {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;

    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 500px) {
    > img {
      width: 3rem;
      margin-bottom: 0;
    }

    .nameTitle {
      margin-left: 3rem;
    }

    .vgvTitle {
      margin-left: 12rem;
    }

    .nameTitle,
    .vgvTitle {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 1.2rem;

      color: ${({ theme }) => theme.colors.primary};
    }
  }
  @media (max-width: 375px) {
    > img {
      width: 2rem;
      margin-bottom: 0;
    }

    .nameTitle {
      margin-left: 2rem;
    }

    .vgvTitle {
      margin-left: 10rem;
    }

    .nameTitle,
    .vgvTitle {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 1.2rem;

      color: ${({ theme }) => theme.colors.primary};
    }
  }
  @media (max-width: 320px) {
    > img {
      width: 2rem;
      margin-bottom: 0;
    }

    .nameTitle {
      margin-left: 2rem;
    }

    .vgvTitle {
      margin-left: 5rem;
    }

    .nameTitle,
    .vgvTitle {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 1.2rem;

      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const PodiumContainer = styled.div`
  z-index: 10;
`;
export const RealtorContainer = styled.div`
  z-index: 10;
`;
export const PositionItem = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 0.8rem;
`;
export const Position = styled.span`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  margin-left: 0.8rem;

  @media (max-width: 500px) {
    font-size: 1.2rem;
    margin-left: 0.4rem;
  }
  @media (max-width: 375px) {
    font-size: 1.2rem;
    margin-left: 0.4rem;
  }
`;
export const Realtor = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5rem;
  width: 100%;
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.boxShadow};
  /* border: 0.1rem solid ${({ theme }) => theme.colors.borderColor}; */
  > img {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    margin-right: 4.2rem;
  }
  @media (max-width: 500px) {
    display: flex;
    align-items: center;
    padding: 0.4rem;
    border: 0;

    > img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      margin-right: 0;
      margin-right: 1rem;
    }

    > span {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 1.6rem;
      line-height: 1rem;
      color: ${({ theme }) => theme.colors.textColor};
      margin-right: 5rem;
    }

    > strong {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 1.5rem;
      margin-right: 0;
    }
  }
  @media (max-width: 375px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 2rem;
    padding: 0.4rem;

    > img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-right: 0;
    }

    > span {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 1.2rem;
      line-height: 1rem;
      color: ${({ theme }) => theme.colors.textColor};
      margin-right: 0;
    }

    > strong {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 1.2rem;
      line-height: 1.5rem;
      margin-right: 0;
    }
  }
`;

export const Separator = styled.div`
  z-index: 10;
  margin: 3.2rem 0;
  border-top: 0.1rem solid ${({ theme }) => theme.colors.primary};
`;

export const Name = styled.div`
  width: 48%;
  margin-left: 1rem;
  > span {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 2.4rem;
    line-height: 3.7rem;
    color: ${({ theme }) => theme.colors.textColor};
  }
  @media (max-width: 500px) {
    width: 45%;
    > span {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 1.2rem;
      line-height: 1rem;
      color: ${({ theme }) => theme.colors.textColor};
      margin-right: 5rem;
    }
  }
  @media (max-width: 375px) {
    width: 40%;
    > span {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.textColor};
      margin-right: 0;
    }
  }
`;
export const VGV = styled.div<RealtorProps>`
  width: 40%;
  > strong {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 2.4rem;
    color: ${({ position }) => {
      if (position === '1') {
        return '#daa520';
      }
      if (position === '2') {
        return '#797777';
      }
      if (position === '3') {
        return '#ce7430';
      }
      if (position === '4') {
        return '#82d361';
      }
      if (position === '5') {
        return '#0072fc';
      }
      return '#C32925';
    }};
  }
  @media (max-width: 500px) {
    width: 45%;
    > strong {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 1.6rem;
      margin-right: 0;
    }
  }
  @media (max-width: 375px) {
    width: 45%;
    > strong {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 1.2rem;
      margin-right: 0;
    }
  }
`;

export const ButtonGroup = styled.div`
  margin-left: 0.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 9.6rem;
  height: 1.7rem;
  border: 0.1rem solid #c32925;
  border-radius: 1rem;

  button {
    background: transparent;
    border: 0;
    font-size: 1.2rem;
    text-align: center;
    border-radius: 1rem;
    color: #c32925;
    &.selected {
      background: #c32925;
      color: #fff;
    }
  }

  @media (max-width: 500px) {
    width: 7rem;
  }
  @media (max-width: 375px) {
    width: 7rem;
  }
`;

export const LoadingContainer = styled.div`
  margin-top: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SelectSubsidiary = styled.div`
  select {
    border: 0;
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 500px) {
    select {
      font-size: 1.4rem;
    }
  }
  @media (max-width: 375px) {
    select {
      font-size: 1.2rem;
    }
  }
`;
