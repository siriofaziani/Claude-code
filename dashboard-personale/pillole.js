/* Quartier Generale · Libreria del «Generatore di Sapere»
   Ogni pillola: id unico, settore, titolo, sottotitolo, 3 paragrafi, una curiosità, un'applicazione pratica e 3 domande di verifica.
   Settori: cinema · economia · ai · storia · mindset · geo
   Per aggiungere pillole basta inserire nuovi oggetti con un id mai usato: quelle già lette restano registrate per id. */
window.QG_PILLS = [

/* ============================== CINEMA & ARTE ============================== */
{
  id: "cin-01", sector: "cinema",
  title: "L'effetto Kuleshov: il significato nasce dal montaggio",
  kicker: "Perché due immagini accostate raccontano più di una sola",
  body: [
    "Negli anni Venti il regista sovietico Lev Kuleshov fece un esperimento diventato leggendario. Prese un primo piano neutro dell'attore Ivan Mozžuchin e lo montò accanto a immagini diverse: un piatto di minestra, una bambina in una bara, una donna sdraiata su un divano. Il volto dell'attore era sempre lo stesso fotogramma.",
    "Il pubblico, però, giurava di vedere emozioni diverse: fame davanti alla minestra, dolore davanti alla bara, desiderio davanti alla donna. Il significato non era nell'inquadratura, ma nella relazione tra le inquadrature. È la base teorica del montaggio cinematografico moderno: lo spettatore completa da solo ciò che vede, proiettando aspettative e contesto.",
    "Da Hitchcock, che spiegava l'effetto nelle interviste, fino ai trailer di oggi, il principio è ovunque. Un'immagine identica può comunicare messaggi opposti a seconda di cosa le metti accanto: musica, testo, inquadratura successiva. Il cervello non registra, interpreta."
  ],
  curiosity: "Alcuni studiosi dubitano che l'esperimento originale sia andato esattamente come raccontato e le pellicole sono andate perdute. Repliche moderne hanno comunque misurato un effetto reale, anche se più sottile del mito.",
  apply: "Nel tuo lavoro il contesto è il montaggio: lo stesso sito sembra più prezioso se lo presenti accanto al problema che risolve (clienti persi, telefonate durante il servizio) invece che da solo come «un sito».",
  quiz: [
    { q: "Cosa cambiava tra le versioni dell'esperimento di Kuleshov?", o: ["L'espressione dell'attore", "L'immagine montata accanto al volto", "La musica di sottofondo"], a: 1, why: "Il volto era sempre lo stesso fotogramma: cambiava solo l'immagine accostata." },
    { q: "Qual è la lezione principale dell'effetto?", o: ["Il significato nasce dall'accostamento delle immagini", "Gli attori professionisti recitano meglio", "Il bianco e nero è più espressivo"], a: 0, why: "Lo spettatore costruisce il senso mettendo in relazione le inquadrature." },
    { q: "Come lo applichi a una proposta commerciale?", o: ["Mandando solo il preventivo", "Accostando la soluzione al problema concreto del cliente", "Usando più colori nel PDF"], a: 1, why: "Il contesto cambia la percezione del valore, proprio come nel montaggio." }
  ]
},
{
  id: "cin-02", sector: "cinema",
  title: "Il Neorealismo: il cinema italiano che cambiò il mondo",
  kicker: "Attori presi dalla strada, città vere, storie di tutti i giorni",
  body: [
    "Alla fine della Seconda guerra mondiale gli studi di Cinecittà erano danneggiati e mancavano soldi e mezzi. Registi come Roberto Rossellini, Vittorio De Sica e Luchino Visconti trasformarono il limite in uno stile: girare nelle strade, con luce naturale e spesso con attori non professionisti.",
    "«Roma città aperta» (1945) di Rossellini, girato in una città appena liberata, e «Ladri di biciclette» (1948) di De Sica, con un operaio vero nel ruolo del protagonista, raccontavano la povertà, la dignità e le piccole tragedie quotidiane. Niente eroi da copertina: la realtà stessa diventava il racconto.",
    "L'influenza fu enorme. La Nouvelle Vague francese, il nuovo cinema indiano di Satyajit Ray e gran parte del cinema indipendente devono molto a quella lezione: autenticità, sguardo umano e budget ridotti possono battere le grandi produzioni se la storia è vera."
  ],
  curiosity: "«Ladri di biciclette» vinse un Oscar onorario come miglior film straniero quando la categoria ufficiale non esisteva ancora: fu istituita solo nel 1956.",
  apply: "Il Neorealismo insegna che i vincoli possono diventare uno stile. Un sito con foto vere dell'attività, del titolare e dei clienti spesso vende più di uno pieno di immagini stock patinate.",
  quiz: [
    { q: "Quale film di Rossellini è simbolo del Neorealismo?", o: ["La dolce vita", "Roma città aperta", "Il Gattopardo"], a: 1, why: "«Roma città aperta» (1945) è uno dei manifesti del movimento." },
    { q: "Una caratteristica tipica del Neorealismo?", o: ["Effetti speciali spettacolari", "Riprese in studio con divi famosi", "Riprese in esterni e attori non professionisti"], a: 2, why: "Strade vere, luce naturale e persone comuni erano il cuore dello stile." },
    { q: "Quale movimento ne fu fortemente influenzato?", o: ["La Nouvelle Vague francese", "Il cinema muto americano", "L'espressionismo tedesco degli anni Dieci"], a: 0, why: "I giovani critici-registi francesi presero il Neorealismo come modello." }
  ]
},
{
  id: "cin-03", sector: "cinema",
  title: "Caravaggio: la luce che taglia il buio",
  kicker: "Il chiaroscuro drammatico che ha ispirato pittori e direttori della fotografia",
  body: [
    "Michelangelo Merisi, detto Caravaggio (1571-1610), rivoluzionò la pittura con un uso estremo della luce: figure che emergono da fondi quasi neri, illuminate da un fascio laterale che scolpisce volti e mani. Questa tecnica, chiamata tenebrismo, porta il chiaroscuro al massimo contrasto.",
    "Nella «Vocazione di San Matteo», nella chiesa di San Luigi dei Francesi a Roma, un raggio di luce entra dall'alto e accompagna il gesto di Cristo verso Matteo, seduto tra uomini vestiti come i romani dell'epoca. Caravaggio usava persone del popolo come modelli: santi con i piedi sporchi, scene sacre ambientate in taverne.",
    "Il suo stile creò una scuola, i «caravaggeschi», diffusa in tutta Europa. Secoli dopo, direttori della fotografia e registi come Martin Scorsese hanno citato apertamente Caravaggio come riferimento per l'illuminazione drammatica: luce che guida lo sguardo e racconta la storia."
  ],
  curiosity: "Caravaggio ebbe una vita turbolenta: nel 1606 fuggì da Roma dopo aver ucciso un uomo durante una rissa e passò gli ultimi anni tra Napoli, Malta e la Sicilia.",
  apply: "La luce di Caravaggio guida l'occhio sul punto chiave. Nel design di un sito fai lo stesso: un solo elemento davvero illuminato (il pulsante «Prenota») e tutto il resto più in ombra.",
  quiz: [
    { q: "Come si chiama lo stile di forte contrasto luce-ombra di Caravaggio?", o: ["Sfumato", "Tenebrismo", "Puntinismo"], a: 1, why: "Il tenebrismo spinge il chiaroscuro all'estremo, con fondi quasi neri." },
    { q: "Dove si trova la «Vocazione di San Matteo»?", o: ["Uffizi, Firenze", "San Luigi dei Francesi, Roma", "Louvre, Parigi"], a: 1, why: "È nella Cappella Contarelli della chiesa di San Luigi dei Francesi." },
    { q: "Chi usava come modelli per i santi?", o: ["Solo nobili e cardinali", "Statue antiche", "Persone comuni del popolo"], a: 2, why: "Il realismo popolare dei modelli fu una delle sue scelte più scandalose." }
  ]
},
{
  id: "cin-04", sector: "cinema",
  title: "La regola dei terzi: comporre un'immagine che respira",
  kicker: "Una griglia invisibile usata da fotografi, registi e designer",
  body: [
    "Immagina di dividere un'inquadratura con due linee orizzontali e due verticali, creando nove riquadri uguali. La regola dei terzi suggerisce di posizionare i soggetti importanti lungo queste linee o nei quattro punti in cui si incrociano, invece che al centro esatto.",
    "Il termine fu coniato nel 1797 dall'incisore inglese John Thomas Smith, parlando di paesaggi: un orizzonte su un terzo dell'immagine risulta più dinamico di uno che la taglia a metà. Al cinema la regola è ovunque: gli occhi del personaggio su una linea alta, lo spazio libero davanti al suo sguardo (il cosiddetto «aria» o «lead room»).",
    "Non è una legge assoluta: Wes Anderson, per esempio, costruisce il suo stile proprio sulla simmetria centrale. Ma conoscere la regola permette di romperla con intenzione. È uno strumento per creare tensione, equilibrio e movimento anche in un'immagine ferma."
  ],
  curiosity: "La griglia dei terzi è così diffusa che quasi tutte le fotocamere degli smartphone permettono di sovrapporla al mirino dalle impostazioni.",
  apply: "Usa la griglia anche nei siti che crei: titolo e pulsante principale sul terzo sinistro, immagine forte sul terzo destro. L'occhio legge in modo naturale e la pagina sembra più professionale.",
  quiz: [
    { q: "Quante parti crea la griglia della regola dei terzi?", o: ["Quattro", "Sei", "Nove"], a: 2, why: "Due linee orizzontali e due verticali dividono l'immagine in nove riquadri." },
    { q: "Dove conviene posizionare il soggetto secondo la regola?", o: ["Sempre al centro esatto", "Lungo le linee o sui loro incroci", "Nell'angolo in basso"], a: 1, why: "Le linee e i punti di intersezione rendono la composizione più dinamica." },
    { q: "Quale regista è noto per preferire la simmetria centrale?", o: ["Wes Anderson", "Federico Fellini", "Sergio Leone"], a: 0, why: "Wes Anderson costruisce molte inquadrature perfettamente simmetriche." }
  ]
},
{
  id: "cin-05", sector: "cinema",
  title: "Il MacGuffin di Hitchcock",
  kicker: "L'oggetto che muove tutta la trama ma che, in fondo, non conta",
  body: [
    "Alfred Hitchcock rese famoso il termine MacGuffin, che attribuiva all'amico sceneggiatore Angus MacPhail. È l'oggetto o l'obiettivo che i personaggi inseguono disperatamente: documenti segreti, un gioiello, una formula. Per i protagonisti è vitale; per lo spettatore è solo il pretesto per far partire la storia.",
    "In «Notorious» (1946) il MacGuffin è dell'uranio nascosto in bottiglie di vino; in «Psyco» (1960) sono i soldi rubati da Marion Crane, che spariscono dalla storia quando la trama prende tutt'altra direzione. Hitchcock sosteneva che la natura precisa del MacGuffin fosse irrilevante: contano tensione, personaggi e relazioni.",
    "Il concetto è sopravvissuto ben oltre Hitchcock: la valigetta luminosa di «Pulp Fiction», di cui non scopriamo mai il contenuto, è un omaggio esplicito. Una buona storia si regge sui desideri dei personaggi, non sull'oggetto in sé."
  ],
  curiosity: "Hitchcock raccontava una barzelletta per spiegarlo: due viaggiatori in treno, uno chiede cosa sia il pacco sul portabagagli. «Un MacGuffin, serve a catturare i leoni sulle montagne scozzesi». «Ma in Scozia non ci sono leoni!». «Allora non è un MacGuffin».",
  apply: "Nelle trattative il «sito web» è spesso il MacGuffin: quello che il cliente desidera davvero sono più prenotazioni, meno telefonate, più rispetto dai concorrenti. Parla del desiderio, non dell'oggetto.",
  quiz: [
    { q: "Cos'è un MacGuffin?", o: ["Un tipo di inquadratura", "L'oggetto che muove la trama ma che conta poco in sé", "Il colpo di scena finale"], a: 1, why: "È il pretesto che spinge i personaggi ad agire." },
    { q: "Qual è il MacGuffin in «Notorious»?", o: ["Uranio nascosto in bottiglie di vino", "Un diamante rubato", "Una lettera d'amore"], a: 0, why: "Le bottiglie di vino contenevano sabbia di uranio." },
    { q: "Secondo Hitchcock, cosa conta davvero in una storia?", o: ["La natura precisa dell'oggetto", "Tensione, personaggi e relazioni", "La durata del film"], a: 1, why: "Per lui il MacGuffin era irrilevante rispetto alla suspense." }
  ]
},
{
  id: "cin-06", sector: "cinema",
  title: "Brunelleschi e l'invenzione della prospettiva",
  kicker: "Come il Rinascimento insegnò a dipingere lo spazio",
  body: [
    "All'inizio del Quattrocento, a Firenze, l'architetto Filippo Brunelleschi realizzò una dimostrazione celebre: una tavoletta dipinta con il Battistero, con un forellino al centro. Guardando attraverso il foro un'immagine riflessa in uno specchio, l'osservatore confrontava il dipinto con l'edificio reale: coincidevano perfettamente.",
    "Era nata la prospettiva lineare: linee parallele che convergono in un unico punto di fuga all'orizzonte. Masaccio la applicò in pittura nella «Trinità» di Santa Maria Novella, mentre Leon Battista Alberti la codificò nel trattato «De pictura» (1435), trasformando un'intuizione in un metodo insegnabile.",
    "Fu una rivoluzione culturale oltre che artistica: lo spazio diventava misurabile e razionale, centrato sullo sguardo umano. Ancora oggi la prospettiva è alla base del disegno architettonico, della fotografia, dei videogiochi e del rendering 3D."
  ],
  curiosity: "Brunelleschi è famoso anche per la cupola di Santa Maria del Fiore, costruita senza le tradizionali impalcature di sostegno grazie a una geniale struttura a doppia calotta.",
  apply: "La prospettiva ha reso replicabile un talento trasformandolo in metodo. Fai lo stesso con il tuo lavoro: scrivi i passaggi di una vendita riuscita, così diventano un processo che puoi ripetere.",
  quiz: [
    { q: "In quale città Brunelleschi fece la sua dimostrazione?", o: ["Venezia", "Firenze", "Milano"], a: 1, why: "La tavoletta raffigurava il Battistero di Firenze." },
    { q: "Chi codificò la prospettiva nel «De pictura»?", o: ["Leon Battista Alberti", "Leonardo da Vinci", "Giotto"], a: 0, why: "Alberti scrisse il trattato nel 1435." },
    { q: "Cos'è il punto di fuga?", o: ["Il punto più luminoso del quadro", "Il punto in cui convergono le linee parallele", "La firma dell'artista"], a: 1, why: "Le parallele in profondità sembrano incontrarsi in quel punto." }
  ]
},

/* ======================= ECONOMIA, FINANZA & MARKETING ======================= */
{
  id: "eco-01", sector: "economia",
  title: "L'interesse composto e la regola del 72",
  kicker: "Il motore silenzioso che moltiplica soldi, abitudini e competenze",
  body: [
    "Con l'interesse semplice guadagni sempre sulla somma iniziale. Con l'interesse composto guadagni anche sugli interessi già maturati: ogni anno la base cresce e la crescita accelera. 1.000 euro al 7% annuo composto diventano circa 1.967 euro dopo 10 anni e circa 7.600 dopo 30.",
    "Esiste una scorciatoia mentale per stimare la velocità: la regola del 72. Dividi 72 per il tasso di rendimento annuo e ottieni quanti anni servono, più o meno, per raddoppiare il capitale. Al 6% servono circa 12 anni, al 9% circa 8. Funziona anche al contrario: un'inflazione del 3% dimezza il potere d'acquisto in circa 24 anni.",
    "Il fattore più potente non è il tasso, ma il tempo. Chi inizia a investire dieci anni prima, anche con cifre piccole, spesso supera chi parte tardi con cifre più grandi. Lo stesso vale per le abitudini: piccoli miglioramenti costanti si sommano e si moltiplicano."
  ],
  curiosity: "La regola del 72 compare già nella «Summa de arithmetica» di Luca Pacioli, pubblicata a Venezia nel 1494.",
  apply: "Applica l'interesse composto alla tua agenzia: un canone di manutenzione mensile per cliente si accumula mese dopo mese. Dieci clienti a 30 euro al mese fanno 3.600 euro l'anno che lavorano mentre ne cerchi di nuovi.",
  quiz: [
    { q: "Cosa rende diverso l'interesse composto?", o: ["Si guadagna anche sugli interessi già maturati", "Il tasso cambia ogni mese", "Si paga solo alla fine"], a: 0, why: "Gli interessi si aggiungono al capitale e producono a loro volta interessi." },
    { q: "Con la regola del 72, al 6% annuo in quanto tempo raddoppi?", o: ["6 anni", "12 anni", "20 anni"], a: 1, why: "72 diviso 6 fa 12." },
    { q: "Qual è il fattore più potente dell'interesse composto?", o: ["Il colore del grafico", "Il tempo", "La banca scelta"], a: 1, why: "Più anni lasci lavorare il capitale, più la crescita accelera." }
  ]
},
{
  id: "eco-02", sector: "economia",
  title: "Il costo opportunità: il prezzo di ciò che non scegli",
  kicker: "Ogni sì nasconde dei no, e anche quelli hanno un costo",
  body: [
    "Il costo opportunità è il valore della migliore alternativa a cui rinunci quando fai una scelta. Se passi un sabato a sistemare da solo la contabilità invece di chiudere una vendita da 800 euro, quel sabato ti è costato 800 euro, anche se non hai speso nulla.",
    "Gli economisti lo considerano il vero costo di ogni decisione, perché tempo, denaro e attenzione sono risorse limitate. Non basta chiedersi «Mi conviene?», bisogna chiedersi «Rispetto a cosa?». Un investimento al 4% sembra buono finché non lo confronti con un'alternativa sicura al 5%.",
    "Il concetto spiega anche perché delegare è spesso razionale: se il tuo tempo vale 40 euro l'ora e puoi pagare qualcuno 15 euro per un compito ripetitivo, fare da solo ti costa 25 euro l'ora di valore perso. Pensare in costi opportunità rende più lucidi su dove mettere la propria energia."
  ],
  curiosity: "Il concetto fu formalizzato dalla scuola austriaca di economia nell'Ottocento: l'espressione «costo opportunità» è attribuita all'economista Friedrich von Wieser.",
  apply: "Quando un lead ti chiede ore di riunioni senza budget, calcola il costo opportunità: quelle ore potevano andare a tre attività pronte a comprare.",
  quiz: [
    { q: "Cos'è il costo opportunità?", o: ["Il prezzo scontato di un prodotto", "Il valore della migliore alternativa a cui rinunci", "Una tassa sulle opportunità"], a: 1, why: "Misura ciò che perdi scegliendo un'opzione al posto di un'altra." },
    { q: "Il tuo tempo vale 40 €/h e delegare costa 15 €/h: quanto «perdi» facendo da solo?", o: ["25 € l'ora", "15 € l'ora", "Niente"], a: 0, why: "40 meno 15 fa 25 euro di valore che potevi generare altrove." },
    { q: "Quale domanda aiuta a ragionare in costi opportunità?", o: ["Mi piace?", "Rispetto a cosa?", "Lo fanno tutti?"], a: 1, why: "Ogni scelta va confrontata con l'alternativa migliore disponibile." }
  ]
},
{
  id: "eco-03", sector: "economia",
  title: "L'effetto esca: come un'opzione inutile cambia le scelte",
  kicker: "Il trucco psicologico dietro i tre pacchetti di prezzo",
  body: [
    "Lo psicologo Dan Ariely racconta nel libro «Prevedibilmente irrazionale» un'offerta dell'Economist: abbonamento solo web a 59 dollari, solo carta a 125 dollari, carta più web a 125 dollari. Nessuno vuole la sola carta, ma quell'opzione cambia tutto: nel suo test con gli studenti l'84% scelse il pacchetto completo.",
    "Quando Ariely tolse l'opzione «solo carta», le scelte si invertirono: il 68% prese il solo web. L'opzione inutile era un'esca (decoy): rendeva il pacchetto completo un affare evidente per confronto. Il cervello non valuta i prezzi in assoluto, ma in relazione alle alternative vicine.",
    "Per questo molte aziende presentano tre livelli di prezzo, con un'opzione costruita apposta per far sembrare conveniente quella che vogliono vendere. Non è un inganno se il pacchetto consigliato è davvero il migliore per il cliente: è aiutarlo a decidere."
  ],
  curiosity: "L'effetto è chiamato anche «effetto di dominanza asimmetrica»: l'esca è dominata da un'opzione ma non dall'altra, e spinge le scelte verso quella che la domina.",
  apply: "Presenta sempre tre opzioni: Base, Consigliato e Premium. Rendi il Consigliato chiaramente migliore del Base per poco in più, e il Premium un'ancora alta.",
  quiz: [
    { q: "Nell'esempio dell'Economist, qual era l'esca?", o: ["Il solo web", "La sola carta a 125 dollari", "Il pacchetto carta più web"], a: 1, why: "Nessuno la sceglieva, ma rendeva conveniente il pacchetto completo." },
    { q: "Cosa succedeva togliendo l'esca?", o: ["Le scelte restavano uguali", "La maggioranza sceglieva il solo web", "Nessuno comprava più"], a: 1, why: "Senza confronto la maggioranza passava all'opzione più economica." },
    { q: "Come lo usi nelle tue proposte?", o: ["Un solo prezzo, prendere o lasciare", "Tre pacchetti con un Consigliato evidente", "Prezzi diversi per ogni cliente senza spiegazioni"], a: 1, why: "Tre livelli guidano la scelta verso il pacchetto migliore." }
  ]
},
{
  id: "eco-04", sector: "economia",
  title: "Inflazione e potere d'acquisto",
  kicker: "Perché 100 euro oggi non valgono 100 euro domani",
  body: [
    "L'inflazione è l'aumento generale dei prezzi nel tempo. Si misura con un «paniere» di beni e servizi tipici (cibo, energia, affitti, trasporti) di cui l'istituto di statistica segue i prezzi. Se il paniere costa il 3% in più rispetto a un anno prima, l'inflazione annua è al 3%.",
    "La Banca Centrale Europea punta a un'inflazione del 2% nel medio termine: abbastanza bassa da non erodere i risparmi, abbastanza alta da evitare la deflazione, che può bloccare consumi e investimenti. Quando l'inflazione sale troppo, la BCE alza i tassi d'interesse per raffreddare l'economia.",
    "L'effetto sui soldi fermi è silenzioso ma forte: con un'inflazione media del 3%, 100 euro tenuti sotto il materasso per dieci anni hanno il potere d'acquisto di circa 74 euro di oggi. Ecco perché la liquidità ferma non è mai davvero «al sicuro»."
  ],
  curiosity: "Nell'iperinflazione della Germania del 1923 i prezzi raddoppiavano in pochi giorni e molte persone usavano le banconote ormai senza valore come carta da parati.",
  apply: "Aggiorna i tuoi prezzi ogni anno: se l'inflazione è al 3% e il tuo listino resta fermo, di fatto ti stai facendo uno sconto. Comunicalo come adeguamento, non come aumento.",
  quiz: [
    { q: "Qual è l'obiettivo di inflazione della BCE?", o: ["0%", "2% nel medio termine", "10%"], a: 1, why: "La BCE punta al 2%, considerato un livello sano." },
    { q: "Cosa fa di solito la BCE se l'inflazione è troppo alta?", o: ["Abbassa i tassi", "Alza i tassi d'interesse", "Stampa più banconote"], a: 1, why: "Tassi più alti raffreddano credito, consumi e prezzi." },
    { q: "Con inflazione al 3% per 10 anni, 100 € fermi valgono circa…", o: ["74 € di oggi", "100 € di oggi", "130 € di oggi"], a: 0, why: "100 diviso 1,03 elevato alla decima fa circa 74." }
  ]
},
{
  id: "eco-05", sector: "economia",
  title: "Le 4P del marketing mix",
  kicker: "Prodotto, Prezzo, Distribuzione, Promozione: la mappa di ogni strategia",
  body: [
    "Nel 1960 il professore americano E. Jerome McCarthy sintetizzò le leve del marketing in quattro P: Product (prodotto), Price (prezzo), Place (distribuzione, cioè dove e come il cliente compra) e Promotion (comunicazione e promozione). Il concetto di «marketing mix» era stato introdotto pochi anni prima da Neil Borden.",
    "La forza del modello è la coerenza: un prodotto premium con un prezzo stracciato confonde, una promozione aggressiva senza un canale di vendita comodo spreca soldi. Le quattro leve devono raccontare la stessa storia. Cambiarne una spesso significa dover ripensare le altre.",
    "Con i servizi e il digitale il modello è stato esteso a 7P aggiungendo People (persone), Process (processi) e Physical evidence (prove tangibili, come recensioni e portfolio). Per un'agenzia queste tre spesso fanno la differenza più del prezzo."
  ],
  curiosity: "Il modello delle 4P ha più di 60 anni ed è ancora il primo schema che si studia in quasi tutti i corsi universitari di marketing.",
  apply: "Analizza la tua offerta con le 4P: prodotto (sito più gestione), prezzo (tre pacchetti), distribuzione (visite di persona e WhatsApp), promozione (portfolio con il prima e dopo e recensioni dei clienti).",
  quiz: [
    { q: "Quali sono le 4P?", o: ["Prodotto, Prezzo, Distribuzione, Promozione", "Piano, Profitto, Persone, Potere", "Prezzo, Pubblicità, Pagamento, Pacco"], a: 0, why: "Product, Price, Place e Promotion." },
    { q: "Chi formulò le 4P nel 1960?", o: ["Philip Kotler", "E. Jerome McCarthy", "Steve Jobs"], a: 1, why: "McCarthy le propose nel suo manuale di marketing." },
    { q: "Quali P si aggiungono nel modello a 7P per i servizi?", o: ["Persone, Processi, Prove tangibili", "Pazienza, Passione, Pubblico", "Packaging, Partner, Premi"], a: 0, why: "People, Process e Physical evidence." }
  ]
},
{
  id: "eco-06", sector: "economia",
  title: "LTV e CAC: quanto vale davvero un cliente",
  kicker: "Le due metriche che separano un'attività che cresce da una che corre a vuoto",
  body: [
    "Il Customer Lifetime Value (LTV) stima quanto margine ti porta un cliente durante tutta la relazione con te. Il Customer Acquisition Cost (CAC) misura quanto ti costa acquisirlo: tempo, spostamenti, pubblicità, sconti. Un'attività sana guadagna molto più dal cliente di quanto spende per conquistarlo.",
    "Una regola pratica diffusa nelle startup è puntare a un rapporto LTV:CAC di almeno 3 a 1. Se ogni cliente ti costa 200 euro per essere conquistato, dovrebbe generare almeno 600 euro di margine nel tempo. Sotto 1 a 1 ogni nuovo cliente ti impoverisce.",
    "Il modo più potente per alzare l'LTV non è alzare il primo prezzo, ma prolungare e allargare la relazione: manutenzione ricorrente, servizi aggiuntivi, rinnovi. Un sito da 900 euro con un canone di 30 euro al mese per tre anni vale 1.980 euro, più del doppio della vendita iniziale."
  ],
  curiosity: "Secondo uno studio spesso citato di Bain & Company, aumentare la fidelizzazione dei clienti del 5% può far crescere i profitti dal 25% al 95%, a seconda del settore.",
  apply: "Calcola il tuo CAC reale contando anche le ore spese nelle trattative. Poi chiediti quali servizi ricorrenti puoi aggiungere per alzare l'LTV di ogni cliente.",
  quiz: [
    { q: "Cosa misura il CAC?", o: ["Il costo per acquisire un cliente", "Il fatturato annuo", "Le tasse da pagare"], a: 0, why: "Customer Acquisition Cost: quanto spendi per conquistare un cliente." },
    { q: "Qual è un rapporto LTV:CAC considerato sano?", o: ["1 a 1", "Almeno 3 a 1", "1 a 3"], a: 1, why: "Il cliente deve rendere almeno tre volte quanto costa acquisirlo." },
    { q: "Sito da 900 € più 30 €/mese per 3 anni: quanto vale il cliente?", o: ["900 €", "1.260 €", "1.980 €"], a: 2, why: "900 più 30 per 36 mesi fa 1.980 euro." }
  ]
},

/* ===================== INTELLIGENZA ARTIFICIALE & INFORMATICA ===================== */
{
  id: "ai-01", sector: "ai",
  title: "Come «pensa» un modello linguistico",
  kicker: "Dietro le risposte di un'IA: previsioni, token e attenzione",
  body: [
    "Un modello linguistico come quelli dietro gli assistenti di intelligenza artificiale è addestrato su enormi quantità di testo per fare una cosa sola, in modo straordinariamente sofisticato: prevedere il pezzo di testo successivo. Il testo viene spezzato in «token», frammenti che possono essere parole intere o parti di parola.",
    "L'architettura che ha reso possibile il salto di qualità si chiama Transformer, presentata nel 2017 da ricercatori di Google nell'articolo «Attention Is All You Need». Il suo meccanismo di attenzione permette al modello di pesare quali parole del contesto sono rilevanti per ciascuna previsione, anche a grande distanza nel testo.",
    "Proprio perché genera il testo più plausibile, un modello può produrre affermazioni sbagliate ma convincenti: le cosiddette «allucinazioni». Per questo l'IA è un potentissimo assistente per scrivere, riassumere e ragionare, ma i fatti importanti vanno sempre verificati su fonti affidabili."
  ],
  curiosity: "Il titolo «Attention Is All You Need» richiama la canzone dei Beatles «All You Need Is Love», ed è diventato uno degli articoli scientifici più citati del secolo.",
  apply: "Usa l'IA per bozze di testi per i siti, idee per i post e analisi della concorrenza, ma verifica sempre dati, orari e prezzi del cliente prima di pubblicarli.",
  quiz: [
    { q: "Cosa fa, in sostanza, un modello linguistico?", o: ["Cerca risposte in un archivio fisso", "Prevede il token successivo del testo", "Copia pagine web parola per parola"], a: 1, why: "Genera il testo prevedendo un frammento alla volta." },
    { q: "Come si chiama l'architettura introdotta nel 2017?", o: ["Transformer", "Pentium", "Blockchain"], a: 0, why: "Il Transformer è alla base dei moderni modelli linguistici." },
    { q: "Cos'è un'«allucinazione» di un'IA?", o: ["Un errore grafico", "Un'affermazione falsa ma convincente", "Un virus informatico"], a: 1, why: "Il modello produce testo plausibile anche quando i fatti sono sbagliati." }
  ]
},
{
  id: "ai-02", sector: "ai",
  title: "Il test di Turing: una macchina può pensare?",
  kicker: "La domanda del 1950 che è ancora al centro del dibattito sull'IA",
  body: [
    "Nel 1950 il matematico britannico Alan Turing pubblicò l'articolo «Computing Machinery and Intelligence». Invece di chiedersi in astratto se una macchina possa pensare, propose un test pratico, il «gioco dell'imitazione»: un giudice dialoga per iscritto con un umano e con una macchina, senza vederli.",
    "Se il giudice non riesce a distinguere in modo affidabile chi è la macchina, quella macchina ha superato il test. L'idea era geniale perché spostava la discussione dalla filosofia al comportamento osservabile: giudichiamo l'intelligenza degli altri da ciò che dicono e fanno, non leggendo nella loro mente.",
    "Il test ha ricevuto molte critiche. Il filosofo John Searle, con l'esperimento mentale della «stanza cinese» (1980), sostenne che manipolare simboli seguendo regole non equivale a capirne il significato. Con i moderni chatbot la domanda di Turing è tornata attualissima."
  ],
  curiosity: "Durante la Seconda guerra mondiale Turing lavorò a Bletchley Park e contribuì in modo decisivo a decifrare i messaggi della macchina tedesca Enigma.",
  apply: "La lezione del test vale anche nel marketing: il cliente giudica dal comportamento visibile. Un sito che risponde subito, chiaro e utile «sembra» un'azienda seria, indipendentemente dalle sue dimensioni.",
  quiz: [
    { q: "In che anno Turing propose il suo test?", o: ["1950", "1985", "2001"], a: 0, why: "Nell'articolo del 1950 «Computing Machinery and Intelligence»." },
    { q: "Come si supera il test di Turing?", o: ["Risolvendo un'equazione", "Se il giudice non distingue la macchina dall'umano", "Battendo un umano a scacchi"], a: 1, why: "Il criterio è l'indistinguibilità nella conversazione." },
    { q: "Quale esperimento mentale criticò il test?", o: ["Il gatto di Schrödinger", "La stanza cinese di Searle", "Il dilemma del prigioniero"], a: 1, why: "Searle sostenne che seguire regole non significa capire." }
  ]
},
{
  id: "ai-03", sector: "ai",
  title: "Machine learning: imparare dai dati",
  kicker: "Supervisionato, non supervisionato e per rinforzo, spiegati semplice",
  body: [
    "Il machine learning è un ramo dell'intelligenza artificiale in cui il computer non riceve regole scritte a mano, ma impara schemi dai dati. Nell'apprendimento supervisionato riceve esempi già etichettati, come migliaia di email marcate «spam» o «non spam», e impara a classificare quelle nuove.",
    "Nell'apprendimento non supervisionato i dati non hanno etichette: l'algoritmo cerca da solo gruppi e somiglianze. È così che un e-commerce può scoprire segmenti di clienti con abitudini simili. Nell'apprendimento per rinforzo, invece, un agente prova azioni e riceve premi o penalità, migliorando per tentativi.",
    "Nel 2016 AlphaGo di DeepMind batté il campione Lee Sedol a Go per 4 a 1, combinando apprendimento supervisionato su partite umane e apprendimento per rinforzo giocando milioni di partite contro se stesso. Era un traguardo che molti esperti ritenevano lontano almeno un decennio."
  ],
  curiosity: "La «mossa 37» della seconda partita contro Lee Sedol sembrò un errore ai commentatori: si rivelò un colpo creativo che nessun professionista umano avrebbe giocato.",
  apply: "Pensa ai tuoi lead come a dati etichettati: annota sempre perché una trattativa è stata chiusa o persa. Dopo venti casi vedrai schemi che nessuna intuizione ti avrebbe mostrato.",
  quiz: [
    { q: "Cosa caratterizza l'apprendimento supervisionato?", o: ["Dati con etichette già note", "Nessun dato", "Solo immagini"], a: 0, why: "Il modello impara da esempi con la risposta corretta." },
    { q: "Quale tipo di apprendimento usa premi e penalità?", o: ["Non supervisionato", "Per rinforzo", "Manuale"], a: 1, why: "L'agente migliora in base ai premi ottenuti dalle sue azioni." },
    { q: "Quale campione di Go fu battuto da AlphaGo nel 2016?", o: ["Garry Kasparov", "Lee Sedol", "Magnus Carlsen"], a: 1, why: "AlphaGo vinse 4 a 1 contro Lee Sedol; Kasparov e Carlsen sono campioni di scacchi." }
  ]
},
{
  id: "ai-04", sector: "ai",
  title: "La legge di Moore",
  kicker: "La previsione che ha guidato sessant'anni di progresso tecnologico",
  body: [
    "Nel 1965 Gordon Moore, che poi avrebbe cofondato Intel, osservò che il numero di transistor integrabili su un chip raddoppiava a ritmo regolare. Nel 1975 rivide la stima: raddoppio circa ogni due anni. Non era una legge della fisica, ma una previsione che l'industria trasformò in obiettivo.",
    "Per decenni la previsione si è rivelata sorprendentemente accurata: dai circa 2.300 transistor del primo microprocessore Intel 4004 (1971) si è arrivati a decine di miliardi nei chip moderni. Più transistor significano più potenza a costi più bassi: è il motivo per cui uno smartphone di oggi supera i supercomputer di qualche decennio fa.",
    "Negli ultimi anni il ritmo è rallentato, perché i transistor si avvicinano a dimensioni di pochi atomi e i costi delle fabbriche esplodono. L'innovazione si è spostata su architetture specializzate, come i chip per l'intelligenza artificiale, e sul software."
  ],
  curiosity: "Il chip Intel 4004 del 1971 aveva circa 2.300 transistor e fu progettato inizialmente per una calcolatrice giapponese della Busicom.",
  apply: "La tecnologia diventa sempre più economica: strumenti che ieri costavano migliaia di euro oggi sono abbonamenti da pochi euro. Usali per offrire ai clienti servizi «da grande agenzia» a prezzi da professionista locale.",
  quiz: [
    { q: "Cosa prevede la legge di Moore (versione 1975)?", o: ["Raddoppio dei transistor circa ogni due anni", "Prezzi dei computer che raddoppiano", "Internet che dimezza ogni anno"], a: 0, why: "Moore stimò un raddoppio ogni due anni circa." },
    { q: "Quale azienda cofondò Gordon Moore?", o: ["Apple", "Intel", "Microsoft"], a: 1, why: "Moore fu cofondatore di Intel nel 1968." },
    { q: "Perché il ritmo della legge sta rallentando?", o: ["Perché nessuno compra più computer", "Perché i transistor si avvicinano a dimensioni atomiche", "Per una legge europea"], a: 1, why: "I limiti fisici e i costi rendono più difficile miniaturizzare." }
  ]
},
{
  id: "ai-05", sector: "ai",
  title: "Come funziona Internet: IP, DNS e web",
  kicker: "Cosa succede davvero quando scrivi l'indirizzo di un sito",
  body: [
    "Ogni dispositivo collegato a Internet ha un indirizzo IP, una sequenza di numeri che lo identifica. Ma nessuno ricorda numeri: per questo esiste il DNS (Domain Name System), una sorta di rubrica globale che traduce un nome come «esempio.it» nell'indirizzo IP del server che ospita il sito.",
    "I dati viaggiano divisi in pacchetti, seguendo le regole del protocollo TCP/IP: ogni pacchetto può prendere strade diverse e viene riassemblato all'arrivo. Internet nasce da ARPANET, la rete sperimentale americana del 1969. Il World Wide Web, cioè pagine e link, è venuto dopo: lo inventò Tim Berners-Lee al CERN tra il 1989 e il 1991.",
    "Quando apri un sito succede questo: il browser chiede al DNS l'indirizzo, si collega al server, scarica HTML, CSS e immagini con il protocollo HTTPS (la S indica la connessione cifrata) e compone la pagina. Il tutto avviene in pochi decimi di secondo."
  ],
  curiosity: "Il primo sito web della storia, pubblicato al CERN, è ancora online all'indirizzo info.cern.ch e spiega cos'è il World Wide Web.",
  apply: "Spiegare ai clienti la differenza tra dominio (il nome), DNS (la rubrica) e hosting (la casa del sito) ti fa sembrare subito più esperto e ti aiuta a vendere la gestione tecnica.",
  quiz: [
    { q: "A cosa serve il DNS?", o: ["A cifrare le password", "A tradurre i nomi dei siti in indirizzi IP", "A velocizzare il Wi-Fi"], a: 1, why: "È la rubrica che collega i domini agli indirizzi IP." },
    { q: "Chi ha inventato il World Wide Web?", o: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs"], a: 1, why: "Berners-Lee lo creò al CERN tra il 1989 e il 1991." },
    { q: "Cosa indica la «S» di HTTPS?", o: ["Che la connessione è cifrata", "Che il sito è svizzero", "Che il sito è veloce"], a: 0, why: "Sta per secure: i dati viaggiano cifrati." }
  ]
},
{
  id: "ai-06", sector: "ai",
  title: "Il sistema binario: tutto è 0 e 1",
  kicker: "Dal bit al byte, la lingua segreta di ogni computer",
  body: [
    "I computer rappresentano ogni informazione con due soli simboli, 0 e 1, perché è facile distinguere due stati elettrici: acceso e spento. Ogni cifra binaria si chiama bit. Otto bit formano un byte, che può assumere 256 valori diversi: abbastanza per rappresentare lettere, numeri e simboli.",
    "Il sistema binario fu studiato a fondo dal filosofo e matematico Gottfried Wilhelm Leibniz, che lo descrisse in un saggio pubblicato nel 1703. Ma la svolta pratica arrivò nel 1937, quando Claude Shannon mostrò nella sua tesi che l'algebra logica di Boole poteva descrivere i circuiti elettrici: nasceva la base teorica dei computer digitali.",
    "Oggi parliamo di kilobyte, megabyte e gigabyte. A rigore, nel sistema internazionale «kilo» significa 1.000, mentre in informatica si è usato a lungo 1.024 (2 alla decima): per questo esistono anche i «kibibyte». È il motivo per cui un disco da 1 TB sembra un po' più piccolo una volta collegato al computer."
  ],
  curiosity: "Claude Shannon è considerato il padre della teoria dell'informazione: nel 1948 usò per primo in un testo pubblicato la parola «bit», abbreviazione di binary digit.",
  apply: "Quando ottimizzi un sito, pensa in byte: immagini da 3 MB rallentano tutto su mobile. Comprimerle sotto i 200 KB migliora velocità, posizionamento su Google e conversioni.",
  quiz: [
    { q: "Quanti bit compongono un byte?", o: ["4", "8", "16"], a: 1, why: "Otto bit formano un byte, con 256 valori possibili." },
    { q: "Chi collegò l'algebra di Boole ai circuiti elettrici nel 1937?", o: ["Claude Shannon", "Alan Turing", "Leibniz"], a: 0, why: "Lo fece Shannon nella sua tesi di master." },
    { q: "Perché un disco da 1 TB sembra più piccolo al computer?", o: ["Per un difetto del disco", "Per la differenza tra 1.000 e 1.024 nelle unità", "Perché il computer è vecchio"], a: 1, why: "Produttori e sistemi operativi contano le unità in modo diverso." }
  ]
},

/* ============================== STORIA & MONDO ============================== */
{
  id: "sto-01", sector: "storia",
  title: "La Lega Anseatica: il primo grande network commerciale",
  kicker: "Come una rete di città mercantili dominò il Nord Europa per secoli",
  body: [
    "Dal XIII secolo, decine di città del Nord Europa guidate da Lubecca si unirono nella Lega Anseatica, un'alleanza di mercanti e città che controllava il commercio del Mar Baltico e del Mare del Nord: legname, pellicce, grano, pesce essiccato, sale, stoffe.",
    "La Lega non era uno Stato, ma una rete. Gestiva grandi sedi commerciali all'estero, i «Kontor», a Londra, Bruges, Bergen e Novgorod, con privilegi doganali e regole comuni. Le città membre condividevano informazioni, standard e difesa: insieme potevano trattare alla pari con i re.",
    "Il declino arrivò tra Cinque e Seicento, con l'ascesa di Stati nazionali forti, nuove rotte atlantiche e concorrenti come gli olandesi. L'ultima dieta, cioè l'assemblea generale, si tenne nel 1669. Ma città come Amburgo e Brema si chiamano ancora oggi ufficialmente «città anseatiche»."
  ],
  curiosity: "La compagnia aerea tedesca Lufthansa prende il nome proprio dalla Hansa: «Luft» significa aria, quindi la «Lega Anseatica dell'aria».",
  apply: "La lezione anseatica è la forza delle reti: stringi alleanze con fotografi, grafici e commercialisti della tua zona. Ognuno porta clienti agli altri, come i mercanti si portavano rotte e informazioni.",
  quiz: [
    { q: "Quale città guidava la Lega Anseatica?", o: ["Venezia", "Lubecca", "Parigi"], a: 1, why: "Lubecca era il centro politico della Lega." },
    { q: "Cosa erano i «Kontor»?", o: ["Monete d'oro", "Sedi commerciali all'estero", "Navi da guerra"], a: 1, why: "Erano basi mercantili a Londra, Bruges, Bergen e Novgorod." },
    { q: "Da dove prende il nome Lufthansa?", o: ["Da un fondatore di nome Hans", "Dalla Hansa, la Lega Anseatica", "Da una città svizzera"], a: 1, why: "«Luft» più «Hansa»: la Lega dell'aria." }
  ]
},
{
  id: "sto-02", sector: "storia",
  title: "Gutenberg e la rivoluzione della stampa",
  kicker: "La tecnologia che democratizzò il sapere cinque secoli prima di Internet",
  body: [
    "Intorno alla metà del Quattrocento, a Magonza, Johannes Gutenberg mise a punto un sistema di stampa a caratteri mobili in metallo, con inchiostri a base oleosa e un torchio adattato da quelli per il vino. Verso il 1455 completò la sua celebre Bibbia, stampata in circa 180 copie.",
    "Prima, un libro veniva copiato a mano in mesi di lavoro. Con la stampa i costi crollarono e la diffusione esplose: entro il 1500 le tipografie europee avevano prodotto milioni di volumi. Venezia divenne una capitale della stampa, e lì Aldo Manuzio inventò il corsivo e i libri in formato tascabile.",
    "Le conseguenze furono enormi: diffusione delle idee scientifiche, standardizzazione delle lingue, rapida circolazione della Riforma protestante. Una tecnologia di comunicazione cambiò religione, politica e scienza, proprio come Internet ha fatto nella nostra epoca."
  ],
  curiosity: "Della Bibbia di Gutenberg sopravvivono una cinquantina di esemplari, completi o parziali: sono tra i libri più preziosi al mondo.",
  apply: "La stampa vinse perché abbassò drasticamente il costo di produzione. Chiediti quale parte del tuo lavoro puoi rendere replicabile con modelli e componenti già pronti, per consegnare più siti in meno tempo.",
  quiz: [
    { q: "In quale città lavorava Gutenberg?", o: ["Magonza", "Londra", "Roma"], a: 0, why: "Gutenberg operava a Magonza, in Germania." },
    { q: "Quale innovazione si deve ad Aldo Manuzio?", o: ["Il carattere corsivo e i libri tascabili", "La carta riciclata", "Il primo giornale quotidiano"], a: 0, why: "A Venezia Manuzio introdusse il corsivo e il formato in ottavo." },
    { q: "Qual fu un effetto principale della stampa?", o: ["I libri divennero più cari", "La rapida diffusione delle idee", "Scomparvero le biblioteche"], a: 1, why: "Costi bassi e copie identiche fecero circolare il sapere." }
  ]
},
{
  id: "sto-03", sector: "storia",
  title: "I Medici, la banca e la partita doppia",
  kicker: "Come la finanza fiorentina inventò strumenti che usiamo ancora",
  body: [
    "Nel 1397 Giovanni di Bicci de' Medici fondò a Firenze il Banco dei Medici, che divenne la banca più potente d'Europa con filiali a Roma, Venezia, Ginevra, Bruges e Londra. Tra i clienti c'era il Papato: i Medici gestivano gran parte delle sue finanze.",
    "Le banche italiane del tempo perfezionarono strumenti fondamentali come la lettera di cambio, che permetteva di trasferire denaro tra città senza trasportare oro, e la contabilità in partita doppia, in cui ogni operazione viene registrata due volte, in «dare» e in «avere», così che i conti si controllino da soli.",
    "Fu il frate e matematico Luca Pacioli a descrivere in modo sistematico la partita doppia nella «Summa de arithmetica», stampata a Venezia nel 1494. Lo stesso anno il banco mediceo crollava, tra cattiva gestione delle filiali e crisi politica. Ma il metodo contabile è sopravvissuto fino a oggi."
  ],
  curiosity: "La ricchezza dei Medici finanziò artisti come Brunelleschi, Botticelli e Michelangelo: senza la loro banca il Rinascimento fiorentino sarebbe stato molto diverso.",
  apply: "La partita doppia esiste perché i numeri tenuti bene proteggono dagli errori. Registra ogni entrata e ogni costo della tua attività: è esattamente ciò che fa la sezione Finanze di questa dashboard.",
  quiz: [
    { q: "Chi fondò il Banco dei Medici nel 1397?", o: ["Lorenzo il Magnifico", "Giovanni di Bicci de' Medici", "Cosimo I"], a: 1, why: "Fu Giovanni di Bicci, padre di Cosimo il Vecchio." },
    { q: "Cos'è la partita doppia?", o: ["Un gioco di carte rinascimentale", "Registrare ogni operazione in dare e in avere", "Un prestito con due garanti"], a: 1, why: "La doppia registrazione permette di controllare i conti." },
    { q: "Chi descrisse la partita doppia nel 1494?", o: ["Luca Pacioli", "Niccolò Machiavelli", "Galileo Galilei"], a: 0, why: "Pacioli lo fece nella «Summa de arithmetica»." }
  ]
},
{
  id: "sto-04", sector: "storia",
  title: "La Via della Seta: non una strada, ma una rete",
  kicker: "Merci, idee e religioni in viaggio tra Cina e Mediterraneo",
  body: [
    "L'espressione «Via della Seta» fu coniata nel 1877 dal geografo tedesco Ferdinand von Richthofen. In realtà non era una singola strada, ma un intreccio di rotte terrestri e marittime che collegava la Cina all'Asia centrale, all'India, alla Persia e al Mediterraneo.",
    "I contatti si intensificarono a partire dal II secolo a.C., quando la dinastia Han inviò verso ovest l'esploratore Zhang Qian. Pochi mercanti percorrevano tutto il tragitto: le merci passavano di mano in mano tra intermediari, aumentando di prezzo a ogni tappa. Seta, spezie, cavalli, vetro e metalli preziosi viaggiavano in entrambe le direzioni.",
    "Ma la merce più importante erano le idee. Lungo queste rotte si diffusero il buddhismo, la carta, tecniche agricole e scientifiche, e purtroppo anche epidemie come la peste nera del Trecento. Il racconto dei viaggi di Marco Polo, alla fine del Duecento, fece sognare l'Europa per generazioni."
  ],
  curiosity: "Per secoli la produzione della seta fu un segreto custodito dalla Cina: secondo la tradizione, i bachi arrivarono a Bisanzio intorno al VI secolo nascosti nei bastoni di due monaci.",
  apply: "Sulla Via della Seta il guadagno stava negli intermediari che collegavano mondi diversi. Anche tu sei un ponte tra le attività tradizionali e il digitale: è lì che sta il tuo valore.",
  quiz: [
    { q: "Chi coniò l'espressione «Via della Seta»?", o: ["Marco Polo", "Ferdinand von Richthofen", "Gengis Khan"], a: 1, why: "Il geografo tedesco la usò nel 1877." },
    { q: "La Via della Seta era…", o: ["Un'unica strada lastricata", "Una rete di rotte terrestri e marittime", "Un canale navigabile"], a: 1, why: "Era un intreccio di percorsi e tappe intermedie." },
    { q: "Quale invenzione si diffuse verso ovest lungo queste rotte?", o: ["La carta", "La stampa a vapore", "Il telefono"], a: 0, why: "La carta, inventata in Cina, arrivò in Occidente attraverso queste reti." }
  ]
},
{
  id: "sto-05", sector: "storia",
  title: "9 novembre 1989: la caduta del Muro di Berlino",
  kicker: "Una conferenza stampa confusa che cambiò la storia",
  body: [
    "Il Muro di Berlino fu eretto dalla Germania Est nella notte del 13 agosto 1961 per fermare la fuga dei cittadini verso Ovest. Per 28 anni divise famiglie, quartieri e strade, diventando il simbolo della Guerra fredda e della cortina di ferro tra i due blocchi.",
    "Nel 1989, con proteste di massa e un'ondata di fughe attraverso Ungheria e Cecoslovacchia, il regime decise di allentare le regole sui viaggi. La sera del 9 novembre il portavoce Günter Schabowski, in diretta televisiva, annunciò per errore che la nuova norma valeva «subito, immediatamente».",
    "Migliaia di berlinesi dell'Est si accalcarono ai varchi. Le guardie, senza ordini chiari e sotto pressione, aprirono il passaggio di Bornholmer Straße e poi gli altri. Quella notte la gente ballò sul Muro. Meno di un anno dopo, il 3 ottobre 1990, la Germania era riunificata."
  ],
  curiosity: "Il 3 ottobre, anniversario della riunificazione, è oggi la festa nazionale tedesca: il «Giorno dell'unità tedesca».",
  apply: "Il Muro cadde anche per una comunicazione sbagliata detta con sicurezza. Nelle trattative scegli le parole con cura: una promessa fatta per fretta («subito!») crea aspettative che poi devi mantenere.",
  quiz: [
    { q: "Quando cadde il Muro di Berlino?", o: ["9 novembre 1989", "13 agosto 1961", "3 ottobre 1990"], a: 0, why: "Il 1961 è la costruzione, il 1990 la riunificazione." },
    { q: "Chi annunciò per errore l'apertura immediata dei confini?", o: ["Helmut Kohl", "Günter Schabowski", "Michail Gorbačëv"], a: 1, why: "Fu il portavoce Schabowski durante la conferenza stampa." },
    { q: "Quando avvenne la riunificazione tedesca?", o: ["1985", "3 ottobre 1990", "2001"], a: 1, why: "Meno di un anno dopo la caduta del Muro." }
  ]
},
{
  id: "sto-06", sector: "storia",
  title: "La febbre dei tulipani olandesi",
  kicker: "La prima bolla speculativa della storia (o quasi)",
  body: [
    "Nelle Province Unite olandesi del Seicento, ricche grazie al commercio, i tulipani erano un simbolo di lusso. Le varietà rare con petali screziati, dovute in realtà a un virus della pianta, valevano cifre enormi. Tra il 1636 e il 1637 i prezzi dei bulbi esplosero.",
    "Si commerciavano contratti sui bulbi ancora sottoterra, nelle taverne, spesso senza vedere la merce: una forma primitiva di contratti futures. Nel febbraio 1637 il mercato crollò di colpo, quando i compratori smisero di presentarsi alle aste. Molti contratti non furono mai onorati.",
    "Per secoli la «tulipomania» è stata raccontata come una follia collettiva che rovinò il Paese. Studi più recenti, come quelli della storica Anne Goldgar, mostrano che i danni economici furono molto più limitati di quanto narrato. Resta però il simbolo perfetto delle bolle: prezzi slegati dal valore reale, sostenuti solo dalla speranza di rivendere."
  ],
  curiosity: "Le striature tanto ricercate dei tulipani «Rembrandt» erano causate da un virus trasmesso dagli afidi, che indeboliva la pianta: la bellezza più pagata era, in fondo, una malattia.",
  apply: "Diffida delle mode del momento nel digitale: valuta strumenti e trend dal valore che portano ai clienti, non dall'entusiasmo che generano. Il valore reale resiste quando l'hype finisce.",
  quiz: [
    { q: "In quali anni si concentrò la tulipomania?", o: ["1636-1637", "1720-1721", "1929-1930"], a: 0, why: "Il picco e il crollo avvennero tra il 1636 e il febbraio 1637." },
    { q: "Cosa causava le preziose striature dei tulipani?", o: ["Un concime speciale", "Un virus della pianta", "Una tecnica di pittura"], a: 1, why: "Era un virus trasmesso dagli afidi." },
    { q: "Cosa suggeriscono gli studi recenti sulla tulipomania?", o: ["Fu più grave di quanto si pensi", "I danni economici furono più limitati del mito", "Non è mai avvenuta"], a: 1, why: "Ricerche come quelle di Anne Goldgar ne ridimensionano l'impatto." }
  ]
},

/* =================== MINDSET, PSICOLOGIA & NEGOZIAZIONE =================== */
{
  id: "min-01", sector: "mindset",
  title: "BATNA: la tua alternativa migliore",
  kicker: "Il concetto di Harvard che decide chi ha potere in una trattativa",
  body: [
    "BATNA sta per Best Alternative To a Negotiated Agreement: la migliore alternativa che hai se la trattativa fallisce. Il concetto fu reso celebre da Roger Fisher e William Ury dell'Harvard Negotiation Project nel libro «Getting to Yes» (in italiano «L'arte del negoziato»), pubblicato nel 1981.",
    "Il tuo potere negoziale non dipende da quanto sei bravo a parlare, ma da quanto è buona la tua alternativa. Se hai altri tre clienti interessati, puoi permetterti di dire no a uno sconto eccessivo. Se quel cliente è l'unico, accetterai quasi tutto. Chi ha una BATNA forte negozia con calma.",
    "Due regole pratiche: prima di ogni trattativa definisci la tua BATNA e il tuo prezzo minimo, e lavora per migliorare l'alternativa prima di sederti al tavolo. Poi prova a capire la BATNA dell'altra parte: se non ha alternative valide a te, hai più margine di quanto pensi."
  ],
  curiosity: "Insieme alla BATNA si parla spesso di ZOPA (Zone Of Possible Agreement): la fascia in cui il prezzo minimo del venditore e quello massimo del compratore si sovrappongono.",
  apply: "Tieni sempre piena la pipeline del CRM: ogni lead in più rafforza la tua BATNA e ti permette di difendere il prezzo senza ansia.",
  quiz: [
    { q: "Cosa significa BATNA?", o: ["La migliore alternativa a un accordo negoziato", "Un tipo di contratto bancario", "Il prezzo massimo del cliente"], a: 0, why: "Best Alternative To a Negotiated Agreement." },
    { q: "In quale libro fu reso celebre il concetto?", o: ["«Il Principe»", "«Getting to Yes»", "«Pensieri lenti e veloci»"], a: 1, why: "Fisher e Ury lo presentarono nel 1981." },
    { q: "Come aumenti il tuo potere in una trattativa?", o: ["Parlando più forte", "Migliorando le tue alternative", "Abbassando subito il prezzo"], a: 1, why: "Una BATNA forte ti permette di dire no." }
  ]
},
{
  id: "min-02", sector: "mindset",
  title: "L'ancoraggio: il primo numero vince",
  kicker: "Perché la prima cifra detta in una trattativa condiziona tutte le altre",
  body: [
    "Nel 1974 gli psicologi Amos Tversky e Daniel Kahneman fecero girare una ruota della fortuna truccata per fermarsi su 10 o su 65. Poi chiesero ai partecipanti di stimare la percentuale di Paesi africani nelle Nazioni Unite. Chi aveva visto 10 rispose in media 25%, chi aveva visto 65 rispose 45%.",
    "Un numero casuale e chiaramente irrilevante aveva spostato le stime. È l'effetto ancoraggio: la mente parte dal primo valore disponibile e lo corregge, ma quasi sempre troppo poco. Funziona su prezzi, stipendi, valutazioni di case, persino sulle sentenze dei giudici in alcuni studi.",
    "In una trattativa, chi fa la prima offerta credibile spesso fissa l'ancora. Un listino che parte dal pacchetto più costoso rende ragionevole quello intermedio. Per difenderti, invece, prepara il tuo numero prima di ascoltare quello dell'altra parte, così non sarai trascinato dalla sua ancora."
  ],
  curiosity: "Daniel Kahneman ricevette il premio Nobel per l'economia nel 2002 per gli studi sui giudizi e le decisioni in condizioni di incertezza; Tversky era morto nel 1996 e il Nobel non viene assegnato postumo.",
  apply: "Nelle proposte parla prima del pacchetto Premium e poi del Consigliato. E se un cliente dice «quanto costa?», non improvvisare un numero basso: ancora in alto con il valore che porti.",
  quiz: [
    { q: "Cosa usarono Tversky e Kahneman nell'esperimento?", o: ["Una ruota della fortuna truccata", "Un mazzo di carte", "Un questionario online"], a: 0, why: "La ruota si fermava solo su 10 o su 65." },
    { q: "Cos'è l'effetto ancoraggio?", o: ["La tendenza a restare fedeli a un marchio", "L'influenza del primo numero sulle stime successive", "La paura di cambiare lavoro"], a: 1, why: "Il primo valore fa da ancora e le correzioni sono insufficienti." },
    { q: "Come ti difendi dall'ancora dell'altra parte?", o: ["Preparando il tuo numero prima di ascoltare il suo", "Accettando subito", "Non rispondendo mai"], a: 0, why: "Un riferimento tuo ti protegge dall'ancora altrui." }
  ]
},
{
  id: "min-03", sector: "mindset",
  title: "Growth mindset: l'abilità si costruisce",
  kicker: "Cosa dice davvero la ricerca di Carol Dweck, e cosa no",
  body: [
    "La psicologa di Stanford Carol Dweck ha distinto due convinzioni su noi stessi. Con una mentalità fissa (fixed mindset) pensiamo che talento e intelligenza siano dati una volta per tutte; con una mentalità di crescita (growth mindset) crediamo che si possano sviluppare con impegno, strategie e aiuto.",
    "La differenza si vede davanti agli errori. Chi ha una mentalità fissa li vive come una sentenza («non sono portato») ed evita le sfide per non sembrare incapace. Chi ha una mentalità di crescita li vede come informazioni: cosa ho sbagliato, cosa provo di diverso? Le sue idee sono raccolte nel libro «Mindset» (2006).",
    "Studi successivi hanno mostrato effetti reali ma più modesti di quanto suggerito all'inizio, e Dweck stessa ha messo in guardia dal «falso growth mindset»: non basta lodare l'impegno, bisogna lodare i progressi e le strategie efficaci. Il punto non è sforzarsi di più, ma imparare meglio."
  ],
  curiosity: "Una delle frasi chiave di Dweck è aggiungere la parola «ancora»: non «non so vendere», ma «non so vendere… ancora».",
  apply: "Dopo ogni trattativa persa scrivi una lezione concreta nel campo «Imparare». È growth mindset applicato: l'errore diventa un dato che migliora la prossima vendita.",
  quiz: [
    { q: "Cosa crede chi ha un growth mindset?", o: ["Che il talento sia innato e fisso", "Che le abilità si sviluppino con impegno e strategie", "Che la fortuna decida tutto"], a: 1, why: "La mentalità di crescita vede le abilità come allenabili." },
    { q: "Come vive gli errori chi ha una mentalità fissa?", o: ["Come una sentenza sul proprio valore", "Come un'opportunità", "Non sbaglia mai"], a: 0, why: "Tende a leggerli come prova di non essere capace." },
    { q: "Cosa intende Dweck per «falso growth mindset»?", o: ["Lodare solo l'impegno senza guardare progressi e strategie", "Studiare troppo", "Lavorare di notte"], a: 0, why: "Conta migliorare il metodo, non solo sforzarsi." }
  ]
},
{
  id: "min-04", sector: "mindset",
  title: "Le leve della persuasione di Cialdini",
  kicker: "Sei principi che guidano il «sì», da usare con etica",
  body: [
    "Nel 1984 lo psicologo Robert Cialdini pubblicò «Le armi della persuasione», frutto di anni di ricerca e anche di esperienza sul campo come venditore. Individuò sei principi che spingono le persone a dire sì: reciprocità, impegno e coerenza, riprova sociale, autorità, simpatia e scarsità.",
    "La reciprocità ci fa sentire in debito con chi ci dà qualcosa per primo. La coerenza ci spinge a mantenere gli impegni presi, anche piccoli. La riprova sociale ci fa seguire ciò che fanno gli altri, soprattutto se simili a noi. L'autorità ci rende più disponibili verso chi appare esperto. La simpatia aiuta chi ci piace. La scarsità rende più desiderabile ciò che è limitato.",
    "Nelle edizioni successive Cialdini ha aggiunto un settimo principio, l'unità: il senso di appartenenza a un «noi» condiviso. Lui stesso insiste sull'uso etico: le leve funzionano meglio e più a lungo quando valorizzano vantaggi veri, non quando creano urgenze o scarsità finte."
  ],
  curiosity: "Per scrivere il libro Cialdini si infiltrò in corsi di vendita, agenzie pubblicitarie e organizzazioni di raccolta fondi, osservando dall'interno le tecniche dei professionisti.",
  apply: "Reciprocità: regala una mini-analisi della scheda Google. Riprova sociale: mostra i siti di altri negozi della zona. Scarsità vera: hai posto per due progetti al mese.",
  quiz: [
    { q: "Quale di questi è un principio di Cialdini?", o: ["Reciprocità", "Velocità", "Gerarchia"], a: 0, why: "La reciprocità è uno dei sei principi originali." },
    { q: "Cosa sfrutta la «riprova sociale»?", o: ["La tendenza a seguire ciò che fanno gli altri", "Il prezzo più basso", "La paura del buio"], a: 0, why: "Guardiamo agli altri per capire cosa è giusto fare." },
    { q: "Quale principio fu aggiunto in seguito?", o: ["Unità", "Avarizia", "Rapidità"], a: 0, why: "L'unità riguarda il senso di appartenenza a un «noi»." }
  ]
},
{
  id: "min-05", sector: "mindset",
  title: "L'avversione alla perdita",
  kicker: "Perché perdere 100 euro fa più male di quanto ne faccia piacere guadagnarli",
  body: [
    "Nel 1979 Daniel Kahneman e Amos Tversky pubblicarono la teoria del prospetto, uno dei pilastri dell'economia comportamentale. Una delle sue scoperte centrali è l'avversione alla perdita: a parità di cifra, una perdita pesa psicologicamente molto più di un guadagno, circa il doppio secondo molte stime.",
    "Questo spiega comportamenti apparentemente irrazionali: teniamo azioni in perdita sperando che risalgano, rifiutiamo scommesse vantaggiose, restiamo con un fornitore mediocre per paura di sbagliare cambiando. Il modo in cui una scelta viene presentata (il «framing») cambia radicalmente le decisioni.",
    "Nel marketing e nelle vendite il principio è potentissimo: «Stai perdendo 5 prenotazioni a settimana» colpisce più di «Potresti guadagnare 5 prenotazioni». Va però usato con onestà: si tratta di rendere visibile un costo reale che il cliente non vede, non di inventare paure."
  ],
  curiosity: "Nel libro «Pensieri lenti e veloci» Kahneman propone una scommessa a testa o croce: se esce croce perdi 100 dollari, se esce testa ne vinci 150. Quasi tutti la rifiutano, anche se in media è vantaggiosa.",
  apply: "Nel pitch quantifica cosa il negozio perde oggi senza sito: clienti che non lo trovano su Google, telefonate perse durante il servizio, commissioni pagate alle piattaforme.",
  quiz: [
    { q: "Chi formulò la teoria del prospetto?", o: ["Kahneman e Tversky", "Keynes e Smith", "Freud e Jung"], a: 0, why: "La pubblicarono nel 1979." },
    { q: "Cosa afferma l'avversione alla perdita?", o: ["Le perdite pesano più dei guadagni equivalenti", "Le persone amano rischiare", "I guadagni contano di più"], a: 0, why: "Una perdita pesa circa il doppio di un guadagno equivalente." },
    { q: "Quale frase sfrutta meglio il principio, se il dato è vero?", o: ["«Il sito è bello»", "«Stai perdendo 5 prenotazioni a settimana»", "«Costa poco»"], a: 1, why: "Rendere visibile una perdita reale motiva più di un guadagno." }
  ]
},
{
  id: "min-06", sector: "mindset",
  title: "L'effetto Zeigarnik e il potere dell'incompiuto",
  kicker: "Perché le cose lasciate a metà ci restano in testa",
  body: [
    "Negli anni Venti la psicologa Bluma Zeigarnik, allieva di Kurt Lewin a Berlino, notò che i camerieri ricordavano perfettamente le ordinazioni ancora da pagare e le dimenticavano subito dopo il saldo. Nei suoi esperimenti (1927) le persone ricordavano meglio i compiti interrotti rispetto a quelli completati.",
    "L'idea è che un compito aperto crei una tensione mentale che ci spinge a tornarci sopra. Le repliche successive hanno dato risultati contrastanti sulla memoria, ma il principio di fondo resta utile: le attività incompiute occupano spazio nella mente e consumano energia anche quando non ci lavoriamo.",
    "Due applicazioni pratiche. Primo, per vincere la procrastinazione basta iniziare per due minuti: una volta aperto, il compito chiede di essere chiuso. Secondo, per liberare la mente annota ogni «ciclo aperto» in un sistema affidabile, come suggerisce il metodo Getting Things Done di David Allen."
  ],
  curiosity: "Le serie TV sfruttano lo stesso meccanismo con il cliffhanger: chiudere un episodio nel momento di massima tensione lascia un ciclo aperto che ti spinge a guardare il successivo.",
  apply: "Usa i promemoria della Home come contenitore dei cicli aperti: scrivi ogni follow-up da fare e liberi la mente per lo studio. Per partire con una task difficile, avvia il timer anche solo per due minuti.",
  quiz: [
    { q: "Cosa notò Bluma Zeigarnik nei camerieri?", o: ["Ricordavano meglio gli ordini ancora da pagare", "Dimenticavano tutti gli ordini", "Preferivano i clienti abituali"], a: 0, why: "Dopo il pagamento il ricordo svaniva." },
    { q: "Qual è un modo pratico per sfruttare l'effetto?", o: ["Iniziare una task anche solo per due minuti", "Rimandare tutto a domani", "Fare dieci cose insieme"], a: 0, why: "Un compito avviato spinge a essere completato." },
    { q: "Come si liberano i «cicli aperti» secondo il metodo GTD?", o: ["Annotandoli in un sistema affidabile", "Ignorandoli", "Facendoli tutti subito"], a: 0, why: "Scriverli toglie il carico dalla memoria." }
  ]
},

/* ===================== GEOPOLITICA & STRATEGIA GLOBALE ===================== */
{
  id: "geo-01", sector: "geo",
  title: "I colli di bottiglia del commercio mondiale",
  kicker: "Pochi stretti di mare da cui passa una parte enorme dell'economia globale",
  body: [
    "Gran parte del commercio mondiale viaggia via mare, e alcune rotte passano per stretti e canali molto stretti, chiamati chokepoint. Lo Stretto di Hormuz, tra Iran e Oman, vede transitare circa un quinto del petrolio consumato nel mondo. Lo Stretto di Malacca collega l'Oceano Indiano al Pacifico ed è vitale per le economie asiatiche.",
    "Il Canale di Suez, aperto nel 1869, permette di passare dal Mediterraneo al Mar Rosso evitando la circumnavigazione dell'Africa e gestisce circa un ottavo del commercio mondiale. A sud del Mar Rosso c'è lo stretto di Bab el-Mandeb, altro passaggio critico, mentre il Canale di Panama collega Atlantico e Pacifico.",
    "Quando un chokepoint si blocca, le conseguenze arrivano ovunque. Nel marzo 2021 la portacontainer Ever Given rimase incagliata nel Canale di Suez per sei giorni, fermando centinaia di navi e ritardando forniture in tutto il mondo. Il controllo di questi passaggi è una leva geopolitica fondamentale."
  ],
  curiosity: "Per aggirare Suez una nave tra Asia ed Europa deve circumnavigare il Capo di Buona Speranza: un tragitto che può allungare il viaggio anche di una o due settimane.",
  apply: "Anche nel business esistono colli di bottiglia: se tutti i tuoi clienti arrivano da un solo canale, basta un blocco per fermarti. Diversifica le fonti: passaparola, Google, social, partner.",
  quiz: [
    { q: "Da quale stretto passa circa un quinto del petrolio consumato al mondo?", o: ["Stretto di Gibilterra", "Stretto di Hormuz", "Stretto di Messina"], a: 1, why: "Hormuz collega il Golfo Persico al mare aperto." },
    { q: "Cosa successe nel Canale di Suez nel marzo 2021?", o: ["Fu chiuso per lavori", "La nave Ever Given si incagliò per sei giorni", "Fu allargato"], a: 1, why: "L'incidente bloccò centinaia di navi." },
    { q: "Cos'è un «chokepoint»?", o: ["Un porto turistico", "Uno stretto passaggio critico per il commercio", "Una tassa doganale"], a: 1, why: "È un collo di bottiglia geografico delle rotte marittime." }
  ]
},
{
  id: "geo-02", sector: "geo",
  title: "La trappola di Tucidide",
  kicker: "Cosa succede quando una potenza emergente sfida quella dominante",
  body: [
    "Lo storico greco Tucidide, raccontando la guerra del Peloponneso, scrisse che a renderla inevitabile furono la crescita del potere di Atene e la paura che questa suscitò a Sparta. Oltre due millenni dopo, il politologo di Harvard Graham Allison ha trasformato questa intuizione in un concetto: la trappola di Tucidide.",
    "Allison ha analizzato 16 casi negli ultimi 500 anni in cui una potenza in ascesa ha minacciato di sostituire quella dominante: in 12 casi è finita in guerra. Le sue tesi sono raccolte nel libro «Destinati alla guerra» (2017), dedicato soprattutto al rapporto tra Stati Uniti e Cina.",
    "Allison non sostiene che la guerra sia inevitabile: i quattro casi pacifici dimostrano che diplomazia, compromessi e interessi comuni possono evitarla. Il concetto è discusso e criticato da molti storici, ma è diventato una lente molto usata per leggere la competizione tra grandi potenze."
  ],
  curiosity: "Tra i casi conclusi senza guerra, Allison cita il sorpasso degli Stati Uniti sul Regno Unito tra Ottocento e Novecento e la fine della Guerra fredda.",
  apply: "Anche nei mercati locali chi è in ascesa spaventa chi domina. Quando un'agenzia più grande ti percepisce come minaccia, punta su una nicchia precisa invece che sullo scontro frontale sui prezzi.",
  quiz: [
    { q: "Da quale guerra nasce l'intuizione di Tucidide?", o: ["Guerra del Peloponneso", "Guerre puniche", "Guerra dei Cent'anni"], a: 0, why: "Tucidide la raccontò nella sua opera storica." },
    { q: "Quanti dei 16 casi analizzati da Allison finirono in guerra?", o: ["4", "12", "16"], a: 1, why: "Dodici su sedici, secondo il suo studio." },
    { q: "Allison sostiene che la guerra sia inevitabile?", o: ["Sì, sempre", "No, i casi pacifici mostrano che si può evitare", "Non ne parla"], a: 1, why: "Il suo è un avvertimento, non una profezia." }
  ]
},
{
  id: "geo-03", sector: "geo",
  title: "Heartland e Rimland: la geografia del potere",
  kicker: "Due teorie classiche che spiegano ancora molte strategie globali",
  body: [
    "Nel 1904 il geografo britannico Halford Mackinder presentò «Il perno geografico della storia». Sosteneva che il cuore dell'Eurasia, una vasta area interna dalla Russia all'Asia centrale chiamata «Heartland», fosse la chiave del dominio mondiale: protetto dalle flotte nemiche e ricchissimo di risorse.",
    "Nel 1919 riassunse la teoria in una formula diventata celebre: chi controlla l'Europa orientale comanda il Heartland, chi controlla il Heartland comanda l'Isola-Mondo (Eurasia e Africa), chi controlla l'Isola-Mondo comanda il mondo. Una visione centrata sulle potenze di terra.",
    "Negli anni Quaranta l'americano Nicholas Spykman ribaltò la prospettiva con la teoria del «Rimland»: la fascia costiera che circonda l'Eurasia, dall'Europa occidentale al Medio Oriente fino all'Asia orientale, densamente popolata e ricca di commerci. Il contenimento dell'URSS durante la Guerra fredda fu in larga parte una strategia sul Rimland."
  ],
  curiosity: "La teoria di Mackinder fu studiata con attenzione anche dai geopolitici tedeschi tra le due guerre, e questo contribuì a darle una cattiva fama dopo il 1945.",
  apply: "Anche nella tua città esiste un «heartland» commerciale: la via o il quartiere dove si concentrano le attività. Presidiare bene una zona e diventarne il riferimento vale più di clienti sparsi ovunque.",
  quiz: [
    { q: "Chi propose la teoria del Heartland?", o: ["Halford Mackinder", "Napoleone", "Karl Marx"], a: 0, why: "Il geografo britannico la presentò nel 1904." },
    { q: "Cos'è il «Rimland» di Spykman?", o: ["La fascia costiera che circonda l'Eurasia", "Il Polo Nord", "Il cuore dell'Africa"], a: 0, why: "Spykman spostò l'attenzione sulle regioni costiere." },
    { q: "Secondo Mackinder, chi controlla il Heartland…", o: ["Perde il controllo dei mari", "Comanda l'Isola-Mondo", "Deve allearsi con il Giappone"], a: 1, why: "È il secondo passo della sua celebre formula." }
  ]
},
{
  id: "geo-04", sector: "geo",
  title: "Terre rare: i metalli della transizione",
  kicker: "Perché pochi elementi della tavola periodica pesano sugli equilibri mondiali",
  body: [
    "Le terre rare sono 17 elementi chimici: i 15 lantanidi più scandio e ittrio. Nonostante il nome non sono così rare nella crosta terrestre, ma si trovano raramente in concentrazioni sfruttabili, e separarle tra loro è complesso, costoso e inquinante.",
    "Sono essenziali per la tecnologia moderna. Il neodimio, per esempio, serve per magneti permanenti potentissimi usati nei motori delle auto elettriche, nelle turbine eoliche, negli smartphone e nei sistemi militari. Senza terre rare la transizione energetica e l'elettronica di consumo si fermerebbero.",
    "La Cina domina il settore: estrae circa due terzi delle terre rare del pianeta e controlla la grande maggioranza della raffinazione. Per questo Stati Uniti, Unione Europea e Giappone cercano di diversificare le forniture con nuove miniere, impianti di lavorazione e riciclo. Chi controlla una catena di fornitura critica ha una leva geopolitica enorme."
  ],
  curiosity: "Nel 2010, durante una disputa diplomatica, le esportazioni cinesi di terre rare verso il Giappone rallentarono bruscamente: un episodio che convinse molti Paesi a cercare fonti alternative.",
  apply: "Se dipendi da un solo fornitore critico (un hosting, una piattaforma, un plugin), sei vulnerabile come chi dipende da un unico Paese per le terre rare. Prevedi sempre un piano B per gli strumenti chiave.",
  quiz: [
    { q: "Quanti sono gli elementi chiamati terre rare?", o: ["5", "17", "50"], a: 1, why: "I 15 lantanidi più scandio e ittrio." },
    { q: "A cosa serve il neodimio?", o: ["Per magneti potenti nei motori elettrici", "Per colorare il vetro di rosso", "Per fare il pane"], a: 0, why: "I suoi magneti sono usati in auto elettriche e turbine eoliche." },
    { q: "Quale Paese domina estrazione e raffinazione?", o: ["Brasile", "Cina", "Canada"], a: 1, why: "La Cina controlla gran parte della filiera." }
  ]
},
{
  id: "geo-05", sector: "geo",
  title: "Soft power: il potere di attrarre",
  kicker: "Vincere senza costringere, con cultura, valori e reputazione",
  body: [
    "Il politologo di Harvard Joseph Nye ha introdotto alla fine degli anni Ottanta il concetto di soft power: la capacità di un Paese di ottenere ciò che vuole attraendo e persuadendo, invece che costringendo con la forza militare o pagando con incentivi economici, che sono le forme del «hard power».",
    "Secondo Nye il soft power nasce da tre fonti: la cultura, quando piace agli altri, i valori politici, quando sono vissuti con coerenza, e la politica estera, quando è percepita come legittima. Hollywood, le università americane, la moda e il cibo italiani, la cultura pop sudcoreana sono esempi di influenza che passa per l'attrazione.",
    "Più tardi Nye ha parlato di «smart power»: la combinazione intelligente di potere duro e morbido. Il soft power si costruisce lentamente e si perde in fretta: basta una politica percepita come ipocrita per bruciare anni di reputazione."
  ],
  curiosity: "L'onda culturale coreana ha un nome proprio, «Hallyu»: dalla musica K-pop alle serie TV, ha trasformato la Corea del Sud in una potenza culturale globale in pochi decenni.",
  apply: "Anche la tua agenzia ha bisogno di soft power: un portfolio curato, recensioni sincere e contenuti utili sui social attirano clienti che arrivano già convinti, senza bisogno di insistere.",
  quiz: [
    { q: "Chi ha introdotto il concetto di soft power?", o: ["Joseph Nye", "Henry Kissinger", "Winston Churchill"], a: 0, why: "Il politologo di Harvard lo propose alla fine degli anni Ottanta." },
    { q: "Il soft power si basa soprattutto su…", o: ["Forza militare", "Attrazione e persuasione", "Sanzioni economiche"], a: 1, why: "È la capacità di influenzare attraendo." },
    { q: "Cos'è lo «smart power»?", o: ["La combinazione di potere duro e morbido", "L'uso degli smartphone in diplomazia", "Un tipo di energia rinnovabile"], a: 0, why: "Nye lo definisce come un mix strategico dei due." }
  ]
},
{
  id: "geo-06", sector: "geo",
  title: "Bretton Woods e il regno del dollaro",
  kicker: "Come nacque l'ordine monetario del dopoguerra, e cosa ne resta",
  body: [
    "Nel luglio 1944, mentre la guerra era ancora in corso, i delegati di 44 Paesi alleati si riunirono a Bretton Woods, negli Stati Uniti, per progettare il sistema monetario del dopoguerra. Nacquero il Fondo Monetario Internazionale e la Banca Mondiale.",
    "Il sistema si basava su cambi fissi: le valute erano agganciate al dollaro, e il dollaro era convertibile in oro a 35 dollari per oncia. Fu un periodo di forte crescita, ma il sistema entrò in crisi negli anni Sessanta, quando i dollari in circolazione superarono di molto le riserve auree americane.",
    "Il 15 agosto 1971 il presidente Nixon sospese la convertibilità del dollaro in oro: il cosiddetto «Nixon shock». Da allora le principali valute fluttuano. Eppure il dollaro è rimasto la principale valuta di riserva del mondo, con più della metà delle riserve valutarie globali, e la valuta di riferimento per petrolio e commercio internazionale."
  ],
  curiosity: "A Bretton Woods l'economista britannico John Maynard Keynes propose una valuta internazionale chiamata «bancor», ma prevalse il piano americano centrato sul dollaro.",
  apply: "Il dollaro domina per fiducia e abitudine, non per legge. Anche nel tuo mercato chi diventa lo standard di riferimento («il sito lo fa lui») vince per anni: costruisci reputazione e coerenza.",
  quiz: [
    { q: "Quali istituzioni nacquero a Bretton Woods?", o: ["FMI e Banca Mondiale", "ONU e NATO", "BCE e Unione Europea"], a: 0, why: "Il Fondo Monetario Internazionale e la Banca Mondiale." },
    { q: "A quanto era fissato l'oro nel sistema di Bretton Woods?", o: ["35 dollari per oncia", "350 dollari per oncia", "1 dollaro per grammo"], a: 0, why: "Il dollaro era convertibile in oro a 35 dollari l'oncia." },
    { q: "Cosa fece Nixon nel 1971?", o: ["Introdusse l'euro", "Sospese la convertibilità del dollaro in oro", "Abolì il Fondo Monetario"], a: 1, why: "È il cosiddetto «Nixon shock» del 15 agosto 1971." }
  ]
}
];
