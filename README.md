# arbeitsstunden-frontend
Das Arbeitsstunden-Frontend ist eine Web Oberfläche für die Arbeitsstundendatenbank.
Die Seite ist dabei in React geschrieben und wird im Container per nginx ausgeliefert.

# Anbindung an Keycloak 
Die Website ist so configuriert das jedes aufrufen nur mit Keycloak Token angenommen wird. Ist dieser nicht im Browser gesetzt wird der Nutzer zu entsprechenden Seite umgeleitet.

**OHNE COOKIE KÖNNEN KEINE DATEN VOM BACKEND GEZOGEN WERDEN**

# Container deployen
Das Package im Repo kann ohne Einschränkungen im Produktivbetrieb des ASV eingesetzt werden. Es müssen hier keine Env Variablen gesetzt werden, da diese als .env File Teil des Container sind.
Die entsprechende Datei heißt hier `.env.production`.

Sollte das Frontend in einer anderen Umgebung eingesetzt werden, muss das File angepasst werden und der Container neu gebaut.

## ZU BEACHTEN
Da das Frontend nur als "Frontend" fürs Backend fungiert muss selbstverständlich das [Backend](https://github.com/ASV-Aachen/arbeitsstunden-backend) mit gestartet werden. Das Tool ist dabei darauf ausgelegt das das Frontend unter der Subdomain `/arbeitsstunden` aufrufbar ist und das Backend unter `/arbeitsstunden/api`.
Dies kann mit einem Proxy wie Treaefik oder NginX für Docker Netze eingerichtet werden. In Kubernetes Clustern sollte der Ingres Controller entsprechend configuriert werden.

# Local bauen
Das Package kann auch local außerhalb eines Containers gestartet werden. Dafür müssen vor dem Start die Librarys installiert werden: `yarn install`

start:
`yarn start`
