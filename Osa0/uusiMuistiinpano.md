:::mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Write content to text field + [save]-button pressed

    browser->>server: POST (302) https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of browser: form data is send with HTTP POST
    Note left of server: Status Code: 302 Found => Add new note to notes
    server-->>browser: redirect new GET https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: updated notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: updated JSON-file
    deactivate server
    
    Note right of browser: Show updated content
:::