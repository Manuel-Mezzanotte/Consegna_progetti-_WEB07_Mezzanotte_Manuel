# WEB07 - Progetti JavaScript

## Indice
1. [Task 1: Task Manager](#task-1-task-manager)
2. [Task 2: Cronometro Digitale](#task-2-cronometro-digitale)
3. [Task 3: App Meteo](#task-3-app-meteo)

---

## Task 1: Task Manager

### Descrizione
Un'applicazione di gestione attività (To-Do List) che permette agli utenti di creare, visualizzare, modificare ed eliminare attività. L'applicazione memorizza le attività nel localStorage del browser per mantenere i dati tra le sessioni.

### Modalità di utilizzo
1. Aggiungi un'attività digitando il testo nell'input e cliccando "Aggiungi" o premendo Invio
2. Visualizza le attività nella lista
3. Elimina un'attività cliccando sul pulsante "Elimina" accanto ad essa

### Funzionalità aggiuntive (versione avanzata)
- Filtraggio attività per stato (Da fare, In corso, Completata)
- Ricerca testuale tra le attività
- Modifica di attività esistenti con possibilità di cambiare stato
- Badge colorati per indicare lo stato dell'attività


#### Principali funzioni

```javascript

function showMessage(text, type = 'error') { /* ... */ }

/**
 * Carica le attività dal localStorage
 */
function loadTasks() { /* ... */ }

/**
 * Salva le attività nel localStorage
 */
function saveTasks() { /* ... */ }

/**
 * Aggiunge una nuova attività
 */
function addTask() { /* ... */ }

/**
 * Elimina un'attività
 * @param {number} taskId - ID dell'attività da eliminare
 */
function deleteTask(taskId) { /* ... */ }

/**
 * Renderizza le attività nella lista
 * @param {string} [searchText=''] - Testo per filtrare le attività (versione avanzata)
 */
function renderTasks(searchText = '') { /* ... */ }
```

---

## Task 2: Cronometro Digitale

### Descrizione
Un'applicazione cronometro che permette di misurare il tempo trascorso con funzioni di avvio, arresto e reset.

### Modalità di utilizzo
1. Premi "Start" per avviare il cronometro
2. Premi "Stop" per fermare il cronometro
3. Premi "Reset" per azzerare il cronometro

#### Principali funzioni e oggetti
```javascript
/**
 * Gestisce la logica di temporizzazione del cronometro
 * Utilizza setInterval per aggiornare il display 
 */

/**
 * @function startTimer
 * @description Avvia il cronometro creando un intervallo che aggiorna il display
 */

/**
 * @function stopTimer
 * @description Ferma il cronometro cancellando l'intervallo attivo
 */

/**
 * @function resetTimer
 * @description Azzera tutti i valori del cronometro e aggiorna il display
 */

/**
 * @function updateDisplay
 * @description Aggiorna l'interfaccia utente con il tempo attuale
 */
```

---

## Task 3: App Meteo

### Descrizione
Un'applicazione che mostra le condizioni meteorologiche attuali per una località specifica utilizzando l'API di Open-Meteo.

### Modalità di utilizzo
1. Visualizza automaticamente le condizioni meteo di Rovereto all'avvio
2. Premi "Aggiorna" per ottenere i dati meteo più recenti


#### Principali funzioni

```javascript
/**
 * Recupera i dati meteo da Open-Meteo API
 * @param {number} lat - Latitudine della località
 * @param {number} lon - Longitudine della località
 * @returns {Promise<Object>} Dati meteo correnti
 */
async function getWeather(lat, lon) { /* ... */ }

/**
 * Visualizza i dati meteo nell'interfaccia utente
 * @description Recupera i dati meteo e aggiorna l'interfaccia con le informazioni
 * @throws {Error} Se si verificano problemi durante il recupero o l'elaborazione dei dati
 */
async function showWeather() { /* ... */ }

/**
 * Converte la temperatura da Celsius a Fahrenheit
 * @param {number} celsius - Temperatura in gradi Celsius
 * @returns {number} Temperatura in gradi Fahrenheit
 */
function celsiusToFahrenheit(celsius) { /* ... */ }

/**
 * Determina l'icona meteo appropriata in base alle condizioni
 * @param {number} weatherCode - Codice meteo secondo la classificazione Open-Meteo
 * @returns {string} Nome dell'icona da visualizzare
 */
function getWeatherIcon(weatherCode) { /* ... */ }
```

---

## Note di sviluppo

- Tutti i progetti utilizzano JavaScript vanilla senza framework esterni
- I dati persistenti sono memorizzati nel localStorage del browser
- La gestione degli errori è implementata con try/catch e messaggi utente

---

Sviluppato da Mezzanotte Manuel - WEB07
