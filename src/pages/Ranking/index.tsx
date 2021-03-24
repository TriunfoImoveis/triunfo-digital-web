import React, { useState, useCallback, ChangeEvent, useMemo } from 'react';
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
import { useFetch } from '../../hooks/useFetch';

interface IRealtorData {
  id: string;
  avatar_url: string;
  name: string;
  vgv: string;
}

const Ranking: React.FC = () => {
  const [selected, setSelected] = useState(false);
  const [selectedSubsidiary, setSelectedSubsidiary] = useState('São Luís');
  const { userAuth } = useAuth();
  const [url, setUrl] = useState(
    `/ranking?city=${userAuth.subsidiary.city}&type=ANUAL&user=Corretor`,
  );
  const { data: realtors } = useFetch<IRealtorData[]>(url);

  const ranking = useMemo(() => {
    return realtors?.map(r => ({
      id: r.id,
      avatar_url: r.avatar_url,
      name: r.name,
      vgv: formatPrice(Number(r.vgv)),
    }));
  }, [realtors]);

  const handleSwichVGVToYear = useCallback(
    async (filter: string) => {
      setSelected(!selected);
      switch (filter) {
        case 'month': {
          const city =
            userAuth.office.name === 'Presidente' ||
            userAuth.office.name === 'Gerente'
              ? selectedSubsidiary
              : userAuth.subsidiary.city;
          setUrl(`/ranking?city=${city}&type=MENSAL&user=Corretor`);
          break;
        }
        case 'year': {
          const city =
            userAuth.office.name === 'Presidente' ||
            userAuth.office.name === 'Gerente'
              ? selectedSubsidiary
              : userAuth.subsidiary.city;
          setUrl(`/ranking?city=${city}&user=Corretor`);
          break;
        }
        default:
          break;
      }
    },
    [
      selected,
      selectedSubsidiary,
      userAuth.subsidiary.city,
      userAuth.office.name,
    ],
  );
  const handleSelectSubsidiary = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const subsidiaryCity = event.target.value;
      setSelectedSubsidiary(subsidiaryCity);
      setUrl(`/ranking?city=${subsidiaryCity}&type=ANUAL&user=Corretor`);
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
          {!ranking ? (
            <LoadingContainer>
              <Loader type="Bars" color="#c32925" height={100} width={100} />
            </LoadingContainer>
          ) : (
            <>
              <PodiumContainer>
                {ranking.map((realtor, i) => {
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
                {ranking?.map((realtor, i) => {
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
