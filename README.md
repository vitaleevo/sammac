# SAMMAC — site institucional e backoffice

Site multipágina para formação técnica e serviços industriais em Angola. Next.js/React, Tailwind CSS e Convex. O alojamento público é a Vercel; o cPanel mantém DNS e e-mail.

## Funcionalidades

- Páginas: início, sobre, formações, serviços, projetos, blog, contactos, agendamento e privacidade.
- Heros fotográficos, imagens técnicas, animações com respeito pela preferência de movimento reduzido.
- Navegação desktop; menu e barra inferior próprios para mobile, com suporte às áreas seguras do dispositivo.
- Calendário mensal, filtro por área e formulário com curso pré-preenchido. Datas sem confirmação não são inventadas.
- Backoffice em `/backoffice`: artigos e projetos em rascunho/publicados, imagens até 5 MB, cursos com datas e gestão dos pedidos.
- Formulários persistidos no Convex e notificações por Resend para `info@sammac.ao`. Uma falha de e-mail não elimina o pedido recebido.
- Autenticação por hash scrypt, sessão assinada HttpOnly, expiração em 8 horas, controlo de origem, validação Zod e limites persistentes contra abuso.

## Desenvolvimento

Use Node.js 24 e pnpm 11. Copie `.env.example` para `.env.local` e configure os valores privados.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm exec tsc --noEmit
pnpm build
node --env-file=.env.local scripts/verify-api.mjs
```

Os testes de integração usam a aplicação em `http://localhost:3000` por padrão. Criam apenas um rascunho privado temporário e eliminam-no no fim; não usam dados de clientes. Para outro servidor, defina `TEST_BASE_URL`.

## Publicação e segredos

O projeto Vercel `sammac` está ligado ao repositório `vitaleevo/sammac`. O `vercel.json` publica o backend Convex e compila o site no mesmo fluxo. O deploy exige `CONVEX_DEPLOY_KEY` apenas no ambiente de produção.

Configure as variáveis do exemplo na Vercel. No Convex configure também `ADMIN_WRITE_SECRET`, com o mesmo valor. Nunca publique `.env.local`, chaves SSH, tokens, cookies de teste ou o ficheiro de acesso administrativo. A pasta `.vercel` é privada e ignorada pelo Git.

A senha do backoffice fica apenas como hash no ambiente; o ficheiro local `.vercel/ACESSO_BACKOFFICE.txt` contém a credencial gerada para o proprietário. A alteração do hash na Vercel exige novo deploy. Para revogar sessões existentes, altere `ADMIN_SESSION_SECRET` e publique novamente.

## Operação

1. Entre em `/backoffice`, crie o conteúdo e selecione Rascunho ou Publicado.
2. Para cursos, indique a data inicial/final e o estado. O calendário é preenchido automaticamente.
3. Consulte Pedidos e atualize o estado do atendimento.
4. Edite projetos e artigos com imagens locais enviadas para o armazenamento Convex.

As listas administrativas estão limitadas aos 200 registos mais recentes e as listas públicas de artigos/projetos a 100. Para volumes superiores, implemente paginação. Exporte os dados do Convex antes de alterações de esquema; não elimine tabelas existentes. Os índices de controlo de abuso são adicionais e não alteram o conteúdo anterior.

O calendário e os pedidos de reunião representam manifestações de interesse; a equipa confirma vagas e horários. As fotografias são ilustrativas e devem ser substituídas por material próprio quando disponível.

## Infraestrutura

- `sammac.ao`: registo A para a Vercel, conforme configuração verificada.
- `www.sammac.ao`: alias do domínio principal.
- MX e `mail.sammac.ao`: mantidos no alojamento Angoweb.
- DKIM `resend._domainkey`, aliases `rsend` e `send`: autenticação da Resend.
- O envio por Resend depende de o domínio aparecer como **verified** no fornecedor.

Documentação consultada: [Tailwind + Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [Convex + Vercel](https://docs.convex.dev/production/hosting/vercel), [Resend](https://resend.com/docs/api-reference/emails/send-email).

Estado e evidência de entrega: `MEMORIA_SAMMAC.md` e `VERIFICACAO_SAMMAC.md`. A Resend verificou o domínio e confirmou a entrega da notificação de teste.
