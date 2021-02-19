import styled from 'styled-components';

interface SaldBanksHeaderProps {
  showBanks: number;
}
export const Container = styled.div`
  margin-top: 3rem;
  border: 1px solid #000;
  max-width: 1280px;
  width: 100%;
  z-index: 100;
`;
export const Header = styled.div`
  width: 100%;
`;
export const SaldBanksContainer = styled.div`
  width: 100%;
`;
export const SaldBanksHeader = styled.div<SaldBanksHeaderProps>`
  display: flex;
  align-items: center;
  h1 {
    font-size: 2.4rem;
    color: #504c4c;
    margin-right: 0.8rem;
  }

  button {
    border: 0;
    background: transparent;
  }
`;
export const SaldBanks = styled.div``;
