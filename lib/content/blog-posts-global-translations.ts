import type { LanguageCode } from "@/lib/i18n/config";
import type { BlogPostCopy } from "./blog-posts";

/**
 * French, German, Spanish and Italian copy for the global gateway's own
 * articles (the posts marked `globalOnly` in blog-posts.ts), by slug. English
 * lives on the posts themselves. The older posts keep their translations inline.
 */
export const GLOBAL_POST_TRANSLATIONS: Record<string, Partial<Record<LanguageCode, BlogPostCopy>>> = {
  "luxury-villa-cleaning-french-riviera": {
    fr: {
      title: "Nettoyage de villas de luxe sur la Côte d'Azur : ce qu'il faut savoir",
      description:
        "Découvrez comment un nettoyage éco-luxe professionnel garde votre villa impeccable, saine et accueillante pour votre famille, vos invités et vos locations.",
      body: [
        "Une villa sur la Riviera exige davantage d'une équipe de nettoyage qu'une maison ordinaire. Sols en marbre, terrasses en teck, verre délicat et air marin demandent chacun des produits et des techniques différents, et un seul mauvais choix peut laisser une trace coûteuse à réparer.",
        "Un nettoyage éco-luxe professionnel commence par la compréhension de chaque surface. Les techniques en microfibre et les solutions douces d'origine végétale enlèvent la saleté sans abîmer la pierre ni décaper les finitions, tandis qu'une routine claire, pièce par pièce, garantit la même qualité à chaque visite.",
        "Pour les propriétaires qui louent leur villa ou reçoivent famille et amis, la fiabilité des rotations compte autant que la finition. Pearly Sky s'organise autour de vos arrivées et départs pour que la propriété soit impeccable, saine et accueillante chaque fois que des invités entrent.",
      ],
    },
    de: {
      title: "Luxusvillen-Reinigung an der Côte d'Azur: Was Sie wissen sollten",
      description:
        "Erfahren Sie, wie professionelle Öko-Luxus-Reinigung Ihre Villa makellos, sicher und einladend für Familie, Gäste und Vermietung hält.",
      body: [
        "Eine Villa an der Riviera verlangt von einem Reinigungsteam mehr als ein gewöhnliches Zuhause. Marmorböden, Teakterrassen, empfindliches Glas und Meeresluft brauchen jeweils andere Produkte und Techniken, und ein einziger Fehlgriff kann Spuren hinterlassen, deren Behebung teuer ist.",
        "Professionelle Öko-Luxus-Reinigung beginnt damit, jede Oberfläche zu verstehen. Mikrofasertechniken und sanfte Lösungen auf pflanzlicher Basis lösen Schmutz, ohne Stein anzuätzen oder Oberflächen anzugreifen, und eine klare Raum-für-Raum-Routine hält die gesamte Immobilie von Besuch zu Besuch auf gleichem Niveau.",
        "Für Eigentümer, die ihre Villa vermieten oder Familie und Freunde empfangen, ist ein zuverlässiger Wechsel genauso wichtig wie das Ergebnis. Pearly Sky richtet sich nach Ihren An- und Abreisen, damit die Immobilie makellos, sicher und einladend ist, wenn Gäste eintreffen.",
      ],
    },
    es: {
      title: "Limpieza de villas de lujo en la Riviera francesa: lo que debe saber",
      description:
        "Descubra cómo la limpieza eco-lujo profesional mantiene su villa impecable, segura y acogedora para su familia, invitados y alquileres.",
      body: [
        "Una villa en la Riviera exige más de un equipo de limpieza que una vivienda normal. Suelos de mármol, terrazas de teca, cristal delicado y aire marino requieren productos y técnicas distintos, y una sola mala elección puede dejar una marca costosa de reparar.",
        "La limpieza eco-lujo profesional empieza por entender cada superficie. Las técnicas con microfibra y las soluciones suaves de origen vegetal eliminan la suciedad sin dañar la piedra ni desgastar los acabados, mientras que una rutina clara, habitación por habitación, mantiene toda la propiedad al mismo nivel de una visita a otra.",
        "Para los propietarios que alquilan su villa o reciben a familiares y amigos, la fiabilidad en los cambios de huéspedes importa tanto como el acabado. Pearly Sky se adapta a sus llegadas y salidas para que la propiedad esté impecable, segura y acogedora cada vez que lleguen invitados.",
      ],
    },
    it: {
      title: "Pulizia di ville di lusso in Costa Azzurra: cosa c'è da sapere",
      description:
        "Scopri come la pulizia eco-lusso professionale mantiene la tua villa impeccabile, sicura e accogliente per famiglia, ospiti e affitti.",
      body: [
        "Una villa sulla Riviera chiede a un team di pulizia più di una casa qualsiasi. Pavimenti in marmo, terrazze in teak, vetri delicati e aria di mare richiedono prodotti e tecniche diversi, e una sola scelta sbagliata può lasciare un segno costoso da rimediare.",
        "La pulizia eco-lusso professionale parte dalla conoscenza di ogni superficie. Le tecniche in microfibra e le soluzioni delicate di origine vegetale tolgono lo sporco senza corrodere la pietra né rovinare le finiture, mentre una routine chiara, stanza per stanza, mantiene l'intera proprietà allo stesso livello da una visita all'altra.",
        "Per i proprietari che affittano la villa o ospitano famiglia e amici, l'affidabilità nei cambi ospite conta quanto il risultato. Pearly Sky si organizza intorno ai tuoi arrivi e partenze, così la proprietà è impeccabile, sicura e accogliente ogni volta che arrivano gli ospiti.",
      ],
    },
  },

  "ten-expert-tips-cleaner-healthier-home": {
    fr: {
      title: "10 conseils d'experts pour une maison plus propre et plus saine",
      description:
        "Des conseils simples et efficaces pour garder votre maison fraîche, hygiénique et magnifiquement propre toute l'année.",
      body: [
        "Une maison plus propre n'exige pas des heures d'efforts chaque jour. Travaillez de haut en bas pour que la poussière retombe sur des surfaces pas encore nettoyées, essuyez souvent les points de contact comme les poignées et les interrupteurs, et aérez chaque jour pour éviter l'air confiné.",
        "Gardez à portée de main quelques outils fiables : des chiffons en microfibre, un bon aspirateur à filtre étanche et quelques produits doux d'origine végétale. Lavez régulièrement la literie et les textiles d'ameublement, et dégagez l'encombrement pour que les surfaces s'essuient vite.",
        "Quand le temps manque, une visite professionnelle régulière maintient la routine. Les équipes résidentielles de Pearly Sky utilisent des produits écologiques, pour que votre maison reste fraîche et saine pour tous ceux qui y vivent.",
      ],
    },
    de: {
      title: "10 Expertentipps für ein saubereres und gesünderes Zuhause",
      description:
        "Einfache und wirksame Tipps, damit Ihr Zuhause das ganze Jahr über frisch, hygienisch und schön sauber bleibt.",
      body: [
        "Ein saubereres Zuhause braucht nicht täglich stundenlangen Aufwand. Arbeiten Sie von oben nach unten, damit Staub auf Flächen fällt, die noch nicht gereinigt sind, wischen Sie häufig berührte Stellen wie Griffe und Schalter ab und lüften Sie täglich, damit die Luft nicht abgestanden wird.",
        "Halten Sie ein paar zuverlässige Hilfsmittel griffbereit: Mikrofasertücher, einen guten Staubsauger mit geschlossenem Filter und einige sanfte Reiniger auf pflanzlicher Basis. Waschen Sie Bettwäsche und Polstertextilien regelmäßig und räumen Sie Unordnung weg, damit sich Flächen schnell abwischen lassen.",
        "Wenn es hektisch wird, hält ein regelmäßiger Besuch von Profis die Routine am Laufen. Die Teams von Pearly Sky für Privathaushalte verwenden umweltsichere Produkte, damit Ihr Zuhause für alle, die darin leben, frisch und gesund bleibt.",
      ],
    },
    es: {
      title: "10 consejos de expertos para un hogar más limpio y saludable",
      description:
        "Consejos sencillos y eficaces para mantener su hogar fresco, higiénico y bien limpio durante todo el año.",
      body: [
        "Un hogar más limpio no requiere horas de esfuerzo cada día. Trabaje de arriba abajo para que el polvo caiga sobre superficies aún sin limpiar, limpie a menudo los puntos de contacto como tiradores e interruptores, y ventile a diario para evitar el aire viciado.",
        "Tenga a mano unas pocas herramientas fiables: paños de microfibra, una buena aspiradora con filtro sellado y algunos limpiadores suaves de origen vegetal. Lave la ropa de cama y los textiles con regularidad, y despeje el desorden para que las superficies se limpien rápido.",
        "Cuando falta el tiempo, una visita profesional periódica mantiene la rutina. Los equipos residenciales de Pearly Sky usan productos ecológicos, para que su hogar siga fresco y saludable para todos los que viven en él.",
      ],
    },
    it: {
      title: "10 consigli di esperti per una casa più pulita e sana",
      description:
        "Consigli semplici ed efficaci per mantenere la tua casa fresca, igienica e splendidamente pulita tutto l'anno.",
      body: [
        "Una casa più pulita non richiede ore di fatica ogni giorno. Lavora dall'alto verso il basso, in modo che la polvere cada su superfici ancora da pulire, pulisci spesso i punti di contatto come maniglie e interruttori e arieggia ogni giorno per evitare l'aria stagnante.",
        "Tieni a portata di mano pochi strumenti affidabili: panni in microfibra, un buon aspirapolvere con filtro sigillato e qualche detergente delicato di origine vegetale. Lava regolarmente la biancheria e i tessili d'arredo e libera gli spazi dal disordine, così le superfici si puliscono in fretta.",
        "Quando il tempo scarseggia, una visita professionale periodica mantiene la routine. I team residenziali di Pearly Sky usano prodotti ecologici, così la tua casa resta fresca e sana per tutti coloro che la abitano.",
      ],
    },
  },

  "why-eco-friendly-cleaning-matters-for-your-health": {
    fr: {
      title: "Pourquoi un nettoyage écologique compte pour votre santé",
      description:
        "Découvrez les avantages des produits d'entretien non toxiques et d'origine végétale pour votre famille et l'environnement.",
      body: [
        "De nombreux produits d'entretien classiques laissent des vapeurs et des résidus qui persistent dans l'air et sur les surfaces bien après le nettoyage. Pour les enfants, les animaux et toute personne allergique ou à la peau sensible, cela mérite réflexion.",
        "Les produits non toxiques et d'origine végétale nettoient efficacement sans la charge chimique agressive. Ils sont plus doux pour vos poumons et votre peau, plus sûrs autour des zones de préparation des repas et meilleurs pour les réseaux d'eau qu'ils finissent par atteindre.",
        "Choisir un nettoyage écologique n'est pas un compromis sur le résultat. Avec les bons produits et la bonne technique, les surfaces ressortent impeccables, ce qui est exactement l'approche de Pearly Sky pour chaque service.",
      ],
    },
    de: {
      title: "Warum umweltfreundliche Reinigung für Ihre Gesundheit wichtig ist",
      description:
        "Entdecken Sie die Vorteile schadstofffreier Reinigungsprodukte auf pflanzlicher Basis für Ihre Familie und die Umwelt.",
      body: [
        "Viele herkömmliche Reiniger hinterlassen Dämpfe und Rückstände, die noch lange nach der Reinigung in der Luft und auf Oberflächen bleiben. Für Kinder, Haustiere und alle mit Allergien oder empfindlicher Haut ist das bedenkenswert.",
        "Schadstofffreie Produkte auf pflanzlicher Basis reinigen wirksam, ohne die aggressive Chemie. Sie sind schonender für Lunge und Haut, sicherer in der Nähe von Lebensmittelzubereitung und besser für die Gewässer, in die sie schließlich gelangen.",
        "Umweltfreundlich zu reinigen ist kein Kompromiss beim Ergebnis. Mit den richtigen Produkten und der richtigen Technik werden Flächen makellos sauber, genau so geht Pearly Sky bei jeder Leistung vor.",
      ],
    },
    es: {
      title: "Por qué la limpieza ecológica importa para su salud",
      description:
        "Descubra los beneficios de los productos de limpieza no tóxicos y de origen vegetal para su familia y el medio ambiente.",
      body: [
        "Muchos limpiadores convencionales dejan vapores y residuos que permanecen en el aire y sobre las superficies mucho después de terminar. Para los niños, las mascotas y quienes tienen alergias o piel sensible, merece la pena pensarlo.",
        "Los productos no tóxicos y de origen vegetal limpian con eficacia sin la carga química agresiva. Son más amables con los pulmones y la piel, más seguros cerca de las zonas de preparación de alimentos y mejores para las aguas a las que acaban llegando.",
        "Elegir una limpieza ecológica no supone renunciar a los resultados. Con los productos y la técnica adecuados, las superficies quedan impecables, que es exactamente como Pearly Sky aborda cada servicio.",
      ],
    },
    it: {
      title: "Perché la pulizia ecologica è importante per la tua salute",
      description:
        "Scopri i vantaggi dei prodotti per la pulizia non tossici e di origine vegetale per la tua famiglia e per l'ambiente.",
      body: [
        "Molti detergenti tradizionali lasciano vapori e residui che restano nell'aria e sulle superfici molto dopo la fine del lavoro. Per bambini, animali e chi soffre di allergie o ha la pelle sensibile, vale la pena pensarci.",
        "I prodotti non tossici e di origine vegetale puliscono in modo efficace senza il carico chimico aggressivo. Sono più gentili con polmoni e pelle, più sicuri vicino alle zone di preparazione dei cibi e migliori per le acque in cui finiscono.",
        "Scegliere la pulizia ecologica non significa rinunciare ai risultati. Con i prodotti e la tecnica giusti le superfici tornano impeccabili, ed è esattamente l'approccio di Pearly Sky a ogni servizio.",
      ],
    },
  },

  "deep-cleaning-checklist-room-by-room": {
    fr: {
      title: "Check-list de grand nettoyage : le guide pièce par pièce",
      description:
        "Une check-list complète pour obtenir un espace de vie impeccable et plus sain.",
      body: [
        "Un grand nettoyage va au-delà de la routine hebdomadaire. Dans la cuisine, cela signifie dégraisser la plaque et la hotte, nettoyer l'intérieur du four et du réfrigérateur, et détartrer les robinets. Dans la salle de bain, cela concerne les joints, les parois de douche, les canalisations et l'arrière des toilettes.",
        "Dans les pièces à vivre et les chambres, déplacez les meubles pour aspirer dessous, essuyez les plinthes et les cadres de porte, lavez les rideaux, et nettoyez à la vapeur ou au shampoing les tissus d'ameublement et les tapis. N'oubliez pas les fenêtres, les luminaires et le dessus des armoires, où la poussière s'accumule discrètement.",
        "Avancer pièce par pièce rend la tâche gérable. Si vous préférez la confier, les équipes de grand nettoyage de Pearly Sky suivent une check-list détaillée comme celle-ci dans chaque maison.",
      ],
    },
    de: {
      title: "Grundreinigungs-Checkliste: Der Raum-für-Raum-Ratgeber",
      description:
        "Eine vollständige Checkliste für einen makellosen und gesünderen Wohnraum.",
      body: [
        "Eine Grundreinigung geht über die wöchentliche Routine hinaus. In der Küche heißt das: Kochfeld und Dunstabzug entfetten, Backofen und Kühlschrank innen reinigen und Armaturen entkalken. Im Bad sind es Fugen, Duschwände, Abflüsse und die Fläche hinter der Toilette.",
        "In Wohn- und Schlafräumen Möbel verschieben, um darunter zu saugen, Fußleisten und Türrahmen abwischen, Vorhänge waschen und Polster sowie Teppiche dampfreinigen oder shampoonieren. Vergessen Sie nicht Fenster, Leuchten und die Oberseiten von Schränken, wo sich unbemerkt Staub sammelt.",
        "Raum für Raum vorzugehen hält die Aufgabe überschaubar. Wenn Sie sie lieber abgeben möchten: Die Grundreinigungsteams von Pearly Sky arbeiten in jedem Zuhause eine ausführliche Checkliste wie diese ab.",
      ],
    },
    es: {
      title: "Lista de limpieza a fondo: guía habitación por habitación",
      description:
        "Una lista completa para conseguir un espacio habitable impecable y más saludable.",
      body: [
        "Una limpieza a fondo va más allá de la rutina semanal. En la cocina implica desengrasar la placa y la campana, limpiar el interior del horno y la nevera, y descalcificar los grifos. En el baño, las juntas, las mamparas, los desagües y la parte trasera del inodoro.",
        "En salones y dormitorios, mueva los muebles para aspirar debajo, limpie rodapiés y marcos de puertas, lave las cortinas y limpie al vapor o con champú la tapicería y las alfombras. No olvide las ventanas, las lámparas y la parte superior de los armarios, donde el polvo se acumula sin que lo notemos.",
        "Ir habitación por habitación hace que la tarea sea manejable. Si prefiere delegarla, los equipos de limpieza a fondo de Pearly Sky siguen en cada hogar una lista detallada como esta.",
      ],
    },
    it: {
      title: "Checklist per la pulizia profonda: guida stanza per stanza",
      description:
        "Una checklist completa per ottenere uno spazio abitativo impeccabile e più sano.",
      body: [
        "Una pulizia profonda va oltre la routine settimanale. In cucina significa sgrassare piano cottura e cappa, pulire l'interno di forno e frigorifero e rimuovere il calcare dai rubinetti. In bagno riguarda fughe, box doccia, scarichi e la zona dietro il water.",
        "In soggiorno e in camera, sposta i mobili per aspirare sotto, pulisci battiscopa e stipiti, lava le tende e pulisci a vapore o con shampoo divani e tappeti. Non dimenticare finestre, lampade e la parte superiore degli armadi, dove la polvere si accumula in silenzio.",
        "Procedere una stanza alla volta rende il lavoro gestibile. Se preferisci affidarlo a qualcuno, i team di pulizia profonda di Pearly Sky seguono in ogni casa una checklist dettagliata come questa.",
      ],
    },
  },

  "clean-workspace-boosts-productivity": {
    fr: {
      title: "Comment un espace de travail propre stimule la productivité",
      description:
        "Découvrez comment un bureau propre et bien organisé peut améliorer la concentration, la santé et la performance.",
      body: [
        "Les gens remarquent leur environnement, même sans s'en rendre compte. Un bureau rangé et frais signale de l'attention, réduit les distractions et facilite la concentration, tandis que l'encombrement et la poussière visibles font l'inverse.",
        "La propreté influe aussi sur la santé. Les bureaux partagés, les claviers, les cuisines et les sanitaires sont des zones très touchées, et un nettoyage régulier et approfondi aide à limiter la propagation des maladies courantes et les jours de travail perdus.",
        "Un planning de nettoyage professionnel, organisé autour de vos horaires de travail, maintient le niveau sans perturber l'équipe. Pearly Sky adapte chaque plan à la taille et à l'usage de vos locaux.",
      ],
    },
    de: {
      title: "Wie ein sauberer Arbeitsplatz die Produktivität steigert",
      description:
        "Erfahren Sie, wie ein sauberes, gut organisiertes Büro Konzentration, Gesundheit und Leistung verbessern kann.",
      body: [
        "Menschen nehmen ihre Umgebung wahr, auch wenn sie es nicht merken. Ein aufgeräumtes, frisch riechendes Büro signalisiert Sorgfalt, lenkt weniger ab und erleichtert die Konzentration, während sichtbare Unordnung und Staub das Gegenteil bewirken.",
        "Sauberkeit wirkt sich auch auf die Gesundheit aus. Gemeinsam genutzte Schreibtische, Tastaturen, Küchen und Waschräume werden häufig berührt, und regelmäßige, gründliche Reinigung hilft, die Ausbreitung alltäglicher Erkrankungen und die damit verbundenen Ausfalltage zu verringern.",
        "Ein professioneller Reinigungsplan für Gewerbeflächen, abgestimmt auf Ihre Arbeitszeiten, hält den Standard stabil, ohne das Team zu stören. Pearly Sky stimmt jeden Plan auf Größe und Nutzung Ihrer Räume ab.",
      ],
    },
    es: {
      title: "Cómo un espacio de trabajo limpio aumenta la productividad",
      description:
        "Descubra cómo una oficina limpia y ordenada puede mejorar la concentración, la salud y el rendimiento.",
      body: [
        "Las personas notan su entorno, aunque no se den cuenta. Una oficina ordenada y con buen olor transmite cuidado, reduce las distracciones y facilita la concentración, mientras que el desorden y el polvo visibles hacen lo contrario.",
        "La limpieza también afecta a la salud. Los escritorios compartidos, los teclados, las cocinas y los aseos son zonas de mucho contacto, y una limpieza regular y a fondo ayuda a reducir el contagio de enfermedades comunes y los días de trabajo que cuestan.",
        "Un calendario profesional de limpieza comercial, planificado según sus horarios, mantiene el nivel sin interrumpir al equipo. Pearly Sky adapta cada plan al tamaño y al uso de su espacio.",
      ],
    },
    it: {
      title: "Come uno spazio di lavoro pulito aumenta la produttività",
      description:
        "Scopri come un ufficio pulito e ordinato può migliorare concentrazione, salute e rendimento.",
      body: [
        "Le persone notano l'ambiente che le circonda, anche senza accorgersene. Un ufficio ordinato e dal buon profumo comunica cura, riduce le distrazioni e facilita la concentrazione, mentre disordine e polvere visibili fanno l'opposto.",
        "La pulizia influisce anche sulla salute. Scrivanie condivise, tastiere, cucine e bagni sono aree molto toccate, e una pulizia regolare e accurata aiuta a ridurre la diffusione dei malanni di stagione e i giorni di lavoro persi.",
        "Un piano professionale di pulizia commerciale, organizzato intorno ai tuoi orari di lavoro, mantiene lo standard senza disturbare il team. Pearly Sky adatta ogni piano alle dimensioni e all'uso dei tuoi spazi.",
      ],
    },
  },

  "maintaining-your-holiday-property-in-france": {
    fr: {
      title: "Entretenir votre résidence de vacances en France",
      description:
        "Conseils professionnels de nettoyage et d'entretien pour les locations de luxe, les villas et les résidences secondaires.",
      body: [
        "Une résidence de vacances qui reste vide pendant des semaines accumule discrètement poussière, humidité et air confiné. Une routine de passage régulière, avec fenêtres ouvertes, robinets purgés et surfaces essuyées, évite que de petits problèmes ne deviennent coûteux.",
        "Avant chaque saison, prévoyez un nettoyage plus approfondi : linge et matelas rafraîchis, terrasses et mobilier d'extérieur lavés, cuisines et salles de bain détartrées. Après chaque séjour, une remise en état rapide garde le bien prêt pour la prochaine arrivée.",
        "Si vous n'êtes pas sur place, une équipe locale de confiance fait toute la différence. Pearly Sky s'occupe des résidences de vacances partout en France pour qu'elles soient toujours propres, saines et prêtes à votre arrivée ou à celle de vos invités.",
      ],
    },
    de: {
      title: "Ihr Ferienobjekt in Frankreich richtig pflegen",
      description:
        "Professionelle Reinigungs- und Pflegetipps für Luxusvermietungen, Villen und Ferienhäuser.",
      body: [
        "Ein Ferienhaus, das wochenlang leer steht, sammelt unbemerkt Staub, Feuchtigkeit und abgestandene Luft. Eine regelmäßige Kontrollroutine mit geöffneten Fenstern, laufenden Wasserhähnen und abgewischten Flächen verhindert, dass aus kleinen Problemen teure werden.",
        "Planen Sie vor jeder Saison eine gründlichere Reinigung ein: Bettwäsche und Matratzen auffrischen, Terrassen und Gartenmöbel waschen, Küchen und Bäder entkalken. Nach jedem Aufenthalt hält ein schneller Neustart das Objekt für die nächste Ankunft bereit.",
        "Wenn Sie nicht in der Nähe sind, macht ein vertrauenswürdiges lokales Team den Unterschied. Pearly Sky betreut Ferienobjekte in ganz Frankreich, damit sie stets sauber, sicher und bereit sind, wenn Sie oder Ihre Gäste ankommen.",
      ],
    },
    es: {
      title: "Cómo mantener su propiedad vacacional en Francia",
      description:
        "Consejos profesionales de limpieza y mantenimiento para alquileres de lujo, villas y segundas residencias.",
      body: [
        "Una casa de vacaciones que permanece vacía durante semanas acumula silenciosamente polvo, humedad y aire viciado. Una rutina regular de visitas, con ventanas abiertas, grifos abiertos y superficies limpias, evita que los pequeños problemas se conviertan en costosos.",
        "Antes de cada temporada, programe una limpieza más a fondo: ropa de cama y colchones renovados, terrazas y muebles de exterior lavados, cocinas y baños descalcificados. Tras cada estancia, un repaso rápido deja la propiedad lista para la siguiente llegada.",
        "Si no vive cerca, un equipo local de confianza marca la diferencia. Pearly Sky cuida propiedades vacacionales en toda Francia para que estén siempre limpias, seguras y listas cuando lleguen usted o sus invitados.",
      ],
    },
    it: {
      title: "Come mantenere la tua casa vacanze in Francia",
      description:
        "Consigli professionali di pulizia e manutenzione per affitti di lusso, ville e case vacanza.",
      body: [
        "Una casa vacanze che resta vuota per settimane accumula silenziosamente polvere, umidità e aria stantia. Una routine regolare di controlli, con finestre aperte, rubinetti fatti scorrere e superfici pulite, evita che piccoli problemi diventino costosi.",
        "Prima di ogni stagione, programma una pulizia più approfondita: biancheria e materassi rinfrescati, terrazze e arredi da esterno lavati, cucine e bagni decalcificati. Dopo ogni soggiorno, una rapida sistemazione tiene la proprietà pronta per il prossimo arrivo.",
        "Se non abiti vicino, un team locale di fiducia fa la differenza. Pearly Sky si prende cura delle case vacanza in tutta la Francia perché siano sempre pulite, sicure e pronte quando arrivi tu o i tuoi ospiti.",
      ],
    },
  },

  "pet-friendly-cleaning-tips-for-a-fresher-home": {
    fr: {
      title: "Conseils de nettoyage adaptés aux animaux pour une maison plus fraîche",
      description:
        "Gardez votre maison propre et sans odeurs tout en offrant un espace sûr et confortable à vos animaux.",
      body: [
        "Les animaux apportent de la joie, mais aussi des poils, des pellicules et quelques accidents. Aspirez souvent avec un bon filtre, lavez la literie de vos animaux chaque semaine et brossez-les régulièrement pour limiter les poils sur les meubles.",
        "Choisissez des produits doux et sans vapeurs agressives, car les animaux marchent sur les surfaces que nous nettoyons, et les lèchent. En cas d'accident, épongez d'abord, puis utilisez un nettoyant enzymatique pour éliminer l'odeur plutôt que la masquer.",
        "Les produits non toxiques et sans danger pour les animaux de Pearly Sky gardent votre maison fraîche sans souci pour ceux qui la partagent avec vous.",
      ],
    },
    de: {
      title: "Haustierfreundliche Reinigungstipps für ein frischeres Zuhause",
      description:
        "Halten Sie Ihr Zuhause sauber und geruchsfrei und schaffen Sie zugleich einen sicheren, komfortablen Ort für Ihre Tiere.",
      body: [
        "Haustiere bringen Freude, aber auch Haare, Schuppen und gelegentliche Missgeschicke. Saugen Sie oft mit einem guten Filter, waschen Sie die Tierbetten wöchentlich und bürsten Sie Ihre Tiere regelmäßig, damit weniger Haare auf den Möbeln landen.",
        "Wählen Sie sanfte Reinigungsprodukte ohne scharfe Dämpfe, denn Tiere laufen über die gereinigten Flächen und lecken daran. Bei Missgeschicken zuerst abtupfen, dann einen enzymbasierten Reiniger verwenden, damit der Geruch beseitigt statt überdeckt wird.",
        "Die schadstofffreien, haustiersicheren Produkte von Pearly Sky halten Ihr Zuhause frisch, ohne dass Sie sich um die Tiere sorgen müssen, die es mit Ihnen teilen.",
      ],
    },
    es: {
      title: "Consejos de limpieza para mascotas y un hogar más fresco",
      description:
        "Mantenga su hogar limpio y sin olores mientras ofrece un espacio seguro y cómodo para sus mascotas.",
      body: [
        "Las mascotas dan alegría, pero también pelo, caspa y algún que otro accidente. Aspire a menudo con un buen filtro, lave la cama de su mascota cada semana y cepille a sus animales con regularidad para que haya menos pelo en los muebles.",
        "Elija productos suaves y sin vapores fuertes, ya que las mascotas caminan sobre las superficies que limpiamos y las lamen. Si hay un accidente, absorba primero y use después un limpiador enzimático para eliminar el olor en lugar de taparlo.",
        "Los productos no tóxicos y seguros para mascotas de Pearly Sky mantienen su hogar fresco sin preocuparle por los animales que lo comparten.",
      ],
    },
    it: {
      title: "Consigli di pulizia a misura di animale per una casa più fresca",
      description:
        "Mantieni la casa pulita e senza odori garantendo uno spazio sicuro e confortevole per i tuoi animali.",
      body: [
        "Gli animali portano gioia, ma anche peli, forfora e qualche incidente. Passa spesso l'aspirapolvere con un buon filtro, lava ogni settimana la cuccia e spazzola regolarmente i tuoi animali per ridurre i peli sui mobili.",
        "Scegli prodotti delicati e privi di vapori aggressivi, perché gli animali camminano sulle superfici che puliamo e le leccano. In caso di incidente, assorbi prima, poi usa un detergente enzimatico per eliminare l'odore invece di coprirlo.",
        "I prodotti non tossici e sicuri per gli animali di Pearly Sky mantengono la tua casa fresca senza preoccupazioni per chi la condivide con te.",
      ],
    },
  },

  "the-future-of-sustainable-cleaning-in-europe": {
    fr: {
      title: "L'avenir du nettoyage durable en Europe",
      description:
        "Comment les services de nettoyage éco-certifiés façonnent un avenir plus propre, plus vert et plus sain.",
      body: [
        "Partout en Europe, les ménages et les entreprises exigent davantage des services qu'ils engagent. Les clients veulent savoir ce que contiennent les produits, comment l'eau et les déchets sont gérés, et si le prestataire peut le démontrer par une certification crédible.",
        "Il en résulte un virage vers des formules d'origine végétale, des méthodes à la vapeur et en microfibre qui utilisent moins de chimie, et du matériel réutilisable à la place des articles à usage unique. Le nettoyage devient une composante visible de la façon dont les organisations atteignent leurs objectifs de durabilité.",
        "Pearly Sky participe à ce mouvement, en intégrant son standard éco-luxe à chaque service pour qu'un espace plus propre ne se fasse pas aux dépens de la planète.",
      ],
    },
    de: {
      title: "Die Zukunft der nachhaltigen Reinigung in Europa",
      description:
        "Wie öko-zertifizierte Reinigungsdienste eine sauberere, grünere und gesündere Zukunft gestalten.",
      body: [
        "In ganz Europa erwarten Haushalte und Unternehmen mehr von den Dienstleistungen, die sie beauftragen. Kunden wollen wissen, was in den Produkten steckt, wie mit Wasser und Abfall umgegangen wird und ob ein Anbieter dies mit glaubwürdigen Zertifikaten belegen kann.",
        "Die Folge ist ein Wandel hin zu Rezepturen auf pflanzlicher Basis, zu Dampf- und Mikrofasermethoden mit weniger Chemie und zu wiederverwendbarer Ausrüstung statt Einwegartikeln. Reinigung wird zu einem sichtbaren Teil der Art, wie Organisationen ihre Nachhaltigkeitsziele erreichen.",
        "Pearly Sky ist Teil dieses Wandels und baut seinen Öko-Luxus-Standard in jede Leistung ein, damit ein saubererer Raum nicht auf Kosten des Planeten geht.",
      ],
    },
    es: {
      title: "El futuro de la limpieza sostenible en Europa",
      description:
        "Cómo los servicios de limpieza con certificación ecológica están dando forma a un mañana más limpio, verde y saludable.",
      body: [
        "En toda Europa, los hogares y las empresas exigen más a los servicios que contratan. Los clientes quieren saber qué contienen los productos, cómo se gestionan el agua y los residuos, y si el proveedor puede demostrarlo con una certificación creíble.",
        "El resultado es un cambio hacia fórmulas de origen vegetal, métodos con vapor y microfibra que usan menos química, y equipos reutilizables en lugar de artículos de un solo uso. La limpieza se está convirtiendo en una parte visible de cómo las organizaciones alcanzan sus objetivos de sostenibilidad.",
        "Pearly Sky forma parte de ese cambio e incorpora su estándar eco-lujo en cada servicio, para que un espacio más limpio no se logre a costa del planeta.",
      ],
    },
    it: {
      title: "Il futuro della pulizia sostenibile in Europa",
      description:
        "Come i servizi di pulizia con certificazione ecologica stanno plasmando un domani più pulito, verde e sano.",
      body: [
        "In tutta Europa, famiglie e aziende chiedono di più ai servizi che scelgono. I clienti vogliono sapere cosa c'è nei prodotti, come vengono gestiti acqua e rifiuti, e se un fornitore può dimostrarlo con una certificazione credibile.",
        "Ne deriva uno spostamento verso formulazioni di origine vegetale, metodi a vapore e in microfibra che usano meno chimica e attrezzature riutilizzabili al posto di articoli monouso. La pulizia sta diventando una parte visibile del modo in cui le organizzazioni raggiungono i propri obiettivi di sostenibilità.",
        "Pearly Sky fa parte di questo cambiamento e integra il suo standard eco-lusso in ogni servizio, perché uno spazio più pulito non sia a spese del pianeta.",
      ],
    },
  },

  "professional-cleaning-for-luxury-rentals": {
    fr: {
      title: "L'importance du nettoyage professionnel pour les locations de luxe",
      description:
        "Offrez des expériences inoubliables à vos invités grâce à des biens constamment propres et bien entretenus.",
      body: [
        "Pour une location de luxe, la propreté est le produit. Les voyageurs jugent un séjour dès les premières minutes, et les avis reflètent vite le moindre détail oublié, d'un cheveu égaré à un miroir taché.",
        "Une équipe professionnelle de rotation travaille selon un standard reproductible : linge frais, équipements polis, produits d'accueil réapprovisionnés et inspection finale avant l'arrivée. Cette régularité protège vos évaluations et votre bien.",
        "Le nettoyage de locations de Pearly Sky est conçu pour des fenêtres de rotation serrées, afin que chaque voyageur arrive dans un bien aussi beau que sur les photos.",
      ],
    },
    de: {
      title: "Warum professionelle Reinigung für Luxusvermietungen wichtig ist",
      description:
        "Schaffen Sie unvergessliche Gästeerlebnisse mit durchgehend sauberen und gepflegten Objekten.",
      body: [
        "Bei einer Luxusvermietung ist Sauberkeit das Produkt. Gäste beurteilen einen Aufenthalt in den ersten Minuten, und Bewertungen spiegeln schnell jedes übersehene Detail wider, vom verirrten Haar bis zum verschmierten Spiegel.",
        "Ein professionelles Wechselteam arbeitet nach einem wiederholbaren Standard: frische Bettwäsche, polierte Armaturen, aufgefüllte Annehmlichkeiten und eine Abschlusskontrolle vor dem Check-in. Diese Beständigkeit schützt Ihre Bewertungen und Ihr Objekt.",
        "Die Vermietungsreinigung von Pearly Sky ist auf knappe Wechselzeiten ausgelegt, damit jeder Gast in einem Objekt ankommt, das so gut wirkt wie auf den Fotos.",
      ],
    },
    es: {
      title: "La importancia de la limpieza profesional en alquileres de lujo",
      description:
        "Cree experiencias inolvidables para sus huéspedes con propiedades siempre limpias y bien mantenidas.",
      body: [
        "En un alquiler de lujo, la limpieza es el producto. Los huéspedes juzgan una estancia en los primeros minutos, y las reseñas reflejan enseguida cualquier detalle pasado por alto, desde un pelo suelto hasta un espejo manchado.",
        "Un equipo profesional de cambio de huéspedes trabaja con un estándar repetible: ropa de cama fresca, accesorios pulidos, amenities repuestos y una inspección final antes de la llegada. Esa constancia protege sus valoraciones y su propiedad.",
        "La limpieza de alquileres de Pearly Sky está pensada para ventanas de cambio muy ajustadas, de modo que cada huésped llegue a una propiedad tan buena como en las fotos.",
      ],
    },
    it: {
      title: "L'importanza della pulizia professionale per gli affitti di lusso",
      description:
        "Crea esperienze indimenticabili per i tuoi ospiti con immobili sempre puliti e ben curati.",
      body: [
        "In un affitto di lusso, la pulizia è il prodotto. Gli ospiti giudicano un soggiorno nei primi minuti e le recensioni riflettono presto ogni dettaglio trascurato, da un capello fuori posto a uno specchio macchiato.",
        "Un team professionale per i cambi ospite lavora secondo uno standard ripetibile: biancheria fresca, accessori lucidati, cortesie reintegrate e un'ispezione finale prima del check-in. Questa costanza protegge le tue valutazioni e il tuo immobile.",
        "La pulizia per affitti di Pearly Sky è pensata per tempi di cambio molto stretti, così ogni ospite arriva in un immobile bello come nelle foto.",
      ],
    },
  },

  "creating-a-safer-home-for-your-family": {
    fr: {
      title: "Créer une maison plus sûre pour votre famille",
      description:
        "Des conseils pratiques pour réduire les allergènes, améliorer la qualité de l'air intérieur et protéger vos proches.",
      body: [
        "Une maison plus sûre commence par l'air et les surfaces que votre famille touche le plus. La poussière, le pollen et les pellicules animales s'accumulent dans les tapis, les textiles et la literie : aspirer souvent et laver régulièrement fait une vraie différence.",
        "Concentrez la désinfection sur les points de contact comme les poignées, les interrupteurs, les télécommandes et les plans de travail, et rangez les produits d'entretien hors de portée des enfants. Une bonne aération aide à garder un air intérieur frais et l'humidité sous contrôle.",
        "Pour plus de tranquillité, Pearly Sky propose une éco-désinfection efficace sans résidus agressifs, pour que vos proches soient protégés et que la maison reste douce pour eux.",
      ],
    },
    de: {
      title: "Ein sichereres Zuhause für Ihre Familie schaffen",
      description:
        "Praktische Reinigungstipps, um Allergene zu verringern, die Raumluft zu verbessern und Ihre Liebsten zu schützen.",
      body: [
        "Ein sichereres Zuhause beginnt bei der Luft und den Flächen, die Ihre Familie am meisten berührt. Staub, Pollen und Tierschuppen sammeln sich in Teppichen, Polstermöbeln und Bettwäsche, daher machen häufiges Saugen und regelmäßiges Waschen einen echten Unterschied.",
        "Konzentrieren Sie das Desinfizieren auf häufig berührte Stellen wie Griffe, Schalter, Fernbedienungen und Arbeitsplatten und bewahren Sie Reinigungsmittel kindersicher auf. Gute Belüftung hält die Raumluft frisch und die Feuchtigkeit unter Kontrolle.",
        "Für zusätzliche Sicherheit bietet Pearly Sky eine Öko-Desinfektion, die ohne aggressive Rückstände wirkt, damit Ihre Liebsten geschützt sind und das Zuhause schonend für sie bleibt.",
      ],
    },
    es: {
      title: "Cómo crear un hogar más seguro para su familia",
      description:
        "Consejos prácticos de limpieza para reducir alérgenos, mejorar la calidad del aire interior y proteger a sus seres queridos.",
      body: [
        "Un hogar más seguro empieza por el aire y las superficies que su familia toca más. El polvo, el polen y la caspa de las mascotas se acumulan en alfombras, tapicerías y ropa de cama, por lo que aspirar a menudo y lavar con regularidad marca una diferencia real.",
        "Centre la desinfección en los puntos de contacto como tiradores, interruptores, mandos a distancia y encimeras, y guarde los productos de limpieza fuera del alcance de los niños. Una buena ventilación ayuda a mantener fresco el aire interior y la humedad bajo control.",
        "Para mayor tranquilidad, Pearly Sky ofrece una eco-desinfección eficaz sin residuos agresivos, de modo que sus seres queridos estén protegidos y el hogar siga siendo amable con ellos.",
      ],
    },
    it: {
      title: "Creare una casa più sicura per la tua famiglia",
      description:
        "Consigli pratici di pulizia per ridurre gli allergeni, migliorare la qualità dell'aria interna e proteggere i tuoi cari.",
      body: [
        "Una casa più sicura parte dall'aria e dalle superfici che la tua famiglia tocca di più. Polvere, polline e forfora degli animali si accumulano in tappeti, tessuti d'arredo e biancheria, quindi aspirare spesso e lavare regolarmente fa una vera differenza.",
        "Concentra la disinfezione sui punti di contatto come maniglie, interruttori, telecomandi e piani di lavoro e conserva i prodotti per la pulizia fuori dalla portata dei bambini. Una buona ventilazione aiuta a mantenere fresca l'aria interna e sotto controllo l'umidità.",
        "Per maggiore tranquillità, Pearly Sky offre una eco-disinfezione efficace senza residui aggressivi, così i tuoi cari sono protetti e la casa resta delicata con loro.",
      ],
    },
  },
};
