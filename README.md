# Sistema de Gerenciamento de Dados Pessoais

Uma aplicação web simples desenvolvida com Django no backend e React no frontend para importação, gerenciamento e edição de dados pessoais através de planilhas Excel.

## Funcionalidades

- **Importação de Planilhas**: Suporte a arquivos Excel (.xlsx, .xls)
- **Gerenciamento de Dados**: Armazena informações de nome, idade, email e data de nascimento
- **Edição em Tempo Real**: Interface intuitiva para editar dados diretamente na tabela
- **Persistência**: Dados salvos no banco de dados Django
- **Interface Responsiva**: Design moderno e adaptável para diferentes dispositivos

## Tecnologias Utilizadas

### Backend
- **Python**
- **Django**
- **Django REST Framework**
- **Pandas** - Processamento de planilhas Excel
- **SQLite3** - Banco de dados

### Frontend
- **React**
- **Axios** - Cliente HTTP
- **XLSX** - Leitura de arquivos Excel no frontend

## Como Executar o Projeto

### Pré-requisitos
- Python 3.8 ou superior
- Node.js 16 ou superior
- pip (gerenciador de pacotes Python)
- npm ou yarn


## Modelo da Planilha Excel para Importação

| nome | idade | email | data_nascimento |
|------|-------|-------|-----------------|
| João Silva | 30 | joao.silva@email.com | 1993-05-15 |
| Maria Oliveira | 25 | maria.oliveira@email.com | 1998-08-22 |
| Pedro Santos | 35 | pedro.santos@email.com | 1988-12-10 |
| Ana Costa | 28 | ana.costa@email.com | 1995-03-17 |