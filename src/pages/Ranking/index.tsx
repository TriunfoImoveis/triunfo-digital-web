import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import Loader from 'react-loader-spinner';
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
  LoadingContainer,
  SelectSubsidiary,
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
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedSubsidiary, setSelectedSubsidiary] = useState('São Luís');
  const [token] = useState(() => localStorage.getItem('@TriunfoDigital:token'));
  const { userAuth } = useAuth();

  useEffect(() => {
    const loadRanking = async () => {
      setLoading(true);
      try {
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
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    const loadRankingAdm = async () => {
      setLoading(true);
      try {
        const response = await api.get('/ranking', {
          headers: {
            authorization: `Bearer ${token}`,
          },
          params: {
            city: selectedSubsidiary,
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
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    userAuth.office.name === 'Presidente' || userAuth.office.name === 'Gerente'
      ? loadRankingAdm()
      : loadRanking();
  }, [
    token,
    userAuth.subsidiary.city,
    selectedSubsidiary,
    userAuth.office.name,
  ]);

  const handleSwichVGVToYear = async (filter: string) => {
    const month = new Date().getMonth();
    const monthSystem = month + 1;
    setSelected(!selected);
    switch (filter) {
      case 'month': {
        setLoading(true);
        try {
          const response = await api.get('/ranking', {
            headers: {
              authorization: `Bearer ${token}`,
            },
            params: {
              city:
                userAuth.office.name === 'Presidente' ||
                userAuth.office.name === 'Gerente'
                  ? selectedSubsidiary
                  : userAuth.subsidiary.city,
              month: monthSystem.toString(),
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
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
        break;
      }
      case 'year': {
        setLoading(true);
        try {
          const response = await api.get('/ranking', {
            headers: {
              authorization: `Bearer ${token}`,
            },
            params: {
              city:
                userAuth.office.name === 'Presidente' ||
                userAuth.office.name === 'Gerente'
                  ? selectedSubsidiary
                  : userAuth.subsidiary.city,
              month: monthSystem.toString(),
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
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
        break;
      }
      default:
        break;
    }
  };

  const handleSelectSubsidiary = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const subsidiaryCity = event.target.value;
      setSelectedSubsidiary(subsidiaryCity);
    },
    [],
  );

  return (
    <Container>
      <Header />
      <BackgroundImage />
      <Content>
        <Title>Top Five</Title>
        {userAuth.office.name === 'Presidente' && (
          <SelectSubsidiary>
            <select
              defaultValue={selectedSubsidiary}
              onChange={handleSelectSubsidiary}
            >
              <option value="São Luís">São Luís</option>
              <option value="Fortaleza">Fortaleza</option>
              <option value="Teresina">Teresina</option>
            </select>
          </SelectSubsidiary>
        )}
        {userAuth.office.name === 'Gerente' && (
          <SelectSubsidiary>
            <select
              defaultValue={selectedSubsidiary}
              onChange={handleSelectSubsidiary}
            >
              <option value="São Luís">São Luís</option>
              <option value="Fortaleza">Fortaleza</option>
              <option value="Teresina">Teresina</option>
            </select>
          </SelectSubsidiary>
        )}

        <RankingContainer>
          <LabelContainer>
            <div />
            <LabelItems>
              <img src={Crown} alt="Campeão" />
              <span className="nameTitle">Nome</span>
              <span className="vgvTitle">VGV</span>
              <ButtonGroup>
                <button
                  type="button"
                  className={selected ? 'selected' : undefined}
                  onClick={() => handleSwichVGVToYear('month')}
                >
                  Mês
                </button>
                <button
                  type="button"
                  className={!selected ? 'selected' : undefined}
                  onClick={() => handleSwichVGVToYear('year')}
                >
                  Ano
                </button>
              </ButtonGroup>
            </LabelItems>
          </LabelContainer>
          {loading ? (
            <LoadingContainer>
              <Loader type="Bars" color="#c32925" height={100} width={100} />
            </LoadingContainer>
          ) : (
            <>
              <PodiumContainer>
                {realtors.map((realtor, i) => {
                  return i <= 4 ? (
                    <PositionItem key={realtor.id}>
                      <Position>{`${i + 1}°`}</Position>
                      <Realtor>
                        <img
                          src={
                            realtor.avatar_url ||
                            'https://imgur.com/I80W1Q0.png'
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
                      <Position>{`${i + 1}°`}</Position>
                      <Realtor>
                        <img
                          src={
                            realtor.avatar_url ||
                            'https://imgur.com/I80W1Q0.png'
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
              </RealtorContainer>
            </>
          )}
        </RankingContainer>
      </Content>
    </Container>
  );
};

export default Ranking;
