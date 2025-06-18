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


#### continua ####