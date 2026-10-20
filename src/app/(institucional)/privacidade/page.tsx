import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacidade" };
export default function Page() {
  return (
    <div className="container-x pb-24 pt-36">
      <p className="eyebrow">Privacidade</p>
      <h1 className="mt-3 text-4xl font-black">Política de privacidade</h1>
      <div className="mt-8 max-w-3xl space-y-5 leading-7 text-slate-600">
        <p>
          A SAMMAC recolhe apenas os dados necessários para responder a pedidos
          de contacto, informações sobre formações, serviços e reuniões.
        </p>
        <p>
          Os dados submetidos através do site são usados para atendimento e
          acompanhamento do pedido. Não são vendidos a terceiros.
        </p>
        <p>
          Para solicitar atualização ou eliminação de dados associados a um
          pedido, contacte info@sammac.ao.
        </p>
        <p>
          São aplicadas medidas técnicas e organizacionais razoáveis para
          limitar acesso indevido e proteger a informação armazenada.
        </p>
      </div>
    </div>
  );
}
