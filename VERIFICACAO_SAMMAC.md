# Verificação da entrega SAMMAC — 19/10/2026

## Evidência objetiva

- `pnpm lint`, TypeScript e build de produção aprovados.
- 14 verificações de API aprovadas, incluindo autenticação negativa, validação, origem, limite de corpo e CRUD de rascunhos privados.
- 45 combinações de páginas/larguras e quatro fluxos de menu/calendário aprovados. Ecrãs: 320, 390, 768, 1024 e 1440 px.
- Login real e gravação de artigo pelo editor do backoffice aprovados; rascunhos de teste removidos.
- Resend: domínio verificado e notificação de teste **delivered** para info@sammac.ao. O pedido de teste está concluído no backoffice.
- Auditoria de dependências de produção sem vulnerabilidades conhecidas.
- Nenhum segredo local encontrado nos ficheiros candidatos ao Git.

## Lighthouse mobile — laboratório local

| Medida | Resultado |
|---|---:|
| Desempenho | 87/100 |
| Acessibilidade | 100/100 |
| Boas práticas | 100/100 |
| SEO | 100/100 |
| First Contentful Paint | 1,1 s |
| Largest Contentful Paint | 3,7 s |
| Total Blocking Time | 170 ms |
| Cumulative Layout Shift | 0 |

Medição sobre build de produção em localhost com simulação mobile. Não representa dados reais de visitantes nem mede INP real. O objetivo de LCP inferior a 2,5 s ainda não foi atingido nesta simulação; o próximo ajuste de desempenho deve concentrar-se no hero e confirmar os resultados sobre a CDN de produção. Foram removidas quatro dependências de animação, priorizada a imagem principal e adotada regeneração/invalidação de conteúdo para reduzir consultas no caminho de carregamento.

## Scorecard UX/UI

Pontuações manuais de revisão, exceto os indicadores automatizados acima.

| Dimensão | Nota | Evidência / limite |
|---|---:|---|
| UX | 93 | Navegação e formulários verificados nos cinco tamanhos. |
| UI | 93 | Sistema de cores, fotografias, heros e tipografia consistentes. |
| Acessibilidade | 100 | Lighthouse; foco e editor modal nativos. Não substitui auditoria manual completa com leitores de ecrã. |
| Desempenho | 87 | Lighthouse local; LCP ainda acima da meta. |
| Consistência | 94 | Componentes e variantes partilhadas. |
| Conversão | 92 | Interesse em cursos e pedidos com pré-preenchimento e confirmação clara. |
| Escalabilidade | 87 | Listas limitadas; acrescentar paginação antes de exceder 200 registos administrativos. |

Classificação: **Needs Refinement**, por desempenho mobile e paginação futura. Não existem bloqueios funcionais observados para a publicação institucional no volume atual.

## API CONTROL REPORT

Âmbito: APIs internas `/api/admin/*`, `/api/contact` e `/api/meeting`, contratos do próprio site.

Design 88; Segurança 90; Performance 82; Consistência 88; Observabilidade 85; Versionamento 85. API Score ponderado: 87. Testes: 14 verificações automatizadas mais login/editor e pedido público com e-mail real.

Controlos: scrypt, sessão assinada HttpOnly, expiração, autorização em cada endpoint privado, validação Zod, limites persistentes de tentativas/pedidos, tamanho máximo, origem e logs com requestId sem mensagens pessoais.

Limites: latência p95 sob carga não medida; e-mail sem fila automática de repetição; não é uma API pública para consumidores externos. Production Ready: **YES para uso institucional atual**, com esses limites operacionais documentados.

## DATABASE CONTROL REPORT

Convex: posts, projects, courses, inquiries e rateLimits. IDs próprios, índices de slug/estado/data e índices de controlo de abuso. Publicação restringe leituras públicas; escrita e painel exigem segredo de serviço apenas no servidor. Slugs duplicados bloqueados e eliminação valida a tabela.

Design 90; Integridade 88; Performance 85; Segurança 90; Escalabilidade 85; Manutenção 88. DB Score ponderado: 87,7.

Alteração de esquema adicional, sem remoção de tabelas existentes. A cópia de segurança deve preceder mudanças futuras; não foi feito ensaio de restauro nesta entrega. Production Ready: **YES para o âmbito atual**. Antes de crescer: paginação, política de retenção de pedidos e rotina de exportação/restauro.

## Regressão de publicação — endereço manual

Normalização partilhada de endereços em cliente e servidor. Verificados 18 cenários de schema (incluindo estado Publicado e preservação da imagem/conteúdo) e quatro cenários de API em rascunhos temporários removidos após teste. Lint, TypeScript e build aprovados. Não foram alteradas permissões nem a estrutura da base de dados.

Revisão manual do editor: UX 93, UI 93, acessibilidade 93, consistência 94, conversão 92. Performance e escalabilidade não foram novamente medidas nesta correção; os resultados e limites anteriores continuam descritos acima. Campos rotulados, ajuda associada e erro com role=alert, sem diálogo nativo bloqueante.

## Cartão digital — 20/10/2026

Endereço: https://links.sammac.ao. Commit de implementação c594b4b; publicação automática Vercel confirmada no estado do commit GitHub e no navegador público. DNS A 76.76.21.21, TTL 300, configurado no Zone Editor cPanel.

Verificação realizada:
- Build Next.js de produção, lint e TypeScript aprovados; zero segredos locais encontrados nos ficheiros enviados ao Git.
- Cartão testado em 320, 390, 768, 1024 e 1440 px, com imagens carregadas, sem overflow e com um único main.
- Cinco destinos de plataformas comparados com os endereços fornecidos; WhatsApp/telefone/e-mail configurados.
- Cópia real para clipboard, feedback, partilha por alternativa de cópia e download de SAMMAC.vcf aprovados. Partilha nativa e importação na agenda devem ser experimentadas num dispositivo real; o navegador de laboratório verificou a alternativa e o ficheiro.
- Rewrite por hostname aprovado. Oito páginas institucionais, navegação móvel e resposta 401 da API administrativa sem sessão confirmadas.
- Produção HTTPS: raiz do subdomínio, vCard, imagem Open Graph e site principal com resposta 200. Botões móveis de pelo menos 44 px; cópia do link e ausência de erros JavaScript confirmadas.
- Evidências locais em output/playwright/cartao-online-desktop.png, cartao-online-mobile.png e lighthouse-card.json (ignoradas pelo Git).

Scorecard do cartão (0–100): UX 95, UI 94, acessibilidade 100, desempenho 91, consistência 95, conversão 94, escalabilidade 94. Acessibilidade e desempenho são medições Lighthouse; os demais são avaliação de implementação e browser. Classificação: Production Ready.

Lighthouse mobile sobre build local: desempenho 91, acessibilidade 100, boas práticas 100 e SEO 100; LCP 3,1 s, CLS 0 e TBT 190 ms. A primeira recolha falhou por NO_NAVSTART; a segunda terminou sem erro. O desempenho fica abaixo da meta 95 e LCP 2,5 s: o próximo ajuste deve concentrar-se no elemento LCP identificado no relatório e validar o ganho no alojamento real. Não representa medição de utilizadores reais nem aprovação de todas as tecnologias assistivas.

Próximo passo: colocar https://links.sammac.ao nas bios e assinaturas do centro.
