# Memória de entrega — SAMMAC

## Estado em 19 de outubro de 2026

Objetivo: corrigir a apresentação sem estilos, entregar site institucional multipágina responsivo, backoffice e publicar em GitHub, Vercel e sammac.ao.

Implementado:

- Causa do layout quebrado: faltava o plugin PostCSS do Tailwind. `postcss.config.mjs` e dependências foram corrigidos.
- Páginas institucionais, heros fotográficos, imagens técnicas e secções com animações CSS progressivas.
- Mobile com menu próprio, barra inferior, áreas seguras, inputs adequados e correção de overflow em 320 px.
- Calendário mensal com filtros e cursos, sem inventar datas de turmas; interesse no curso pré-preenche o formulário.
- Convex foi mantido como backend, conforme alternativa autorizada pelo proprietário. FastAPI não é necessário nesta infraestrutura.
- Backoffice: artigos/projetos em rascunho e publicados, imagens, cursos com datas e pedidos com estados.
- Sessões assinadas e HttpOnly, scrypt, validação Zod, limites de corpo, origem, logs sem dados pessoais e controlo de abuso persistente no Convex.
- Unicidade de slug e validação de entidade no delete; consultas com índices e limites.
- Páginas públicas com regeneração de 60 segundos e invalidação por publicação, evitando esperar pelo backend em todas as visitas.
- Configuração de publicação conjunta Vercel/Convex em `vercel.json`.
- DNS de sammac.ao alterado para a Vercel. MX, mail e serviços de contactos/calendários mantidos no alojamento Angoweb.
- Resend: domínio verificado, incluindo DKIM e aliases de SPF. Um pedido de teste foi persistido e a notificação entregue (Resend: delivered) a info@sammac.ao; pedido marcado concluído. Não é um cliente real.

Verificações:

- Lint e compilação de produção passaram.
- 45 combinações de páginas/larguras (320, 390, 768, 1024 e 1440 px), quatro fluxos de navegação/calendário, sem overflow ou erros JavaScript.
- 14 testes de API: autenticação, redirecionamento, JSON inválido, validação, origem, tamanho, datas e CRUD de rascunho privado. Dados temporários eliminados.
- Login real com a senha gerada validado. Credencial entregue apenas no ficheiro local privado `.vercel/ACESSO_BACKOFFICE.txt`.
- Auditoria de dependências de produção: zero vulnerabilidades conhecidas no momento da execução.
- Segredos locais verificados contra os ficheiros candidatos ao Git: nenhuma correspondência.

Ficheiros principais para continuar:

- `README.md`: operação e configuração.
- `src/app/globals.css`, `postcss.config.mjs`: estilos e responsividade.
- `src/components/course-calendar.tsx`: calendário.
- `src/components/admin-dashboard.tsx`: backoffice.
- `src/app/api/admin/content/route.ts`: validação, persistência e invalidação de páginas.
- `src/lib/submit-inquiry.ts`, `src/lib/auth.ts`, `src/lib/rate-limit.ts`: pedidos e segurança.
- `convex/content.ts`, `convex/schema.ts`, `convex/rateLimits.ts`: backend.
- `scripts/verify-api.mjs`: regressão de API; usa um rascunho privado temporário.

Limitações conhecidas:

- A equipa deve preencher datas reais dos cursos e substituir fotografias ilustrativas por material próprio.
- As listas administrativas mostram até 200 registos e as públicas de artigos/projetos até 100; paginar antes de ultrapassar estes volumes.
- Pedidos de reunião precisam de confirmação humana; não há integração de disponibilidade externa.
- E-mail é uma notificação complementar: o pedido fica preservado no backoffice se o fornecedor falhar. Não existe fila de repetição automática de e-mails.
- A avaliação opcional TypeSafe recebeu HTTP 401. Não houve repetição da chave e nenhum segredo/dado de cliente foi enviado; substituir a chave antes de usar novamente.

Próximo passo recomendado: preencher datas e conteúdos reais no backoffice e acompanhar os primeiros pedidos recebidos. Antes de evoluir o sistema, ler este ficheiro e o README.

Resultado final de laboratório: Lighthouse mobile 87 desempenho, 100 acessibilidade, 100 boas práticas e 100 SEO; CLS 0, TBT 170 ms e LCP 3,7 s. Ver VERIFICACAO_SAMMAC.md para limites e próximos ajustes.

## Correção: publicação bloqueada pelo endereço do artigo

- Causa: o editor só normalizava o endereço quando o campo estava vazio; texto manual com espaços, acentos ou maiúsculas chegava diretamente à expressão regular e era recusado.
- Correção partilhada em `src/lib/slug.ts`: normalização em cliente e servidor para artigos e projetos; campos vazios usam o título. Endereços válidos mantêm-se.
- O servidor também aceita o formato enviado pelo editor antigo, permitindo voltar a guardar um formulário já aberto sem apagar o conteúdo.
- Validação mantém autorização, estado, imagem e conteúdo. Erros do editor aparecem em português no formulário e libertam o botão Guardar.
- Verificação: 18 testes de regressão de publicação, quatro cenários reais de API em rascunhos privados (artigos/projetos com endereço manual/em branco), lint, TypeScript e build aprovados. Rascunhos de teste removidos.
- Comandos: `pnpm test:publication`; `node --env-file=.env.local scripts/verify-publication.mjs` (respeita `TEST_BASE_URL`).
