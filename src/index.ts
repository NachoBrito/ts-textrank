import DefaultTextParser from "./TextRank/domain/DefaultTextParser"
import SorensenDiceSimilarity from "./TextRank/domain/SorensenDiceSimilarity"
import Summarizer from "./TextRank/domain/Summarizer"
import { AbsoluteSummarizerConfig, RelativeSummarizerConfig } from "./TextRank/domain/SummarizerConfig"
import ConsoleLogger from "./TextRank/infraestructure/ConsoleLogger"

const text=`La guerra ruso-ucraniana, denominado también como intervención rusa en Ucrania, es un conflicto que ha tenido varias etapas, surgido desde el año 2014. Destaca la adhesión de Crimea a Rusia en 2014 y la guerra del Donbás que comenzó ese mismo año y que aún continúa. Las manifestaciones de Euromaidán —inicio del conflicto ucraniano— comenzaron en noviembre de 2013 en Kiev debido a la suspensión de la firma del Acuerdo de Asociación entre Ucrania y la Unión Europea.

El 22 de febrero de 2014, tras varios meses de protestas y disturbios y tras el llamado Jueves Negro (20 de febrero) en el que murieron más de 60 manifestantes, los opositores tomaron las riendas del país y ocuparon irregularmente las principales instituciones con sede en Kiev. Seguidamente, la Rada Suprema tomó el control del país en ausencia de buena parte de sus miembros y Oleksandr Turchínov asumió la coordinación del Gobierno y la presidencia del Parlamento, cayendo así el gobierno de Víktor Yanukóvich. La Rada Suprema destituyó del cargo a Yanukóvich y tomó el control del país votando la vuelta a la Constitución de 2004, acordada el día anterior. Rusia no reconoció este gobierno como autoridad legítima de Ucrania y declaró que lo ocurrido fue un «golpe de Estado». En consecuencia, el Congreso de diputados y gobernadores regionales del Este y Sur de Ucrania hizo un llamamiento a la resistencia y acusó a la oposición de incumplir el acuerdo de paz que había sido firmado el 21 de febrero con el destituido presidente. A partir de entonces, residentes de la mitad suroriental de Ucrania se manifestaron en contra del nuevo gobierno de Kiev.

Por su parte, la crisis de Crimea comenzó en febrero del año 2014 cuando el gobierno regional realizó el referéndum separatista sobre el estatus político de Crimea. Se produjo una intervención militar, donde las Fuerzas Armadas de Rusia se desplegaron en la península de Crimea y en Sebastopol, con el objetivo de garantizar la integridad de los ucranianos prorrusos habitantes de Crimea y las bases rusas estacionadas allí, hasta que se normalizara la situación socio-política; desoyendo las advertencias de no invadir lanzadas por Estados Unidos y Kiev. Así, el 17 de mayo, fue proclamada la independencia de la República de Crimea y al día siguiente fue aprobada la adhesión de Crimea a Rusia. Esto fue rechazado por Estados Unidos, la Unión Europea y otros Estados soberanos, generalmente occidentales, mientras fue apoyada por países como Bielorrusia, Corea del Norte, Siria y Venezuela; la Asamblea General de las Naciones Unidas, mediante su resolución 68/262, rechazó la incorporación de Crimea. En los días posteriores, las tropas militares ucranianas se enfrentaron en contados incidentes con el ejército ruso hasta finalmente replegarse y hacer abandono de la península, aunque el gobierno ucraniano aún considera Crimea como parte de su territorio de iure.

Entre tanto, la guerra del Donbás comenzó el 6 de abril de 2014. El gobierno interino de Ucrania inició un operativo armado contra los grupos armados rusos que llegaron al este de Ucrania tras la anexión de Crimea. Las tropas rusas invadieron el territorio del este de Ucrania y las tropas ucranianas lanzaron una operación antiterrorista. El principal núcleo de estos grupos, la ciudad de Slaviansk, fue sitiada por el ejército ucraniano y se enfrentaron en varios incidentes, dejando varios muertos. El conflicto se extendió a otras ciudades, como Kramatorsk y Mariúpol. Referendos independentistas de los separatistas locales fueron realizados el 11 de mayo en diversas zonas de las óblasts de Donetsk y Lugansk.

El día 14 de febrero de 2015, horas antes del inicio de la nueva tregua de Minsk II, firmada unos días antes, el área de Debáltsevo estaba sufriendo importantes combates y la guerra se aproximaba nuevamente más a las alrededores de Mariúpol. Debáltsevo que progresivamente está siendo tomada bajo el control de la milicia y sus alrededores son un foco de tensión después de la entrada en vigor del acuerdo de alto el fuego. La milicia informó que el fuego de artillería ucraniana se realiza desde el interior de la caldera. El 15 de abril de 2015 los separatistas toman bajo su control el pueblo de Shirókine. El 20 de mayo de 2015, se anunció que la confederación de Nueva Rusia quedaba disuelta.`
const lang = 'es'
const d = .85
const sim = new SorensenDiceSimilarity()
const parser = new DefaultTextParser()
const logger = new ConsoleLogger()
//const config = new AbsoluteSummarizerConfig(5,sim,parser,d, Summarizer.SORT_OCCURENCE)
const config = new RelativeSummarizerConfig(.1,sim,parser,d,Summarizer.SORT_OCCURENCE)
const summarizer = new Summarizer(config,logger)
summarizer.debug = true
const t0 = performance.now()
const summary = summarizer.summarize(text, lang)
const t1 = performance.now()
const t = t1 - t0
logger.info("Summary generated in %d ms:\n%s", t ,summary)