import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import AdmLayout from '../../Layouts/Adm';
import { Search } from '../../../assets/images';
import {
  FiltersContainer,
  FiltersTop,
  FiltersBotton,
  FiltersBottonItems,
  Input,
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

interface IDepartament {
  id: string;
  name: string;
}

interface ISubsidiary {
  id: string;
  city: string;
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
  const [selectedOffice, setSelectedOffice] = useState('Corretor');
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
  const filterUsers = (
    users: IUser[],
    typeFilter: 'office' | 'departament' | 'subsidiary',
  ) => {
    switch (typeFilter) {
      case 'office': {
        return filterUserForOffice(users, typeFilter);
      }
      case 'departament': {
        return filterUserForDepartament(users, typeFilter);
      }
      case 'subsidiary': {
        return filterUserForSubsidiary(users, typeFilter);
      }
      default:
        break;
    }
  };

  const handleSelectedSubsidiary = async (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;
    setSelectedSubsidiary(value);
    if (users) {
      const list = filterUsers(users, 'subsidiary');
      setListUsers(list);
    }
  };
  const handleSelectedOffice = async (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;
    setSelectedOffice(value);
    if (users) {
      const list = filterUsers(users, 'office');
      setListUsers(list);
    }
  };

  const searchUserByName = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <AdmLayout>
      <FiltersContainer>
        <FiltersTop>
          <Input>
            <Search />
            <input
              type="text"
              placeholder="Buscar por corretor"
              onChange={searchUserByName}
            />
          </Input>
        </FiltersTop>
        <FiltersBotton>
          <FiltersBottonItems>
            <span>Cidade: </span>
            <select onChange={handleSelectedSubsidiary} defaultValue="0">
              <option value="0" disabled>
                Todas
              </option>
              {subsidiaries?.map(subsidary => (
                <option key={subsidary.id} value={subsidary.id}>
                  {subsidary.city}
                </option>
              ))}
            </select>
          </FiltersBottonItems>

          <FiltersBottonItems>
            <span>Departamento: </span>
            <select defaultValue="0">
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
              <Loader type="Bars" color="#c32925" height={100} width={100} />
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
                    <BsPencil size={15} color="#c32925" />
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
