# arbeitsstunden-frontend
Das Arbeitsstunden-Frontend ist eine Web Oberfläche für die Arbeitsstundendatenbank.
Die Seite ist dabei in React geschrieben und wird im Container per nginx ausgeliefert.

# Container deployen
Das Package im Repo kann ohne Einschränkungen im Produktivbetrieb des ASV eingesetzt werden. Es müssen hier keine Env Variablen gesetzt werden, da diese als .env File Teil des Container sind.
Die entsprechende Datei heißt hier `.env.production`.

Sollte das Frontend in einer anderen Umgebung eingesetzt werden, muss das File angepasst werden und der Container neu gebaut.

# Local bauen
Das Package kann auch local außerhalb eines Containers gestartet werden. Dafür müssen vor dem Start die Librarys installiert werden: `yarn install`

start:
`yarn start`
