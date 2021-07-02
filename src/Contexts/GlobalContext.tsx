import React, { useContext, createContext, useState, useCallback } from 'react';
import { SnackBarComponent } from '../Componentes/Notificacao/index';
import LoadingComponent from '../Componentes/Loading/index';
import { GlobalContextType } from '../Types/Contexts/Global';
import { MensagemSnack, TypeMensagemSnack } from '../Types/Notificacao';

const GlobalContext = createContext<(GlobalContextType)>({} as GlobalContextType);

function GlobalContextProvider({ children }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [mensagemSnack, setMensagemSnack] = useState<MensagemSnack>({ mensagem: "", status: false, type: TypeMensagemSnack.info });
  const SetLoading = useCallback((state: boolean) => setLoading(state), [loading]);
  const SetMensagemSnack = (mensagem: string, type: TypeMensagemSnack) => setMensagemSnack({ type, mensagem, status: true });
  const SetMensagemSnackClose = (event?: React.SyntheticEvent, reason?: string) => setMensagemSnack({ status: false, type: TypeMensagemSnack.info, mensagem: "" });

  return (
    <GlobalContext.Provider value={{ SetLoading, SetMensagemSnack }}>
      <SnackBarComponent {...mensagemSnack} OnClose={SetMensagemSnackClose} />
      <LoadingComponent status={loading} />
      {children}
    </GlobalContext.Provider>
  );
}

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  return context;
}
export { useGlobalContext, GlobalContextProvider };