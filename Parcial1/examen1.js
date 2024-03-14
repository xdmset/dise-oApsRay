const url = 'https://jsonplaceholder.typicode.com/todos';
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function fetchData() {
    const response = await fetch(url);
    return await response.json();
}

function mostrarTodos(todosList, idKey = 'id', extraKey = 'title') {
    todosList.forEach(todo => {
        const status = todo.completed ? 'Completado' : 'No completado';
        console.log(`ID: ${todo[idKey]}, ${extraKey}: ${todo[extraKey]}`);
    });
}

async function displayMenu() {
    const todos = await fetchData();

    console.log('----- Menú -----');
    console.log('1. Mostrar todos los pendientes (solo IDs)');
    console.log('2. Mostrar todos los pendientes (IDs y Titles)');
    console.log('3. Mostrar todos los pendientes No completados (ID y Title)');
    console.log('4. Mostrar todos los pendientes Completados (ID y Title)');
    console.log('5. Mostrar todos los pendientes (IDs y userID)');
    console.log('6. Mostrar todos los pendientes Sin completar (ID y userID)');
    console.log('7. Mostrar todos los pendientes Completados (ID y userID)');
    console.log('0. Salir');

    rl.question('Seleccione una opción: ', (opcion) => {
        switch (opcion) {
            case '1':
              console.log('Lista de todos los pendientes (solo IDs):');
              todos.forEach(todo => console.log(todo.id));
                break;
            case '2':
                console.log('Lista de todos los pendientes (IDs y Titles):');
                mostrarTodos(todos);
                break;
            case '3':
                console.log('Lista de todos los pendientes sin resolver (ID y Title):');
                mostrarTodos(todos.filter(todo => !todo.completed));
                break;
            case '4':
                console.log('Lista de todos los pendientes resueltos (ID y Title):');
                mostrarTodos(todos.filter(todo => todo.completed));
                break;
            case '5':
                console.log('Lista de todos los pendientes (IDs y userID):');
                mostrarTodos(todos, 'id', 'userId');
                break;
            case '6':
                console.log('Lista de todos los pendientes sin resolver (ID y userID):');
                mostrarTodos(todos.filter(todo => !todo.completed), 'id', 'userId');
                break;
            case '7':
                console.log('Lista de todos los pendientes resueltos (ID y userID):');
                mostrarTodos(todos.filter(todo => todo.completed), 'id', 'userId');
                break;
            case '0':
                console.log('Adiós.');
                rl.close();
                break;
            default:
                console.log('Opción no válida. Por favor, elige una opción del 0 al 7.');
                break;
        }

        if (opcion !== '0') {
            displayMenu();
        }
    });
}

// Inicia el menú
displayMenu();
