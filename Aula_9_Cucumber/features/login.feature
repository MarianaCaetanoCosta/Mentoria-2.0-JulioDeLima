Feature: Login

    Scenario Outline: Login com sucesso
        Given que esteja na pagina de login
        When realizo login com as seguintes credenciais
            | usuario | julio.lima |
            | senha   | 123456     |
        Then sou redirecionado para pagina inicial
    
    Examples:
        | usuario | senha |
        | julio.lima  | 123456  |
        | junior.lima  | 123456  |