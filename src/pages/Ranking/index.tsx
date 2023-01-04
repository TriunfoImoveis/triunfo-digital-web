import React, { useState, useCallback, ChangeEvent, useMemo } from 'react';
import Loader from 'react-loader-spinner';
import { useAuth } from '../../context/AuthContext';
import { months } from '../../utils/months';
import { optionYear } from '../../utils/loadOptions';
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
  LoadingContainer,
  SelectSubsidiary,
  Filters,
  Bar,
  MonthlyFilter,
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
  const { userAuth } = useAuth();
  const currentYear = new Date().getFullYear();
  const [selectedSubsidiary, setSelectedSubsidiary] = useState(userAuth.subsidiary.city);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState('0');
  const [url, setUrl] = useState(
    `/ranking?city=${userAuth.subsidiary.city}&year=${currentYear}&user=Corretor`,
  );
  const { data: realtors } = useFetch<IRealtorData[]>(url);
  const optionsYear = optionYear.filter(year => year.value <= currentYear);
  const ranking = useMemo(() => {
    return realtors?.map(r => ({
      id: r.id,
      avatar_url: r.avatar_url,
      name: r.name,
      vgv: formatPrice(Number(r.vgv)),
    }));
  }, [realtors]);

  const handleSelectSubsidiary = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const subsidiaryCity = event.target.value;
      setSelectedSubsidiary(subsidiaryCity);
      if (Number(selectedMonth) > 0) {
        setUrl(
          `/ranking?city=${subsidiaryCity}&month=${selectedMonth}&year=${selectedYear}&user=Corretor`,
        );
      } else {
        setUrl(
          `/ranking?city=${subsidiaryCity}&year=${selectedYear}&user=Corretor`,
        );
      }
    },
    [selectedMonth, selectedYear],
  );

  const handleSelectMonth = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (Number(event.target.value) > 0) {
        const month = Number(event.target.value);
        setSelectedMonth(event.target.value);
        setUrl(
          `/ranking?city=${selectedSubsidiary}&month=${month}&year=${selectedYear}&user=Corretor`,
        );
      } else {
        setSelectedMonth('0');
        setUrl(
          `/ranking?city=${selectedSubsidiary}&year=${selectedYear}&user=Corretor`,
        );
      }
    },
    [selectedSubsidiary, selectedYear],
  );

  const heandleSelectedYear = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const year = Number(event.target.value);
    setSelectedYear(year);
    setUrl(`/ranking?city=${selectedSubsidiary}&year=${year}&user=Corretor`);
  }, [selectedSubsidiary]);

  // useEffect(() => {
  //   handleSwichVGVToYear('month');
  // }, [setSelectedMonth, handleSwichVGVToYear]);

  return (
    <Container>
      <Header />
      <BackgroundImage />
      <Content>
        <Title>Top Five</Title>
        <Filters>
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
            <>
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

              <SelectSubsidiary>
                <select
                  defaultValue={selectedYear}
                  onChange={heandleSelectedYear}
                >
                  {optionsYear.map(item => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                </select>
              </SelectSubsidiary>
            </>
          )}

          <>
            <SelectSubsidiary>
              <select
                defaultValue={selectedYear}
                onChange={heandleSelectedYear}
              >
                {optionsYear.map(item => (
                  <option value={item.value}>{item.label}</option>
                ))}
              </select>
            </SelectSubsidiary>
            <MonthlyFilter>
              <SelectSubsidiary>
                <select defaultValue={selectedMonth} onChange={handleSelectMonth}>
                  <option value="0">ANUAL</option>
                  <optgroup label="MESES">
                    {months.map(month => (
                      <option value={month.value}>{month.label}</option>
                    ))}
                  </optgroup>
                </select>
              </SelectSubsidiary>
            </MonthlyFilter>
          </>
        </Filters>

        <RankingContainer>
          <Bar />
          <LabelContainer>
            <div />
            <LabelItems>
              <img src={Crown} alt="Campeão" />
              <span className="nameTitle">Nome</span>
              <span className="vgvTitle">VGV</span>
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
