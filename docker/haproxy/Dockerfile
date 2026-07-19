FROM haproxy:2.9-alpine

USER root

RUN apk add --no-cache dos2unix

COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
RUN dos2unix /usr/local/etc/haproxy/haproxy.cfg

USER haproxy

CMD ["haproxy", "-W", "-db", "-f", "/usr/local/etc/haproxy/haproxy.cfg"]