:::mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Input-field content added + [save]-button
    Note right of browser: JS-file: update JSON-file
    browser->>server: https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: JSON-file updated
    server-->>browser: POST 201 created
    deactivate server

:::