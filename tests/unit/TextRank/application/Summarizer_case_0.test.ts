import Summarizer from "../../../../src/TextRank/application/Summarizer";
import {AbsoluteSummarizerConfig} from "../../../../src/TextRank/application/SummarizerConfig";
import SorensenDiceSimilarity from '../../../../src/TextRank/domain/SorensenDiceSimilarity';
import DefaultTextParser from '../../../../src/TextRank/domain/DefaultTextParser';
import NullLogger from '../../../../src/TextRank/infraestructure/NullLogger';

describe("Summarizer", () => {
    it("Should summarize text", () => {
        const txt=`Por qué hay guerra
        Países apoyan Rusia
        Lotería del niño
        Área de usuario
        Ir al perfil
        Fotos Viñetas Escaparate El tiempo Obituarios Servicios Blogs
        © TITANIA COMPAÑÍA EDITORIAL, S.L. 2022. España. Todos los derechos reservados
        Condiciones Política de privacidad Transparencia Auditado por Comscore
        El Kremlin pide la 'cabeza' de Zelenski y la OTAN avisa: "Los objetivos de Rusia no están limitados a Ucrania"
        AMENAZAS A SUECIA Y FINLANDIA
        El Kremlin pide la 'cabeza' de Zelenski y la OTAN avisa: "Los objetivos de Rusia no están limitados a Ucrania"
        Los líderes de la Alianza Atlántica celebraron un encuentro virtual para coordinar sus posiciones tras la invasión rusa de Ucrania. La OTAN acusa a Vladimir Putin de haber cometido un "terrible error estratégico" con la invasión
        El secretario general de la OTAN, Jens Stoltenberg. (Reuters/Yves Herman)
        Por Nacho Alarcón. Bruselas A. A.
        26/02/2022 - 00:02 Actualizado: 26/02/2022 - 07:21
        El Kremlin comienza a dibujar objetivos concretos para su invasión a Ucrania y el primero es claro: quiere 'la cabeza' de Volodímir Zelenski. La salida del presidente ucraniano es una exigencia para que Moscú acepte sentarse a la mesa de negociaciones y detener las hostilidades. Sin embargo, Zelenski ya ha avisado que no va a rendirse ni va a abandonar el país, pese a que las tropas rusas ya cercan Kiev. La pérdida de la capital parece inminente.
        El Gobierno de Zelenski ha llegado a poner sobre la mesa la opción de negociar "un estatus neutral" para el país. Pero Vladimir Putin ha despreciado la rama de olivo —incluyendo la mediación de Israel— y en su lugar ha llamado a las fuerzas armadas ucranianas a "tomar el poder". "Me parece que va a ser más fácil ponernos de acuerdo con vosotros [para firmar un acuerdo de paz] que con esta banda de drogadictos y neonazis", dijo el presidente ruso en una intervención televisada el viernes refiriéndose despectivamente al liderazgo de Zelenski, quien tiene raíces judías y del este de Ucrania.
        Mientras, sobre el terreno, la ocupación rusa sigue avanzando en varios frentes. Durante la jornada del viernes, el Ejército ruso bombardeó Kiev, tomó el aeródromo clave de Hostomel y sus soldados ya se apostan en algunos barrios a las afueras de la ciudad de tres millones de habitantes. También se recrudecen los combates en Járkov, la segunda ciudad más importante del país, y el enclave portuario de Mariúpol, donde Rusia está organizando un asalto anfibio con miles de infantes de marina en las costas del Mar Azov.
        El Pentágono ha asegurado que la ocupación ha perdido 'momentum', que la defensa antiaérea ucraniana está resistiendo y que el centro de mando militar permanece intacto. Muestra de ello, dicen, es que muchos centros poblados no están siendo ocupados. Sin embargo, Rusia apenas ha desplegado un tercio de las fuerzas de combate que acumula en la frontera. Mientras, miles de ucranianos siguen abandonando el país por tierra —el espacio aéreo está cerrado— hacia las vecinas Polonia, Hungría y Moldavia (al menos 50.000, según ACNUR).
        La crisis que viene: ¿podrá Europa digerir la avalancha de refugiados de Ucrania?
        Más allá de Ucrania
        Pese a su previsible éxito militar —el Ejército ruso es muy superior al ucraniano—, la OTAN cree que Putin ha cometido un grave error de cálculo que va a arrastrar a Rusia a un largo periodo de aislamiento y sufrimiento económico y político. Si el objetivo de Moscú era desmoralizar a la Alianza Atlántica, la invasión refuerza la voluntad de los socios para garantizar la arquitectura de la seguridad europea. En una reunión de emergencia este viernes, los jefes de Estado y de Gobierno de la OTAN se han comprometido a hacer "todos los despliegues necesarios para garantizar una disuasión y una defensa sólidas y creíbles en toda la Alianza, ahora y en el futuro".
        "Los objetivos del Kremlin no están limitados a Ucrania", ha advertido el secretario general de la Alianza, Jens Stoltenberg, poco después de que Moscú —a través de la portavoz del Ministerio de Asuntos Exteriores de Rusia, Maria Zajarova— haya amenazado directamente Finlandia y Suecia con "serias consecuencias político-militares" si deciden unirse al pacto de defensa occidental. "No debe haber espacio para los errores de cálculo. Haremos lo que haga falta para defender cada aliado y cada pulgada de territorio [de los estados socios de la OTAN]", ha asegurado Stoltenberg, sombrío y pesimista, en la rueda de prensa posterior al encuentro.
        La ofensiva rusa sobre Ucrania y el agresivo discurso de Putin está provocando un brusco viraje de la opinión pública de ambos países nórdicos, que cada vez ven con mejores ojos una eventual adhesión a la Alianza. La propia primera ministra finlandesa, Sanna Marin, había hecho saber este pasado jueves que la invasión rusa de Ucrania "cambiaría el sentido del debate" sobre la entrada de su país a la OTAN.
        Refuerzo del flanco este
        Por lo pronto, la OTAN ha acordado la activación por primera vez en su historia de la Fuerza de Respuesta Rápida, que se compone de hasta 40.000 efectivos de acción rápida, para desplegarse en el flanco este europeo listos para cualquier eventualidad. Sin embargo, sigue fuera de la mesa la posibilidad de actuar militarmente en Ucrania, pese a los llamados desesperados de Zelenski.
        "Estamos aumentando nuestra presencia no para provocar un conflicto, sino para prevenirlo", ha señalado el secretario general, quien ha alabado a las fuerzas ucranianas que están "luchando con valentía" e infligiendo severos daños a las fuerzas rusas.
        Las tropas rusas avanzan hacia el barrio gubernamental de Kiev, donde creen que está Zelenski
        Putin, que se mostró intratable en las idas y venidas diplomáticas para evitar el conflicto, avisó que cualquiera que se interpusiera entre Rusia y Ucrania sufriría "consecuencias que jamás han visto en su historia", lo que se entendió en la mayoría de capitales occidentales como una amenaza de uso de armamento nuclear. "Creo que Vladimir Putin también debe entender que la Alianza Atlántica es una alianza nuclear", respondió el ministro de Asuntos Exteriores francés, Jean-Yves Le Drian.
        Mientras, Occidente ha implementado hasta la fecha un paquete de sanciones que dista mucho de ser el disuasivo histórico que habían anunciado. Entre las críticas del Gobierno ucraniano y algunos de las capitales europeas, Bruselas está confeccionando una nueva serie de sanciones cuyo objetivo directo serían las finanzas personales de Putin y su ministro de Asuntos Exteriores, Sergei Lavrov.
        El debate último es si activar el 'botón nuclear financiero' y sacar a Rusia del sistema SWIFT —que gestiona las transferencias internacionales entre bancos—. Estados Unidos, Gran Bretaña o Francia están entre los que apoyan la controvertida medida, a la que se oponen Alemania, Hungría e Italia entre otros. "Todos los que duden de si Rusia debe ser expulsada de SWIFT deben entender que la sangre de ucranianos inocentes, hombres, mujeres y niños, estarán también en vuestras manos", dijo el ministro de Exteriores de Ucrania, Dmytro Kuleba.
        LaLiga y Microsoft estrechan lazos para elevar la experiencia digital de los aficionados
        Ucrania ya siente el aliento de Putin en la nuca: "Se ríen del peligro como forma de protección"
        Todos en Ciudad Rodrigo están comprando esta alarma económica que asusta a los ladrones
        Al descubierto: El coste real de los paneles solares
        The Eco Experts
        Guerra Ucrania Rusia | Kiev vive una noche "muy difícil" con disparos y explosiones
        La UER expulsa a Rusia de Eurovisión 2022 tras la invasión a Ucrania
        ¿Qué pasará con la sequía en España tras la DANA? El pronóstico del tiempo sobre las lluvias
        La Fiscalía salvadoreña acusa a 13 personas por la masacre de jesuitas españoles en 1989
        Un día siguiendo la invasión por TelePutin: ¿por qué Europa protege a los nazis ucranios?
        El Kremlin pide la 'cabeza' de Zelenski y la OTAN avisa: "Los objetivos de Rusia no están limitados a Ucrania"
        La superpotencia ingenua: ¿está despertando Alemania al nuevo orden mundial?
        La batalla clave de Londongrado: aquí está el verdadero frente del dinero y poder de Putin
        El redactor recomienda
        Rusia amenaza a Finlandia y Suecia con "repercusiones político-militares" si entra en la OTAN
        Todos los amigos de Putin
        La UE y EEUU sancionan a Putin y Lavrov por la invasión de Ucrania congelando sus activos
        Nacho Alarcón. Bruselas
        Trabaja con nosotros
        © TITANIA COMPAÑÍA EDITORIAL, S.L. 2022. España. Todos los derechos reservados Condiciones Política de Privacidad Política de Cookies Transparencia Auditado por ComScore`
        
        const sim = new SorensenDiceSimilarity()
        const parser = new DefaultTextParser()
        const config = new AbsoluteSummarizerConfig(5,sim,parser,.85,Summarizer.SORT_SCORE)
        const logger = new NullLogger()
        const summarizer = new Summarizer(config, logger)

        const sentences = summarizer.summarize(txt, 'es')

        //console.log(sentences)

        expect(sentences).toHaveLength(5)
    })
})