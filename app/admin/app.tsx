/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import simpleRestProvider from 'ra-data-simple-rest'
import {
  Admin,
  defaultDarkTheme,
  EditGuesser,
  //ListGuesser,
  Resource,
  ShowGuesser,
  withLifecycleCallbacks,
} from 'react-admin'
import { BiSolidUserPin } from 'react-icons/bi'
import { FaUser, FaUserEdit } from 'react-icons/fa'
import { LuHop } from 'react-icons/lu'
import { PiBeerBottleDuotone, PiFactoryDuotone } from 'react-icons/pi'
import { cervejariaCallbacks } from './cervejarias/cervejariaCallbacks'
import { CreateCervejaria } from './cervejarias/create'
import { CervejariasEdit } from './cervejarias/edit'
import { CervejariaList } from './cervejarias/list'
import { CervejariaShow } from './cervejarias/show'
import { cervejasCallbacks } from './cervejas/cervejasCallbacks'
import { CreateCerveja } from './cervejas/create'
import { CervejaEdit } from './cervejas/edit'
import { CervejaList } from './cervejas/list'
import { CervejaShow } from './cervejas/show'
import { localizationPtBr } from './i18n'
import { CreateTipoCerveja } from './tipocerveja/create'
import { TipoCervejaEdit } from './tipocerveja/edit'
import { TipoCervejaList } from './tipocerveja/list'
import { TipoCervejaShow } from './tipocerveja/show'
import { UserCervejaList } from './userCerveja/list'
import { UserList } from './users/list'

const dataProvider = withLifecycleCallbacks(simpleRestProvider('/api'), [
  cervejariaCallbacks,
  cervejasCallbacks,
])

const App = () => (
  <Admin
    theme={defaultDarkTheme}
    dataProvider={dataProvider}
    i18nProvider={localizationPtBr}
  >
    <Resource
      options={{ label: 'Cervejas' }}
      icon={PiBeerBottleDuotone}
      name="cerveja"
      list={CervejaList}
      show={CervejaShow}
      edit={CervejaEdit}
      create={CreateCerveja}
      recordRepresentation="nomeCerveja"
    />
    <Resource
      options={{ label: 'Cervejarias' }}
      icon={PiFactoryDuotone}
      name="cervejaria"
      list={CervejariaList}
      show={CervejariaShow}
      edit={CervejariasEdit}
      create={CreateCervejaria}
      recordRepresentation="nome"
    />
    <Resource
      options={{ label: 'Tipos de Cerveja' }}
      icon={LuHop}
      name="tipoCerveja"
      list={TipoCervejaList}
      show={TipoCervejaShow}
      edit={TipoCervejaEdit}
      create={CreateTipoCerveja}
      recordRepresentation="nome"
    />
    <Resource
      options={{ label: 'Usários' }}
      icon={FaUser}
      name="users"
      list={UserList}
      show={ShowGuesser}
      edit={EditGuesser}
      recordRepresentation="name"
    />
    <Resource
      options={{ label: 'UserCerveja' }}
      icon={BiSolidUserPin}
      name="userCervejaRel"
      list={UserCervejaList}
      show={ShowGuesser}
      edit={EditGuesser}
      recordRepresentation="id"
    />
  </Admin>
)

export default App
