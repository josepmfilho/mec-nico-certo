## Problema

A tela de aprovação mostra apenas nome e e-mail — não exibe os dados que o mecânico preencheu no cadastro (CPF, WhatsApp, especialidades, experiência, localização, foto, chave PIX). Sem isso, o admin não consegue analisar o perfil.

## Plano

### 1. Salvar dados completos do cadastro no localStorage

No `CadastroMecanico.tsx`, ao fazer `register()`, salvar também os dados extras (CPF, WhatsApp, experiência, especialidades, CEP, cidade, raio, chave PIX) no objeto do usuário dentro do storage.

### 2. Redesenhar a tela AdminAprovacao

Substituir os cards simples por um layout com **ficha completa do candidato**:

- **Dados pessoais**: Nome, CPF, WhatsApp, E-mail, Anos de experiência
- **Localização**: CEP, Cidade, Raio de atendimento
- **Especialidades**: Lista de badges com as skills selecionadas
- **Dados de pagamento**: Tipo e chave PIX
- **Foto de perfil**: Placeholder ou foto enviada
- **Ações**: Botão "Aprovar", "Solicitar documentos" e "Reprovar"

### 3. Adicionar botão "Solicitar documentos"

- Ao clicar, abre modal pedindo quais documentos faltam (ex: RG, CNH, comprovante de endereço, certificados)
- Registra status como "Documentos pendentes" no localStorage
- Toast de confirmação

### Arquivos modificados
- `src/pages/cadastro/CadastroMecanico.tsx` — salvar dados extras
- `src/pages/admin/AdminAprovacao.tsx` — redesenhar com ficha completa
- `src/contexts/AuthContext.tsx` — expandir tipo User com campos opcionais
