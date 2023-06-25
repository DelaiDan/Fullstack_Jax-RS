# Cavalo-Opaco.com

## Aplicação Fullstack com Back-End JAX-RS

### Features

- [x] CRUD de Veículos
- [x] CRUD de Marcas

### Rodando o Banco de Dados
# Conteinerizado em Docker
<p>Execute o comando 'docker compose up' na pasta do projeto (local do arquivo docker-compose.yml)</p>
<p>Configuradas portas <strong>5432</strong> para o Postgre e <strong>8080</strong> para o Adminer (interface gráfica para gerenciar o Banco de Dados Postgre)</p>
</br>
<p>Em execução no Docker, entre em <a href="localhost:8080">localhost:8080</a> e insira as informações indicadas no 'docker-compose.yml'</p>
<p>Por padrão (configurado dentro de 'docker-compose.yml'):</p>
<ul>
    <li>Sistema: PostgreSQL</li>
    <li>Servidor: postgres</li>
    <li>Usuário: user</li>
    <li>Senha: password</li>
    <li>Base de Dados: trabalhoJAVA</li>
</ul>

<p>Importe o arquivo <strong>Postgre.sql</strong> contido aqui para ter a estrutura e algumas informações cadastradas!</p>