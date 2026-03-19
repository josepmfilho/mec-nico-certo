

## Problema

A Landing page tem CTAs apontando para rotas inexistentes (`/cadastro/oficina`, `/cadastro/mecanico`, `/sobre`, `/termos`, `/privacidade`). O App.tsx só tem `/register`.

## Plano

### 1. Criar rotas de cadastro específicas por perfil

- Adicionar `/cadastro/oficina` e `/cadastro/mecanico` no `App.tsx`, ambos renderizando o componente `Register` mas passando o role pré-selecionado via prop ou URL param
- Alternativa mais simples: redirecionar `/cadastro/oficina` → `/register?role=oficina` e `/cadastro/mecanico` → `/register?role=mecanico`

### 2. Atualizar Register.tsx

- Ler o query param `role` da URL e pré-selecionar o perfil correspondente automaticamente

### 3. Criar páginas placeholder para rotas faltantes

- `/sobre` → página "Sobre" com o texto da história do fundador
- `/termos` e `/privacidade` → páginas placeholder simples

### 4. Registrar todas as novas rotas no App.tsx

Adicionar as rotas: `/cadastro/oficina`, `/cadastro/mecanico`, `/sobre`, `/termos`, `/privacidade`

### Arquivos modificados
- `src/App.tsx` — novas rotas
- `src/pages/Register.tsx` — ler role da URL
- `src/pages/Sobre.tsx` — nova página
- `src/pages/Termos.tsx` — nova página
- `src/pages/Privacidade.tsx` — nova página

