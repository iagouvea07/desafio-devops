# Passo a passo de resolução - Desafio Devops #

O objetivo dessa documentação é referenciar todo o passo a passo no processo de resolução de problemas no desafio proposto, apontando todos os processos realizados, impeditivos e a linha de pensamento em todo o fluxo para resolver todos os problemas referente a aplicação, tornando a mesma disponível e funcional.


## Docker compose ##

Para visualizar o comportamento da aplicação utilizei o seguinte comando para iniciar os containers

```bash
docker-compose up -d
```

- Ao iniciar as aplicacoes pelo docker compose, percebi uma mensagem de erro no docker-compose informando erro na parte de network dos containers
- Com isso, checando o manifesto do compose, vi que as imagens estavam referenciando a network node-network, podem nao estava declarada para criacao
- Portanto adicionei esse recurso para ser criado junto as aplicacoes, e com isso ele avançou para a faze de build das imagens


## Docker Images ##

- Quando o processo de build começou, todas as imagens finalizaram com sucesso, com exeção da *app*, onde apresentou falha ao realizar o processo de apt-get update, retornando diversos erros 404
- Validando a estrutura da imagem, o ponto que mais me chamou a atencao foi a versao do NodeJS usada, referenciando a versao 15, que é uma versão defasada, sem suporte e com muitos riscos de vulnerabilidade
- Portanto, fiz a troca dessa versão para utilizar a 20, sendo uma com suporte até 2026 e que fornece apenas atualizações de segurança
- Após os ajustes, executei o docker-compose novamente, e o processo de build finalizou com sucesso, e os containers foram iniciados

## Aplicação NodeJS ##

### MODULES NOT FOUND ###
- Resolvendo e buildando a imagem, percebi que o contaienr "app" nao funcionava.
- Checando os logs do container, foi mencionado que a api não encontrava diversos Modulos
- Como vi que durante o processo de build nao havia nenhum processo de intalacao das bibliotecas, adicionei um npm install para resolver esse ponto
- Ajustando esse ponto, as bibliotecas foram instaladas e a aplicação deixou de apresentar esse erro

### Connection Timed out com MySQL ###
- Com a aplicação iniciada vi que a api não conseguir estabelecer comunicação com o banco de dados, dando um processo de timeout
- O primeiro ponto que fui observar eram se as credenciais que a aplicação utiliza para se comunicar estavam corretos, fiz a confirmação e estava ok, onde ele referenciavam valores do .env ou referenciavam o nome do container diretamente
- Com isso, fui checar o container em execução, e a primeira coisa que notei foi que ele não tinha sua porta (3306) exposta, o que impedia a aplicação a alcançar o serviço
- Após o ajuste, a aplicação iniciou sem erros

### Erro ao consultar usuários ###

- Com a api em execução, testei para validar se tudo estava 100%, contudo apresentou erro na solicitação GET
- No log do NodeJS, ele apontava erro em uma função onde ele tentava percorrer um valor que deveria ser um Array, mas está como undefined
- Devido a isso, adicionei um *console.log(_)* logo apos o insert do usuário, para validar que a operação estava sendo feita corretamente, mas retornou que o schema do banco não existia
- Portanto, ajustei o nome do banco de dados na aplicação com o nome correto do schema criado, e a soliticação GET da api funcionou corretamente


## Proxy Reverso NGINX ##

### Copia do arquivo de configuração para a imagem ###
- Acessando o nginx pela porta 8080, verifiquei que a unica coisa que aparecia era uma pagina padrão da ferramenta
- Com isso, fui validar o Dockerfile para entender como era o processo de build da imagem
- Mas quando vi, percebi que não havia nenhuma outra instrução além da referencia da imagem do NGINX, ou seja, ele estava ignorando qualquer parametrização customizada presente no nginx.conf do repositório
- Portanto, adicionei uma instrução de COPY, referenciando o nginx.conf para substituir o arquivo /etc/nginx/conf.d/default.com, alterando assim seu comportamento


### Redirecionamento para a API ###
- Após o ajuste do arquivo, o redirecionamento ainda não estava 100, porque agora a aplicação passou a apresentar um **Bad Gateway** na requisição
- Com isso, fui validar o arquivo nginx.conf para verificar quais as configurações estavam presentes, e verifiquei que tratava-se de um proxy reverso, redirecionando para a api
- Contudo, verifiquei que o proxy reverso estava usando a porta padrão http (80), o que não é o correto para esse cenário
- Portanto, alterei a porta do endpoint para 3000, para que fosse possível realizar o direcionamento correto, e com isso, o proxy reverso passou a funcionar como o esperado.
