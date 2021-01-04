import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
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
} from './styles';
import api from '../../../services/api';

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
    name: string;
  };
  office: {
    name: string;
  };
}
const ListColab: React.FC = () => {
  const token = localStorage.getItem('@TriunfoDigital:token');
  const [subsidiaries, setSubsidiaries] = useState<ISubsidiary[]>([]);
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<ISubsidiary>(
    {} as ISubsidiary,
  );
  const [departament, setDepartament] = useState<IDepartament[]>([]);
  const [officies, setOfficies] = useState<IOffice[]>([]);
  const [selectedOffice, setSelectedOffice] = useState('Corretor');
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const loadSubsidiaries = async () => {
      const response = await api.get('/subsidiary');
      setSubsidiaries(response.data);
    };
    const loadOfficies = async () => {
      const response = await api.get('/office');
      setOfficies(response.data);
    };
    const loadDepartament = async () => {
      const response = await api.get('/departament', {
        params: {
          subsidiary: selectedSubsidiary.id,
        },
      });
      setDepartament(response.data);
    };
    const loadUsers = async () => {
      const response = await api.get('/users', {
        params: {
          city: selectedSubsidiary.city,
          office: selectedOffice,
        },
      });
      setUsers(response.data);
    };

    loadSubsidiaries();
    loadOfficies();
    loadUsers();
    if (selectedSubsidiary) {
      loadDepartament();
    }
  }, [selectedSubsidiary, selectedOffice]);

  const handleSelectedSubsidiary = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      try {
        const response = await api.get(`/subsidiary/${value}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setSelectedSubsidiary(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    [token],
  );
  const handleSelectedOffice = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setSelectedOffice(value);
    },
    [],
  );

  return (
    <AdmLayout>
      <FiltersContainer>
        <FiltersTop>
          <Input>
            <Search />
            <input type="text" placeholder="Buscar por corretor" />
          </Input>
        </FiltersTop>
        <FiltersBotton>
          <FiltersBottonItems>
            <span>Cidade: </span>
            <select onChange={handleSelectedSubsidiary} defaultValue="0">
              <option value="0" disabled>
                Todas
              </option>
              {subsidiaries.map(subsidary => (
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
              {departament.map(depart => (
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
              {officies.map(office => (
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
          {users.map(user => (
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
          ))}
        </SaleTableContainer>
      </Content>
    </AdmLayout>
  );
};

export default ListColab;
