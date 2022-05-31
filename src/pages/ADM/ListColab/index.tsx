import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import AdmLayout from '../../Layouts/Adm';
import {
  FiltersContainer,
  FiltersBotton,
  FiltersBottonItems,
  Content,
  SaleTableContainer,
  HeaderItem,
  SaleHeader,
  SaleBody,
  SaleItem,
  LoadingContainer,
} from './styles';
import { useFetch } from '../../../hooks/useFetch';
import { useLoadDepartament } from '../../../hooks/loadDepartaments';
import {
  filterUserForDepartament,
  filterUserForOffice,
  filterUserForSubsidiary,
} from '../../../utils/filters';

import theme from '../../../styles/theme';

interface IDepartament {
  id: string;
  name: string;
}

interface ISubsidiary {
  id: string;
  city: string;
  name: string;
}
interface IOffice {
  id: string;
  name: string;
}

interface IUser {
  id: string;
  name: string;
  avatar_url: string | null;
  departament: {
    id: string;
    name: string;
  };
  subsidiary: {
    id: string;
    name: string;
  };
  office: {
    id: string;
    name: string;
  };
}
const ListColab: React.FC = () => {
  const [selectedSubsidiary, setSelectedSubsidiary] = useState('');
  const [selectedOffice, setSelectedOffice] = useState('0');
  const [selectedDepartament, setSelectedDepartament] = useState('0');
  const { data: users } = useFetch<IUser[]>('/users');
  const { data: subsidiaries } = useFetch<ISubsidiary[]>(`/subsidiary`);
  const { data: officies } = useFetch<IOffice[]>(`/office`);
  const { data: departaments } = useLoadDepartament<IDepartament[]>({
    subsidiary: selectedSubsidiary,
  });
  const [listUsers, setListUsers] = useState<IUser[] | undefined>([]);

  useEffect(() => {
    users && setListUsers(users);
  }, [users]);
  
  const handleSelectedSubsidiary = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;
    setSelectedSubsidiary(value);
    if (users) {
      const list = filterUserForSubsidiary(users, value);
      setListUsers(list);
    }
  };
  const handleSelectedOffice = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;
    setSelectedOffice(value);
    if (users) {
      console.log({value})
      const list = filterUserForOffice(users, value);
      setListUsers(list);
    }
  };
  const handleSelecedDepartament = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;
    setSelectedDepartament(value)
    if (users) {
      const list = filterUserForDepartament(users, value);
      setListUsers(list);
    }
  };

  return (
    <AdmLayout>
      <FiltersContainer>
        <FiltersBotton>
          <FiltersBottonItems>
            <span>Cidade: </span>
            <select onChange={handleSelectedSubsidiary} defaultValue="0">
              <option value="0" disabled>
                Todas
              </option>
              {subsidiaries?.map(subsidary => (
                <option key={subsidary.id} value={subsidary.id}>
                  {subsidary.name}
                </option>
              ))}
            </select>
          </FiltersBottonItems>

          <FiltersBottonItems>
            <span>Departamento: </span>
            <select defaultValue={selectedDepartament} onChange={handleSelecedDepartament}>
              <option value="0" disabled>
                Todas
              </option>
              {departaments?.map(depart => (
                <option key={depart.id} value={depart.id}>
                  {depart.name}
                </option>
              ))}
            </select>
          </FiltersBottonItems>
          <FiltersBottonItems>
            <span>Cargo: </span>
            <select
              onChange={handleSelectedOffice}
              defaultValue={selectedOffice}
            >
              <option value="0" disabled>
                Todas
              </option>
              {officies?.map(office => (
                <option key={office.id} value={office.name}>
                  {office.name}
                </option>
              ))}
            </select>
          </FiltersBottonItems>
          <FiltersBottonItems>
            <Link to="/adm/novo-colaborador">Novo Colaborador</Link>
          </FiltersBottonItems>
        </FiltersBotton>
      </FiltersContainer>
      <Content>
        <SaleTableContainer>
          <SaleHeader>
            <HeaderItem />
            <HeaderItem>Nome</HeaderItem>
            <HeaderItem>Departamento</HeaderItem>
            <HeaderItem>Cargo</HeaderItem>
          </SaleHeader>
          {!users ? (
            <LoadingContainer>
              <Loader type="Bars" color={theme.colors.gold} height={100} width={100} />
            </LoadingContainer>
          ) : (
            listUsers?.map(user => (
              <SaleBody key={user.id}>
                <SaleItem className="avatar">
                  <img
                    src={user.avatar_url || 'https://imgur.com/I80W1Q0.png'}
                    alt={user.name || 'Usuário'}
                  />
                </SaleItem>
                <SaleItem>{user.name}</SaleItem>
                <SaleItem>{user.departament.name}</SaleItem>
                <SaleItem>{user.office.name}</SaleItem>
                <SaleItem>
                  <Link to={`/adm/detalhes-colaborador/${user.id}`}>
                    <BsPencil size={15} color={theme.colors.gold} />
                    Editar
                  </Link>
                </SaleItem>
              </SaleBody>
            ))
          )}
        </SaleTableContainer>
      </Content>
    </AdmLayout>
  );
};

export default ListColab;
