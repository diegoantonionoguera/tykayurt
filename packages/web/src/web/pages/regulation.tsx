import { FaWhatsapp } from "react-icons/fa6";
import { whatsappLink } from "../lib/brand";

const REFERRAL_MESSAGE =
  "Oi! Quero participar do Compartilhou, Ganhou e pegar meu código de indicação";

export default function Regulation() {
  return (
    <main id="conteudo" tabIndex={-1} className="min-h-screen bg-page text-content">
      <article className="mx-auto max-w-[820px] px-5 py-12 md:px-10 md:py-20">
        <a
          href="/"
          className="inline-flex font-semibold text-magenta underline decoration-magenta/50 underline-offset-4 hover:text-plum"
        >
          ← Voltar para a página inicial
        </a>

        <header className="mt-10 border-b border-line pb-10">
          <h1 className="text-balance font-display text-[clamp(2.4rem,8vw,4.6rem)] leading-[1.04] text-content">
            Regulamento — Programa &quot;Compartilhou, Ganhou&quot; TykaYurt
          </h1>
          <p className="mt-5 italic text-content-muted">Última atualização: 29/08/2026</p>
        </header>

        <div className="regulation-content mt-12 space-y-12">
          <section>
            <h2>1. O que é o programa</h2>
            <p>
              O &quot;Compartilhou, Ganhou&quot; é um programa de indicação de clientes da TykaYurt.
              Não é sorteio, rifa ou promoção baseada em sorte — é uma recompensa por indicação
              efetiva, sem necessidade de autorização de órgão público (isso só se aplica a
              modalidades de sorte, como sorteios e vale-brindes por número). Aqui a recompensa
              depende exclusivamente de uma ação concreta e verificável: a compra confirmada da
              pessoa indicada.
            </p>
          </section>

          <section>
            <h2>2. Como funciona</h2>
            <ol>
              <li>O cliente indicador recebe um código pessoal de indicação.</li>
              <li>O código deve ser repassado a pessoas que ainda não são clientes TykaYurt.</li>
              <li>
                A pessoa indicada informa o código no momento da finalização do pedido, pelo
                WhatsApp Business oficial da TykaYurt.
              </li>
              <li>
                A cada <strong>2 indicações que resultarem em compra confirmada e paga</strong>, o
                indicador recebe <strong>1 pote de 250ml grátis</strong>, no sabor disponível de sua
                escolha.
              </li>
            </ol>
          </section>

          <section>
            <h2>3. Quem pode participar</h2>
            <ul>
              <li>
                Qualquer pessoa que já tenha realizado ao menos 1 compra na TykaYurt pode solicitar
                um código de indicador.
              </li>
              <li>
                A pessoa indicada precisa ser um CPF/cliente novo — ou seja, sem histórico de compra
                anterior na TykaYurt.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Validade do código</h2>
            <ul>
              <li>
                Cada código gerado é válido por <strong>30 dias corridos</strong> a partir da data de
                emissão.
              </li>
              <li>
                Indicações registradas após esse prazo não são contabilizadas com aquele código; um
                novo código pode ser solicitado a qualquer momento.
              </li>
            </ul>
          </section>

          <section>
            <h2>5. Sem limite de recompensas</h2>
            <ul>
              <li>
                Não há limite de quantas vezes um cliente pode repetir o ciclo. A cada 2 novas
                indicações válidas, um novo pote de 250ml grátis é concedido — sem teto mensal ou
                total.
              </li>
              <li>
                A recompensa não é acumulável em pedidos maiores (ex: 4 indicações não geram 1 pote
                de 500ml); sempre 2 indicações = 1 pote de 250ml.
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Regras para evitar fraude — leitura obrigatória</h2>
            <p>
              Indicações <strong>não serão validadas</strong> nos seguintes casos:
            </p>
            <ul>
              <li>
                <strong>Autoindicação</strong>: cliente usando o próprio código com outro nome, número
                de WhatsApp ou perfil para simular uma nova cliente.
              </li>
              <li>
                <strong>Indicação combinada sem compra real</strong>: pedido feito apenas para
                &quot;ativar&quot; o código e depois cancelado, não retirado, ou não pago integralmente.
              </li>
              <li>
                <strong>Mesmo endereço/mesmo número de contato</strong>: pedidos com dados de entrega
                ou contato idênticos aos de uma indicação já usada por aquele mesmo código,
                indicando duplicidade.
              </li>
              <li>
                <strong>Conta nova sem histórico real de consumo</strong>: perfis criados apenas para
                gerar código, sem intenção de compra recorrente.
              </li>
            </ul>
            <p>
              Em qualquer um desses casos, a indicação é anulada e o código pode ser cancelado.
              Casos reincidentes podem levar à exclusão do cliente do programa.
            </p>
          </section>

          <section>
            <h2>7. Casos de dúvida ou disputa</h2>
            <p>
              Toda decisão final sobre validade de uma indicação, elegibilidade ou concessão da
              recompensa é de responsabilidade exclusiva da gestão da TykaYurt. A empresa se reserva
              o direito de analisar cada caso individualmente antes de confirmar a recompensa.
            </p>
          </section>

          <section>
            <h2>8. Alterações e encerramento do programa</h2>
            <p>
              A TykaYurt pode alterar as regras deste programa ou encerrá-lo a qualquer momento,
              mediante aviso nos canais oficiais (Instagram e/ou WhatsApp Business), sem necessidade
              de aviso prévio a cada participante individualmente. Indicações já validadas até a data
              do encerramento serão honradas normalmente.
            </p>
          </section>

          <section>
            <h2>9. Aceite das regras</h2>
            <h2 className="mt-6 text-[clamp(1.6rem,4vw,2.35rem)] leading-snug">
              Ao solicitar um código de indicação ou informar um código como cliente indicada, o
              participante declara estar de acordo com as regras acima.
            </h2>
          </section>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <a
            href={whatsappLink(REFERRAL_MESSAGE)}
            data-track="whatsapp_indicacao_regulamento"
            target="_blank"
            rel="noreferrer"
            className="button-press inline-flex items-center gap-3 rounded-full bg-magenta px-7 py-4 text-sm font-bold text-white hover:bg-[#bc1f60] hover:scale-[1.02]"
          >
            <FaWhatsapp className="h-5 w-5" />
            Quero meu código
          </a>
        </div>
      </article>
    </main>
  );
}
