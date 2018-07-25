FROM frolvlad/alpine-oraclejdk8:slim
RUN apk add --update curl
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar --logging.file=/app.log"]

