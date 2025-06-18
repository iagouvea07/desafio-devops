#2 - Versao do NodeJS muito antiga (15) onde acabaou parando de receber suporte, sendo a versao mais antiga com suporte a versão 18
# doc: https://nodejs.org/en/about/previous-releases

### iniciando o docker-compose, o build foi iniciado, porem a instalacao dos pacotes nao foi bem sucedido retornando diversos erros 404.
### validando sua estrutura, o ponto que mais me chamou a atencao foi a versao do NodeJS usada, referenciando a versao 15, que é uma versão defasada, sem suporte e com muitos riscos de vulnerabilidade
### portanto, fiz a troca dessa versão para utilizar a 20, sendo uma com suporte até 2026 e que fornece apenas atualizações de segurança

FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# 3 - Sem pacotes instalados na aplicacao, adicionado esse step para instalar pacotes
RUN npm install

EXPOSE 3000
