import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';

import { BackgroundImage } from '../../assets/images';
import Crown from '../../assets/images/coroa.svg';

import {
  Container,
  Content,
  Title,
  RankingContainer,
  LabelContainer,
  PodiumContainer,
  PositionItem,
  Position,
  Realtor,
  LabelItems,
  RealtorContainer,
  Separator,
  Name,
  VGV,
  ButtonGroup,
} from './styles';
import { formatPrice } from '../../utils/format';
import api from '../../services/api';

interface IRealtorData {
  id: string;
  avatar_url: string;
  name: string;
  vgv: string;
}

const Ranking: React.FC = () => {
  const [realtors, setRealtors] = useState<IRealtorData[]>([]);
  const [token] = useState(() => localStorage.getItem('@TriunfoDigital:token'));
  const { userAuth } = useAuth();

  useEffect(() => {
    const loadRanking = async () => {
      const response = await api.get('/ranking', {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          city: userAuth.subsidiary.city,
        },
      });
      const ranking = response.data;
      const rankingFormatted = ranking.map(r => ({
        id: r.id,
        avatar_url: r.avatar_url,
        name: r.name,
        vgv: formatPrice(r.vgv),
      }));
      setRealtors(rankingFormatted);
    };
    loadRanking();
  }, [token, userAuth.subsidiary.city]);

  return (
    <Container>
      <Header />
      <BackgroundImage />
      <Content>
        <Title>Top Five</Title>
        <RankingContainer>
          <LabelContainer>
            <div />
            <LabelItems>
              <img src={Crown} alt="Campeão" />
              <span className="nameTitle">Nome</span>
              <span className="vgvTitle">VGV</span>
              <ButtonGroup>
                <button type="button">VGV</button>
                <button type="button" className="selected">
                  Mês
                </button>
              </ButtonGroup>
            </LabelItems>
          </LabelContainer>
          <PodiumContainer>
            {realtors.map((realtor, i) => {
              return i <= 4 ? (
                <PositionItem key={realtor.id}>
                  <Position>{`${i + 1}°`}</Position>
                  <Realtor>
                    <img
                      src={
                        realtor.avatar_url || 'https://imgur.com/I80W1Q0.png'
                      }
                      alt={realtor.name}
                    />
                    <Name>
                      <span>{realtor.name}</span>
                    </Name>
                    <VGV position={String(i + 1)}>
                      <strong>{realtor.vgv}</strong>
                    </VGV>
                  </Realtor>
                </PositionItem>
              ) : null;
            })}
          </PodiumContainer>
          <Separator />
          <RealtorContainer>
            {realtors.map((realtor, i) => {
              return i >= 5 ? (
                <PositionItem key={realtor.id}>
                  <Position>{`${i}°`}</Position>
                  <Realtor>
                    <img src={realtor.avatar_url} alt={realtor.name} />
                    <Name>
                      <span>{realtor.name}</span>
                    </Name>
                    <VGV position={String(i)}>
                      <strong>{realtor.vgv}</strong>
                    </VGV>
                  </Realtor>
                </PositionItem>
              ) : null;
            })}
          </RealtorContainer>
        </RankingContainer>
      </Content>
    </Container>
  );
};

export default Ranking;
