# -*- coding: utf-8 -*-
# Generateur du catalogue Skyalys. Produit src/lib/catalog.ts.
# Donnees compactes par molecule ; prix cales sur la reference marche (Optima) quand connus.
import json, re, io

CATS = [
    ("metabolique", "Métabolique", "Incrétines, amyline, AMPK",
     "Agonistes des récepteurs incrétines, analogues de l’amyline et activateurs métaboliques pour l’étude de la signalisation GLP-1 / GIP / glucagon et de l’homéostasie énergétique in vitro."),
    ("myo-science", "Myo-Science", "Axe GH / IGF-1, muscle",
     "Sécrétagogues de l’hormone de croissance, facteurs de croissance et modulateurs de la myostatine pour l’étude de l’axe GH / IGF-1 et du développement tissulaire."),
    ("recherche-tissulaire", "Recherche Tissulaire", "Réparation, angiogenèse",
     "Peptides étudiés dans les modèles de migration cellulaire, d’angiogenèse, de cicatrisation, d’immunomodulation et de réparation tissulaire."),
    ("nootropiques", "Nootropiques", "Cognition, stress, sommeil",
     "Neuropeptides et analogues étudiés dans la neuroprotection, les facteurs neurotrophiques, le sommeil et la régulation du stress dans des modèles précliniques."),
    ("longevite", "Longévité", "Mitochondries, NAD+, sénescence",
     "Composés étudiés dans la biologie du vieillissement : fonction mitochondriale, métabolisme du NAD+, télomères, axes hormonaux et sénescence cellulaire."),
    ("skin-science", "Skin Science", "Matrice, collagène, pigmentation",
     "Peptides de recherche pour les modèles cutanés : synthèse de matrice extracellulaire, fibroblastes, kératinocytes, pigmentation et formulation cosmétique."),
    ("consommables", "Consommables", "Solvants, flacons, stockage",
     "Solvants de reconstitution, flacons et matériel de stockage pour la préparation et la conservation des peptides au laboratoire."),
]

LYO = "Poudre lyophilisée : −20 °C, à l’abri de la lumière et de l’humidité. Après reconstitution : 2 à 8 °C, aliquoter pour éviter les cycles de congélation et décongélation."
SOL = "Conserver à 2 à 8 °C, à l’abri de la lumière. Ne pas congeler sauf indication contraire."

# Chaque produit :
# slug, name, cat, fmt, summary, [synonyms], cas, formula, mm, pubchem,
# [(label, price)], mechanism, [areas], [("pubmed"/"pubchem", term)], flags
# flags: n=new, f=featured, r=regulated, q=quoteOnly
P = []
def add(slug,name,cat,fmt,summary,syn,cas,formula,mm,pubchem,variants,mech,areas,refs,flags=""):
    P.append(dict(slug=slug,name=name,cat=cat,fmt=fmt,summary=summary,syn=syn,cas=cas,
        formula=formula,mm=mm,pubchem=pubchem,variants=variants,mech=mech,areas=areas,refs=refs,
        new=("n" in flags),featured=("f" in flags),regulated=("r" in flags),quoteOnly=("q" in flags)))

pm=lambda t:("pubmed",t); pc=lambda t:("pubchem",t)

# ---------- METABOLIQUE ----------
add("retatrutide","Retatrutide","metabolique","lyophilise",
 "Triple agoniste des récepteurs GIP, GLP-1 et glucagon, destiné à la pharmacologie comparative des incrétines in vitro.",
 ["LY3437943"],"2381089-83-2","C221H342N46O68",4731.33,"171390338",
 [("5 mg",54.99),("10 mg",94.99),("15 mg",129.99),("20 mg",154.99),("30 mg",214.99),("40 mg",254.99),("50 mg",279.99),("60 mg",304.99)],
 "La retatrutide active trois récepteurs couplés aux protéines G (GIPR, GLP-1R, GCGR). L’intérêt expérimental porte sur l’équilibre relatif des trois signaux, leur cinétique et leur dépendance au système cellulaire étudié.",
 ["Pharmacologie comparative des agonistes simples, doubles et triples","Mesure de l’activation récepteur par récepteur (AMPc, β-arrestine)","Internalisation et désensibilisation des RCPG","Modèles cellulaires de l’homéostasie énergétique"],
 [("url","Triple-Hormone-Receptor Agonist Retatrutide for Obesity: A Phase 2 Trial","Jastreboff et al., NEJM, 2023. DOI : 10.1056/NEJMoa2301972","https://doi.org/10.1056/NEJMoa2301972"),pc("retatrutide")],"f")

add("tirzepatide","Tirzepatide","metabolique","lyophilise",
 "Double agoniste des récepteurs GIP et GLP-1, référence pour comparer les agonistes incrétines simples, doubles et triples.",
 ["LY3298176"],"2023788-19-2","C225H348N48O68",4813.45,"166567236",
 [("10 mg",64.99),("15 mg",79.99),("20 mg",94.99),("30 mg",134.99),("40 mg",154.99),("50 mg",179.99),("60 mg",204.99),("100 mg",314.99),("120 mg",374.99)],
 "La tirzepatide combine une activité agoniste sur GIPR et GLP-1R au sein d’un même peptide acylé. Elle sert de comparateur pour isoler la contribution de chaque récepteur à la signalisation observée.",
 ["Biais de signalisation GIPR / GLP-1R","Comparaison avec les agonistes sélectifs du GLP-1R","Études de liaison et de déplacement de ligand"],
 [("url","Tirzepatide Once Weekly for the Treatment of Obesity","Jastreboff et al., NEJM, 2022. DOI : 10.1056/NEJMoa2206038","https://doi.org/10.1056/NEJMoa2206038"),pc("tirzepatide")],"f")

add("semaglutide","Sémaglutide","metabolique","lyophilise",
 "Agoniste sélectif du récepteur GLP-1, contrôle positif de référence pour les essais de signalisation incrétine.",
 ["NN9535"],"910463-68-2","C187H291N45O59",4113.58,None,
 [("10 mg",59.99),("15 mg",74.99),("20 mg",89.99),("30 mg",119.99)],
 "Analogue acylé du GLP-1 conçu pour résister à la DPP-4 et se lier à l’albumine. En recherche, il sert de contrôle positif pour l’activation sélective du GLP-1R.",
 ["Contrôle positif des essais GLP-1R","Stabilité peptidique et acylation","Liaison à l’albumine et pharmacocinétique préclinique"],
 [pm("semaglutide GLP-1"),pc("semaglutide")],"")

add("mazdutide","Mazdutide","metabolique","lyophilise",
 "Double agoniste des récepteurs GLP-1 et glucagon, étudié dans la signalisation métabolique comparée.",
 ["IBI362","LY3305677"],None,None,None,None,
 [("10 mg",99.99)],
 "La mazdutide active conjointement GLP-1R et GCGR. La recherche compare son profil à celui des agonistes GLP-1 seuls et des triples agonistes.",
 ["Co-activation GLP-1R / GCGR","Dépense énergétique en modèle cellulaire","Comparaison inter-agonistes"],
 [pm("mazdutide")],"n")

add("liraglutide","Liraglutide","metabolique","lyophilise",
 "Agoniste du récepteur GLP-1 à action prolongée, comparateur historique des analogues incrétines.",
 [],"204656-20-2","C172H265N43O51",3751.2,None,
 [("5 mg",49.99),("10 mg",84.99),("30 mg",199.99)],
 "Analogue acylé du GLP-1 lié à l’albumine. Utilisé comme comparateur de première génération dans les études de signalisation incrétine.",
 ["Comparateur GLP-1R","Acylation et demi-vie","Signalisation AMPc"],
 [pm("liraglutide GLP-1"),pc("liraglutide")],"r")

add("cagrilintide","Cagrilintide","metabolique","lyophilise",
 "Analogue acylé de l’amyline à longue durée d’action, pour l’étude du second axe de la signalisation métabolique.",
 ["NN9838"],None,None,None,None,
 [("5 mg",79.99),("10 mg",129.99)],
 "La cagrilintide agit sur les récepteurs de l’amyline et de la calcitonine (complexes CTR / RAMP), une voie distincte des incrétines.",
 ["Pharmacologie des récepteurs AMY1 à AMY3","Associations amyline et GLP-1 en modèle cellulaire","Sélectivité CTR / RAMP"],
 [pm("cagrilintide amylin"),pc("cagrilintide")],"n")

add("aod-9604","AOD-9604","metabolique","lyophilise",
 "Fragment modifié de l’hormone de croissance (176-191), étudié dans le métabolisme lipidique in vitro.",
 ["AOD9604"],"221231-10-3",None,None,None,
 [("2 mg",49.99),("5 mg",84.99),("10 mg",139.99)],
 "L’AOD-9604 reprend la région C-terminale de la GH. Il est étudié pour son influence sur la lipolyse et la lipogenèse dans des modèles adipocytaires, sans l’activité somatotrope de la GH entière.",
 ["Lipolyse et lipogenèse en adipocytes","Fragments de la GH","Métabolisme lipidique"],
 [pm("AOD9604"),pc("AOD9604")],"")

add("5-amino-1mq","5-Amino-1MQ","metabolique","lyophilise",
 "Inhibiteur sélectif de la NNMT, étudié dans le métabolisme énergétique des adipocytes.",
 [],"100130-61-4",None,None,None,
 [("5 mg",34.99),("10 mg",54.99),("50 mg",134.99)],
 "Le 5-Amino-1MQ inhibe la nicotinamide N-méthyltransférase (NNMT). La recherche étudie son effet sur le pool de NAD+ et la dépense énergétique adipocytaire.",
 ["Inhibition de la NNMT","Pool de NAD+ et SAM","Différenciation adipocytaire"],
 [pm("5-Amino-1MQ NNMT")],"n")

add("aicar","AICAR","metabolique","lyophilise",
 "Activateur de l’AMPK perméable aux cellules, outil classique pour moduler le métabolisme énergétique in vitro.",
 ["Acadésine","AICA riboside"],"2627-69-2","C9H14N4O5",258.23,None,
 [("50 mg",64.99),("100 mg",109.99)],
 "Une fois phosphorylé en ZMP, l’AICAR mime l’AMP et active l’AMPK. Outil pharmacologique de référence pour l’étude du métabolisme glucidique et lipidique.",
 ["Activation de l’AMPK","Captation du glucose et oxydation des acides gras","Biogenèse mitochondriale"],
 [pm("AICAR AMPK"),pc("acadesine")],"")

add("slu-pp-332","SLU-PP-332","metabolique","lyophilise",
 "Agoniste pan-ERR, étudié comme mimétique de l’exercice dans le métabolisme oxydatif.",
 [],None,None,None,None,
 [("5 mg",34.99),("10 mg",54.99)],
 "SLU-PP-332 active les récepteurs liés aux œstrogènes (ERRα/β/γ). La recherche l’étudie pour son influence sur le métabolisme oxydatif et la fonction mitochondriale.",
 ["Agonisme ERR","Métabolisme oxydatif","Mimétiques de l’exercice"],
 [pm("SLU-PP-332 ERR")],"n")

add("adipotide","Adipotide","metabolique","lyophilise",
 "Peptide proapoptotique ciblant la vascularisation du tissu adipeux, étudié en modèle préclinique.",
 ["FTPP","Prohibitin-TP01"],None,None,None,None,
 [("2 mg",39.99),("5 mg",69.99),("10 mg",109.99)],
 "L’adipotide cible la prohibitine de la vascularisation du tissu adipeux blanc et induit l’apoptose endothéliale dans des modèles précliniques.",
 ["Ciblage vasculaire du tissu adipeux","Apoptose endothéliale","Modèles précliniques d’obésité"],
 [pm("adipotide prohibitin")],"")

add("l-carnitine","L-Carnitine","metabolique","solution",
 "Transporteur d’acides gras vers la mitochondrie, réactif d’étude du métabolisme énergétique.",
 ["Lévocarnitine"],"541-15-1","C7H15NO3",161.2,None,
 [("200 mg",24.99),("400 mg",34.99),("600 mg",44.99),("1200 mg",69.99)],
 "La L-carnitine permet le transport des acides gras à longue chaîne dans la mitochondrie via la navette carnitine. Réactif d’étude de la β-oxydation.",
 ["β-oxydation mitochondriale","Navette carnitine (CPT1/CPT2)","Bioénergétique cellulaire"],
 [pc("L-carnitine")],"")

add("lipo-c","Lipo-C","metabolique","solution",
 "Formulation lipotrope de recherche combinant des agents méthyl-donneurs.",
 [],None,None,None,None,
 [("10 ml",39.99)],
 "Mélange lipotrope associant méthionine, inositol et choline. Étudié dans les modèles de métabolisme hépatique des lipides.",
 ["Métabolisme hépatique des lipides","Agents méthyl-donneurs","Transport des lipides"],
 [pm("methionine inositol choline lipotropic")],"")

add("mic-b12","MIC (Lipo-C + B12)","metabolique","solution",
 "Formulation lipotrope de recherche enrichie en vitamine B12.",
 ["Lipo C with B12"],None,None,None,None,
 [("10 ml",44.99)],
 "Association méthionine-inositol-choline complétée par la cyanocobalamine (B12), étudiée dans le métabolisme énergétique et lipidique.",
 ["Métabolisme lipidique","Cofacteurs B12","Agents méthyl-donneurs"],
 [pm("lipotropic B12 methionine inositol choline")],"")

# ---------- MYO-SCIENCE ----------
add("hgh","HGH (somatropine)","myo-science","lyophilise",
 "Hormone de croissance recombinante. Référence réglementée, disponible uniquement sur devis à des structures autorisées.",
 ["Somatropine","Hormone de croissance"],"12629-01-5",None,None,None,
 [("10 iu",0),("12 iu",0),("15 iu",0),("24 iu",0),("36 iu",0)],
 "La somatropine se lie au récepteur de la GH et déclenche la voie JAK2/STAT5 et la production hépatique d’IGF-1. Produit pharmaceutique strictement réglementé.",
 ["Axe GH / IGF-1","Signalisation JAK2/STAT5","Études sur récepteur de la GH"],
 [pm("growth hormone JAK2 STAT5")],"rq")

add("hgh-fragment-176-191","HGH Fragment 176-191","myo-science","lyophilise",
 "Fragment C-terminal de l’hormone de croissance, étudié dans le métabolisme lipidique.",
 ["HGH Frag 176-191"],"66004-57-7",None,None,None,
 [("5 mg",54.99),("10 mg",89.99)],
 "Ce fragment reprend la région 176-191 de la GH. Il est étudié pour son action sur la lipolyse sans l’activité de croissance de la GH entière.",
 ["Lipolyse adipocytaire","Fragments de la GH","Métabolisme lipidique"],
 [pm("growth hormone fragment 176-191")],"")

add("frag-17-23","Frag 17-23","myo-science","lyophilise",
 "Court fragment peptidique dérivé de la GH, utilisé en recherche métabolique.",
 ["HGH 17-23"],None,None,None,None,
 [("10 mg",49.99)],
 "Fragment synthétique court dérivé de la séquence de l’hormone de croissance, étudié dans des modèles métaboliques.",
 ["Fragments de la GH","Études de structure-activité","Métabolisme lipidique"],
 [pm("growth hormone peptide fragment")],"")

add("sermorelin","Sermorelin Acetate","myo-science","lyophilise",
 "Analogue du GHRH (1-29), sécrétagogue étudié dans l’axe GH / IGF-1.",
 ["GRF 1-29"],"86168-78-7",None,None,None,
 [("5 mg",44.99),("10 mg",69.99)],
 "La sermorélin reprend les 29 premiers acides aminés du GHRH et stimule le récepteur du GHRH sur les cellules somatotropes dans des modèles d’étude de l’axe GH.",
 ["Récepteur du GHRH","Sécrétion pulsatile de GH","Axe GH / IGF-1"],
 [pm("sermorelin GHRH"),pc("sermorelin")],"")

add("tesamorelin","Tesamorelin","myo-science","lyophilise",
 "Analogue stabilisé du GHRH, étudié dans l’axe GH / IGF-1 et le métabolisme lipidique.",
 [],"218949-48-5",None,None,None,
 [("2 mg",39.99),("5 mg",59.99),("10 mg",79.99),("20 mg",139.99)],
 "La tésamoréline est un analogue du GHRH stabilisé par un groupement trans-3-hexénoyl. Elle est étudiée pour son action sur la sécrétion de GH et le tissu adipeux viscéral.",
 ["Récepteur du GHRH","Tissu adipeux viscéral","Axe GH / IGF-1"],
 [pm("tesamorelin GHRH"),pc("tesamorelin")],"")

add("cjc-1295-dac","CJC-1295 (with DAC)","myo-science","lyophilise",
 "Analogue du GHRH à demi-vie prolongée par liaison à l’albumine (DAC).",
 [],"863288-34-0",None,None,None,
 [("2 mg",59.99),("5 mg",99.99)],
 "Le CJC-1295 avec DAC se lie de façon covalente à l’albumine, prolongeant son action sur le récepteur du GHRH dans les modèles de sécrétion de GH.",
 ["Récepteur du GHRH","Liaison à l’albumine (DAC)","Cinétique de sécrétion de GH"],
 [pm("CJC-1295 DAC GHRH")],"")

add("cjc-1295-no-dac","CJC-1295 (no DAC)","myo-science","lyophilise",
 "Analogue du GHRH (modified GRF 1-29) à action courte, sans DAC.",
 ["Mod GRF 1-29"],None,None,None,None,
 [("2 mg",44.99),("5 mg",69.99)],
 "Le CJC-1295 sans DAC est un GRF 1-29 modifié, étudié en association avec les sécrétagogues de type ghréline pour la sécrétion pulsatile de GH.",
 ["Récepteur du GHRH","Synergie GHRH / ghréline","Sécrétion pulsatile de GH"],
 [pm("CJC-1295 GHRH")],"")

add("cjc-1295-ipamorelin","CJC-1295 (no DAC) + Ipamorelin","myo-science","lyophilise",
 "Association d’un analogue du GHRH et d’un sécrétagogue sélectif, étudiée pour la synergie sur l’axe GH.",
 [],None,None,None,None,
 [("10 mg (5+5)",74.99)],
 "Combinaison d’un GRF 1-29 modifié et de l’ipamoréline (agoniste du récepteur de la ghréline). La recherche étudie la synergie des deux voies sur la sécrétion de GH.",
 ["Synergie GHRH / récepteur de la ghréline","Sécrétion pulsatile de GH","Combinaisons de sécrétagogues"],
 [pm("CJC-1295 ipamorelin growth hormone")],"n")

add("ipamorelin","Ipamorelin","myo-science","lyophilise",
 "Agoniste sélectif du récepteur de la ghréline (GHS-R), sécrétagogue de référence.",
 [],"170851-70-4",None,None,None,
 [("2 mg",39.99),("5 mg",49.99),("10 mg",64.99)],
 "L’ipamoréline active sélectivement le récepteur de la ghréline (GHS-R1a) avec peu d’effet sur le cortisol et la prolactine, ce qui en fait un outil propre pour étudier cette voie.",
 ["Récepteur de la ghréline (GHS-R1a)","Sélectivité des sécrétagogues","Sécrétion de GH"],
 [pm("ipamorelin ghrelin receptor"),pc("ipamorelin")],"")

add("ghrp-2","GHRP-2","myo-science","lyophilise",
 "Peptide libérateur de GH, agoniste du récepteur de la ghréline.",
 ["Pralmorelin"],"158861-67-7",None,None,None,
 [("5 mg",34.99),("10 mg",49.99),("15 mg",64.99)],
 "Le GHRP-2 active le récepteur de la ghréline et stimule la sécrétion de GH dans des modèles cellulaires et précliniques.",
 ["Récepteur de la ghréline","Sécrétion de GH","Comparaison des GHRP"],
 [pm("GHRP-2 pralmorelin")],"")

add("ghrp-6","GHRP-6","myo-science","lyophilise",
 "Peptide libérateur de GH de première génération, agoniste du récepteur de la ghréline.",
 [],"87616-84-0",None,None,None,
 [("5 mg",34.99),("10 mg",49.99)],
 "Le GHRP-6 stimule la sécrétion de GH via le récepteur de la ghréline et augmente l’appétit dans des modèles précliniques.",
 ["Récepteur de la ghréline","Régulation de l’appétit","Sécrétion de GH"],
 [pm("GHRP-6 ghrelin")],"")

add("hexarelin","Hexarelin Acetate","myo-science","lyophilise",
 "Hexapeptide sécrétagogue de la GH, étudié aussi pour ses effets cardiaques via CD36.",
 [],"140703-51-1",None,None,None,
 [("2 mg",44.99),("5 mg",69.99)],
 "L’hexaréline active le récepteur de la ghréline et se lie au récepteur CD36, une voie étudiée dans les modèles cardiovasculaires précliniques.",
 ["Récepteur de la ghréline","Récepteur CD36","Modèles cardiovasculaires"],
 [pm("hexarelin CD36")],"")

add("mgf","MGF","myo-science","lyophilise",
 "Facteur de croissance mécanique, variant d’épissage de l’IGF-1 étudié dans la réparation musculaire.",
 ["IGF-1Ec"],None,None,None,None,
 [("2 mg",44.99)],
 "Le MGF est un variant d’épissage de l’IGF-1 exprimé après contrainte mécanique. Il est étudié pour son rôle dans l’activation des cellules satellites musculaires.",
 ["Cellules satellites musculaires","Variants d’épissage de l’IGF-1","Réparation musculaire"],
 [pm("mechano growth factor IGF-1")],"")

add("peg-mgf","PEG-MGF","myo-science","lyophilise",
 "Forme pégylée du MGF, à stabilité prolongée, pour l’étude de la réparation musculaire.",
 [],None,None,None,None,
 [("2 mg",69.99)],
 "La pégylation prolonge la stabilité du MGF en solution. Étudié dans les modèles d’activation des cellules satellites et de régénération musculaire.",
 ["Cellules satellites musculaires","Pégylation et stabilité","Régénération musculaire"],
 [pm("PEG-MGF mechano growth factor")],"n")

add("igf-1-lr3","IGF-1 LR3","myo-science","lyophilise",
 "Analogue à longue durée d’action de l’IGF-1, référence des études sur l’axe IGF.",
 ["Long R3 IGF-1"],None,None,None,None,
 [("0.1 mg",29.99),("1 mg",89.99)],
 "L’IGF-1 LR3 présente une faible affinité pour les protéines de liaison (IGFBP), ce qui prolonge son action sur le récepteur IGF-1R dans les cultures cellulaires.",
 ["Récepteur IGF-1R","Protéines de liaison (IGFBP)","Prolifération et différenciation cellulaires"],
 [pm("IGF-1 LR3")],"n")

add("igf-des","IGF-DES","myo-science","lyophilise",
 "Variant tronqué de l’IGF-1 (DES 1-3), à action locale puissante.",
 ["DES(1-3) IGF-1"],None,None,None,None,
 [("2 mg",94.99)],
 "L’IGF-DES est un variant tronqué des trois premiers acides aminés de l’IGF-1, avec une affinité réduite pour les IGFBP et une action locale marquée en culture.",
 ["Récepteur IGF-1R","Action locale et IGFBP","Prolifération cellulaire"],
 [pm("DES(1-3) IGF-1")],"")

add("follistatin","Follistatin 344","myo-science","lyophilise",
 "Antagoniste de la myostatine, étudié dans la régulation de la masse musculaire.",
 ["FST-344"],None,None,None,None,
 [("1 mg",149.99)],
 "La follistatine lie et neutralise la myostatine (GDF-8) et d’autres membres de la famille TGF-β, levant leur inhibition sur la croissance musculaire dans les modèles précliniques.",
 ["Inhibition de la myostatine","Famille TGF-β","Masse musculaire en modèle préclinique"],
 [pm("follistatin myostatin")],"")

add("ace-031","ACE-031","myo-science","lyophilise",
 "Récepteur leurre de l’activine (ActRIIB-Fc), piégeant la myostatine.",
 ["ActRIIB-Fc","Ramatercept"],None,None,None,None,
 [("1 mg",149.99)],
 "L’ACE-031 est une protéine de fusion du domaine extracellulaire d’ActRIIB avec un fragment Fc, qui piège la myostatine et l’activine en amont de leur récepteur.",
 ["Piégeage de la myostatine / activine","Signalisation ActRIIB","Masse musculaire en modèle préclinique"],
 [pm("ACE-031 ActRIIB myostatin")],"")

add("gdf-8","GDF-8 (Myostatine)","myo-science","lyophilise",
 "Myostatine recombinante, réactif de référence pour étudier ses antagonistes.",
 ["Myostatine"],None,None,None,None,
 [("1 mg",99.99)],
 "Le GDF-8 (myostatine) est un régulateur négatif de la masse musculaire de la famille TGF-β. Réactif utilisé comme cible dans l’étude de ses inhibiteurs.",
 ["Signalisation de la myostatine","Famille TGF-β / SMAD","Cible pour antagonistes"],
 [pm("GDF-8 myostatin")],"")

# ---------- RECHERCHE TISSULAIRE ----------
add("bpc-157","BPC-157","recherche-tissulaire","lyophilise",
 "Pentadécapeptide dérivé d’une protéine gastrique, étudié dans les modèles précliniques de réparation tissulaire.",
 ["Body Protection Compound 157","PL 14736"],"137525-51-0","C62H98N16O22",1419.53,None,
 [("5 mg",39.99),("10 mg",64.99)],
 "Le BPC-157 est étudié pour ses effets sur la migration des fibroblastes, l’angiogenèse et la voie du monoxyde d’azote. Les données disponibles sont essentiellement précliniques.",
 ["Migration cellulaire et cicatrisation in vitro","Angiogenèse (VEGFR2, voie NO)","Modèles précliniques de lésion tendineuse et digestive"],
 [pm("BPC 157"),pc("BPC 157")],"f")

add("tb-500","TB-500","recherche-tissulaire","lyophilise",
 "Fraction active de la thymosine β4 liant l’actine, étudiée dans la migration cellulaire.",
 ["Thymosine β4 fragment","TB500"],None,None,None,None,
 [("5 mg",39.99),("10 mg",64.99)],
 "Le TB-500 correspond à la région active de la thymosine β4 qui séquestre l’actine-G et régule la dynamique du cytosquelette dans les modèles de migration et de réparation.",
 ["Dynamique de l’actine","Migration cellulaire","Modèles de réparation tissulaire"],
 [pm("TB-500 thymosin beta 4")],"")

add("bpc-tb-5","BPC-157 5 mg + TB-500 5 mg","recherche-tissulaire","lyophilise",
 "Association de deux peptides de réparation, étudiée pour leurs effets combinés.",
 [],None,None,None,None,
 [("10 mg (5+5)",79.99)],
 "Association du BPC-157 et du TB-500 étudiée dans les modèles combinant angiogenèse et dynamique de l’actine.",
 ["Combinaisons de peptides de réparation","Angiogenèse et migration","Modèles précliniques"],
 [pm("BPC-157 TB-500")],"")

add("bpc-tb-10","BPC-157 10 mg + TB-500 10 mg","recherche-tissulaire","lyophilise",
 "Association concentrée de deux peptides de réparation pour la recherche.",
 [],None,None,None,None,
 [("20 mg (10+10)",120.99)],
 "Version concentrée de l’association BPC-157 et TB-500, étudiée dans les modèles de réparation tissulaire.",
 ["Combinaisons de peptides de réparation","Angiogenèse et migration","Modèles précliniques"],
 [pm("BPC-157 TB-500")],"")

add("ll-37","LL-37","recherche-tissulaire","lyophilise",
 "Peptide antimicrobien de la cathélicidine humaine, étudié en immunité innée et réparation.",
 ["Cathélicidine"],"154947-66-7",None,None,None,
 [("5 mg",69.99)],
 "Le LL-37 est le fragment actif de la cathélicidine humaine. Il est étudié pour son activité antimicrobienne, son rôle dans l’immunité innée et l’angiogenèse.",
 ["Immunité innée","Activité antimicrobienne in vitro","Angiogenèse et réparation"],
 [pm("LL-37 cathelicidin")],"n")

add("vip","VIP","recherche-tissulaire","lyophilise",
 "Peptide intestinal vasoactif, étudié dans l’immunomodulation et la signalisation neuro-endocrine.",
 ["Peptide intestinal vasoactif"],"37221-79-7",None,None,None,
 [("5 mg",69.99),("10 mg",109.99)],
 "Le VIP active les récepteurs VPAC1/VPAC2 couplés à l’AMPc et module les réponses immunitaires et inflammatoires dans de nombreux modèles cellulaires.",
 ["Récepteurs VPAC1 / VPAC2","Immunomodulation","Signalisation AMPc"],
 [pm("vasoactive intestinal peptide VPAC")],"")

add("thymosin-alpha-1","Thymosin Alpha-1","recherche-tissulaire","lyophilise",
 "Peptide thymique de 28 acides aminés, étudié dans la modulation immunitaire.",
 ["Tα1"],"62304-98-7",None,None,None,
 [("5 mg",54.99),("10 mg",89.99)],
 "La thymosine α1 module l’activité des cellules dendritiques et des lymphocytes T via les récepteurs de type Toll dans les modèles d’immunité.",
 ["Récepteurs TLR","Cellules dendritiques et lymphocytes T","Immunomodulation"],
 [pm("thymosin alpha 1 immune")],"")

add("thymalin","Thymalin / Thymulin","recherche-tissulaire","lyophilise",
 "Extrait bioregulateur thymique, étudié dans l’homéostasie immunitaire.",
 [],None,None,None,None,
 [("10 mg",59.99)],
 "La thymaline regroupe des peptides thymiques étudiés comme bioregulateurs de la maturation lymphocytaire dans des modèles d’immunosénescence.",
 ["Maturation lymphocytaire","Bioregulateurs peptidiques","Immunosénescence"],
 [pm("thymalin thymulin")],"")

add("cartalax","Cartalax","recherche-tissulaire","lyophilise",
 "Court bioregulateur peptidique (AED), étudié dans le tissu cartilagineux et conjonctif.",
 ["AED"],None,None,None,None,
 [("20 mg",44.99)],
 "Le cartalax est un tripeptide bioregulateur étudié pour son influence sur l’expression génique dans les modèles de tissu conjonctif et cartilagineux.",
 ["Bioregulateurs peptidiques courts","Expression génique tissulaire","Tissu conjonctif"],
 [pm("cartalax peptide bioregulator")],"")

add("cardiogen","Cardiogen","recherche-tissulaire","lyophilise",
 "Bioregulateur peptidique étudié dans le tissu cardiaque.",
 [],None,None,None,None,
 [("20 mg",44.99)],
 "Le cardiogen est un peptide bioregulateur court étudié pour son influence sur l’expression génique dans des modèles de tissu myocardique.",
 ["Bioregulateurs peptidiques","Expression génique cardiaque","Modèles tissulaires"],
 [pm("cardiogen peptide bioregulator")],"")

add("cortagen","Cortagen","recherche-tissulaire","lyophilise",
 "Bioregulateur peptidique étudié dans le tissu nerveux périphérique.",
 [],None,None,None,None,
 [("20 mg",44.99)],
 "Le cortagen est un peptide bioregulateur court étudié dans les modèles de régénération du tissu nerveux périphérique.",
 ["Bioregulateurs peptidiques","Régénération nerveuse","Expression génique tissulaire"],
 [pm("cortagen peptide bioregulator")],"")

add("bronchogen","Bronchogen","recherche-tissulaire","lyophilise",
 "Bioregulateur peptidique étudié dans le tissu bronchopulmonaire.",
 ["Ala-Asp-Glu-Leu"],None,None,None,None,
 [("20 mg",44.99)],
 "Le bronchogen est un tétrapeptide bioregulateur étudié pour son influence sur l’expression génique dans les modèles de tissu bronchique.",
 ["Bioregulateurs peptidiques","Tissu bronchopulmonaire","Expression génique tissulaire"],
 [pm("bronchogen peptide")],"")

add("ara-290","ARA-290 (Cibinétide)","recherche-tissulaire","lyophilise",
 "Peptide dérivé de l’EPO ciblant le récepteur innate repair, sans effet érythropoïétique.",
 ["Cibinetide"],"1208243-50-8",None,None,None,
 [("10 mg",79.99),("16 mg",114.99)],
 "L’ARA-290 reprend une séquence de l’érythropoïétine et active le récepteur « innate repair » (IRR) impliqué dans la protection tissulaire et l’inflammation, sans stimuler l’érythropoïèse.",
 ["Récepteur innate repair (IRR)","Neuroprotection et inflammation","Peptides dérivés de l’EPO"],
 [pm("ARA-290 cibinetide")],"")

add("ptd-dbm","PTD-DBM","recherche-tissulaire","lyophilise",
 "Peptide inhibiteur de l’interaction CXXC5-Dishevelled, étudié dans la voie Wnt.",
 [],None,None,None,None,
 [("1 mg",59.99)],
 "Le PTD-DBM inhibe l’interaction CXXC5-Dishevelled, levant un frein de la voie Wnt/β-caténine dans des modèles de régénération (follicule pileux, cicatrisation).",
 ["Voie Wnt / β-caténine","Interaction CXXC5-Dishevelled","Modèles de régénération"],
 [pm("PTD-DBM CXXC5 Wnt")],"")

# ---------- NOOTROPIQUES ----------
add("selank","Selank","nootropiques","lyophilise",
 "Analogue synthétique de la tuftsine, étudié dans la régulation du stress et l’immunomodulation.",
 ["TP-7"],"129954-34-3","C33H57N11O9",751.87,None,
 [("5 mg",44.99),("10 mg",64.99)],
 "Selank prolonge la tuftsine par un motif Pro-Gly-Pro. Il est étudié pour son influence sur l’expression de gènes du système GABAergique et sur certaines cytokines.",
 ["Expression génique (système GABAergique)","Immunomodulation et cytokines","Modèles précliniques de stress"],
 [pm("Selank"),pc("Selank")],"")

add("semax","Semax","nootropiques","lyophilise",
 "Analogue du fragment ACTH (4-10), étudié dans la neuroprotection et l’expression des neurotrophines.",
 ["ACTH (4-7) Pro-Gly-Pro"],"80714-61-0","C37H51N9O10S",813.93,None,
 [("5 mg",44.99),("10 mg",64.99)],
 "Semax associe le fragment ACTH (4-7) à un motif Pro-Gly-Pro qui ralentit sa dégradation. Il est étudié pour son influence sur l’expression du BDNF et dans des modèles d’ischémie.",
 ["Expression du BDNF","Modèles précliniques d’ischémie","Stabilité des peptides par motif PGP"],
 [pm("Semax peptide"),pc("Semax")],"")

add("dsip","DSIP","nootropiques","lyophilise",
 "Peptide induisant le sommeil delta, étudié dans la régulation du sommeil et du stress.",
 ["Delta sleep-inducing peptide"],"62568-57-4",None,None,None,
 [("2 mg",49.99),("5 mg",59.99),("10 mg",74.99)],
 "Le DSIP est un nonapeptide étudié pour son influence sur l’architecture du sommeil à ondes lentes et la modulation neuro-endocrine.",
 ["Sommeil à ondes lentes","Modulation neuro-endocrine","Réponse au stress"],
 [pm("delta sleep inducing peptide")],"")

add("cerebrolysin","Cerebrolysin","nootropiques","solution",
 "Mélange de peptides neurotrophiques d’origine porcine, étudié en neuroprotection.",
 [],None,None,None,None,
 [("60 mg",45.00)],
 "Le cérébrolysine est un mélange standardisé de peptides à bas poids moléculaire étudié pour son activité neurotrophique dans des modèles de lésion neuronale.",
 ["Activité neurotrophique","Modèles de lésion neuronale","Plasticité synaptique"],
 [pm("cerebrolysin neurotrophic")],"")

add("pinealon","Pinealon","nootropiques","lyophilise",
 "Tripeptide bioregulateur (EDR), étudié dans la protection neuronale.",
 ["Glu-Asp-Arg"],None,None,None,None,
 [("5 mg",44.99),("10 mg",65.00)],
 "Le pinealon est un tripeptide court qui pénètre le noyau et est étudié pour son influence sur l’expression génique neuronale et la résistance au stress oxydatif.",
 ["Bioregulateurs peptidiques courts","Expression génique neuronale","Stress oxydatif"],
 [pm("pinealon peptide")],"")

add("dermorphin","Dermorphin","nootropiques","lyophilise",
 "Heptapeptide opioïde naturel, agoniste puissant des récepteurs mu, réactif de recherche.",
 [],"77614-16-5",None,None,None,
 [("2 mg",49.99),("10 mg",99.99)],
 "La dermorphine est un peptide opioïde contenant un acide aminé D, agoniste sélectif du récepteur mu. Réactif utilisé dans l’étude de la signalisation opioïde in vitro.",
 ["Récepteur opioïde mu","Acides aminés D et stabilité","Signalisation opioïde"],
 [pm("dermorphin mu opioid")],"")

add("orexin-a","Orexin A","nootropiques","lyophilise",
 "Neuropeptide hypothalamique régulant l’éveil, étudié via les récepteurs OX1R/OX2R.",
 ["Hypocrétine-1"],"205640-90-0",None,None,None,
 [("10 mg",109.99)],
 "L’orexine A active les récepteurs OX1R et OX2R et régule l’éveil, l’appétit et la dépense énergétique dans des modèles neuronaux.",
 ["Récepteurs OX1R / OX2R","Régulation de l’éveil","Signalisation hypothalamique"],
 [pm("orexin A hypocretin")],"")

add("orexin-b","Orexin B","nootropiques","lyophilise",
 "Neuropeptide hypothalamique, agoniste préférentiel d’OX2R, régulateur de l’éveil.",
 ["Hypocrétine-2"],"205640-91-1",None,None,None,
 [("5 mg",89.99),("10 mg",139.99)],
 "L’orexine B active préférentiellement le récepteur OX2R et participe à la régulation de l’éveil et de l’homéostasie énergétique dans les modèles neuronaux.",
 ["Récepteur OX2R","Régulation de l’éveil","Signalisation hypothalamique"],
 [pm("orexin B hypocretin")],"")

# ---------- LONGEVITE ----------
add("epithalon","Épithalon","longevite","lyophilise",
 "Tétrapeptide synthétique (AEDG), étudié dans la télomérase et le vieillissement cellulaire.",
 ["Epitalon","AEDG"],"307297-39-8","C14H22N4O9",390.35,None,
 [("10 mg",59.99),("50 mg",139.99)],
 "L’épithalon est étudié pour son influence sur l’activité de la télomérase et l’expression génique en culture. Le niveau de preuve reste limité.",
 ["Activité de la télomérase","Sénescence réplicative en culture","Rythmes circadiens en modèle animal"],
 [pm("epitalon telomerase"),pc("epitalon")],"")

add("nad-plus","NAD+","longevite","lyophilise",
 "Coenzyme central du métabolisme redox, substrat des sirtuines et des PARP.",
 ["β-Nicotinamide adénine dinucléotide"],"53-84-9","C21H27N7O14P2",663.43,None,
 [("100 mg",34.99),("500 mg",65.99),("1000 mg",89.99)],
 "Le NAD+ est l’accepteur d’électrons de nombreuses déshydrogénases et le substrat des sirtuines, PARP et CD38. Outil d’étude du lien entre état énergétique et signalisation.",
 ["Activité des sirtuines et des PARP","Bioénergétique mitochondriale","Métabolisme du NAD+ et vieillissement"],
 [pm("NAD+ sirtuins aging"),pc("NAD+")],"")

add("mots-c","MOTS-c","longevite","lyophilise",
 "Peptide d’origine mitochondriale de 16 acides aminés, étudié dans le métabolisme et le stress.",
 ["MOTS-c (Human)"],None,None,None,None,
 [("10 mg",54.99),("20 mg",89.99),("40 mg",134.99)],
 "MOTS-c est codé par le génome mitochondrial. Il est étudié pour son action sur l’AMPK, le métabolisme du folate et la translocation nucléaire en stress métabolique.",
 ["Communication mitochondrie-noyau","Activation de l’AMPK","Modèles de stress métabolique"],
 [pm("MOTS-c mitochondrial peptide")],"f")

add("ss-31","SS-31 (Élamiprétide)","longevite","lyophilise",
 "Peptide ciblant la cardiolipine mitochondriale, étudié en bioénergétique.",
 ["Elamipretide","MTP-131"],"736992-21-5",None,None,None,
 [("5 mg",54.99),("10 mg",89.99),("50 mg",199.99)],
 "Le SS-31 se lie à la cardiolipine de la membrane mitochondriale interne et est étudié pour son influence sur l’efficacité de la chaîne respiratoire et le stress oxydatif.",
 ["Cardiolipine mitochondriale","Chaîne respiratoire","Stress oxydatif"],
 [pm("elamipretide SS-31 cardiolipin")],"")

add("humanin","Humanin","longevite","lyophilise",
 "Peptide mitochondrial cytoprotecteur, étudié dans la survie cellulaire.",
 [],None,None,None,None,
 [("10 mg",69.99)],
 "L’humanine est un peptide dérivé du génome mitochondrial étudié pour son action cytoprotectrice via les récepteurs de type gp130 dans des modèles de stress cellulaire.",
 ["Peptides mitochondriaux","Cytoprotection (voie gp130)","Survie cellulaire"],
 [pm("humanin mitochondrial peptide")],"")

add("fox04-dri","FOXO4-DRI","longevite","lyophilise",
 "Peptide senolytique perturbant l’interaction FOXO4-p53, étudié dans la sénescence.",
 ["FOXO4 D-Retro-Inverso"],None,None,None,None,
 [("2 mg",89.99),("10 mg",249.99)],
 "Le FOXO4-DRI est un peptide D-retro-inverso qui perturbe l’interaction FOXO4-p53 et est étudié pour l’élimination sélective des cellules sénescentes in vitro.",
 ["Interaction FOXO4-p53","Sénescence cellulaire","Approches senolytiques"],
 [pm("FOXO4-DRI senescence")],"")

add("kisspeptin-10","Kisspeptin-10","longevite","lyophilise",
 "Fragment actif de la kisspeptine, régulateur de l’axe gonadotrope.",
 [],"374675-21-5",None,None,None,
 [("5 mg",59.99),("10 mg",94.99)],
 "La kisspeptine-10 active le récepteur KISS1R et stimule la libération de GnRH dans les modèles d’étude de l’axe hypothalamo-hypophyso-gonadique.",
 ["Récepteur KISS1R","Libération de GnRH","Axe gonadotrope"],
 [pm("kisspeptin-10 KISS1R")],"")

add("gonadorelin","Gonadorelin Acetate","longevite","lyophilise",
 "GnRH synthétique, réactif d’étude de l’axe hypophyso-gonadique.",
 ["GnRH"],"33515-09-2",None,None,None,
 [("2 mg",39.99),("5 mg",59.99)],
 "La gonadoréline est la forme synthétique du GnRH qui active le récepteur GnRHR et stimule la sécrétion de LH et FSH dans les modèles d’étude de l’axe gonadotrope.",
 ["Récepteur GnRHR","Sécrétion de LH / FSH","Axe hypophyso-gonadique"],
 [pm("gonadorelin GnRH")],"")

add("triptorelin","Triptorelin Acetate","longevite","lyophilise",
 "Agoniste du GnRH à longue durée d’action, réactif de recherche endocrinienne.",
 [],"57773-63-4",None,None,None,
 [("2 mg",49.99)],
 "La triptoréline est un agoniste puissant du GnRH qui, après stimulation initiale, désensibilise le récepteur GnRHR, un mécanisme étudié dans la régulation de l’axe gonadotrope.",
 ["Récepteur GnRHR","Désensibilisation du récepteur","Axe gonadotrope"],
 [pm("triptorelin GnRH agonist")],"")

add("pt-141","PT-141","longevite","lyophilise",
 "Analogue de l’α-MSH (bremélanotide), agoniste des récepteurs à la mélanocortine.",
 ["Bremélanotide"],"189691-06-3",None,None,None,
 [("10 mg",59.99)],
 "Le PT-141 active les récepteurs à la mélanocortine MC3R/MC4R, une voie étudiée dans la signalisation centrale de la fonction sexuelle et de l’appétit.",
 ["Récepteurs MC3R / MC4R","Signalisation centrale","Système mélanocortine"],
 [pm("bremelanotide PT-141 melanocortin")],"")

add("melatonin","Mélatonine","longevite","lyophilise",
 "Hormone circadienne, réactif d’étude des rythmes et du stress oxydatif.",
 [],"73-31-4","C13H16N2O2",232.28,None,
 [("10 mg",29.99)],
 "La mélatonine active les récepteurs MT1/MT2 et agit comme piégeur de radicaux libres. Réactif d’étude des rythmes circadiens et du stress oxydatif.",
 ["Récepteurs MT1 / MT2","Rythmes circadiens","Stress oxydatif"],
 [pc("melatonin")],"")

add("epo","EPO (Érythropoïétine)","longevite","lyophilise",
 "Érythropoïétine recombinante. Référence réglementée, étudiée dans la signalisation du récepteur de l’EPO.",
 [],"113427-24-0",None,None,None,
 [("3000 iu",50.00)],
 "L’EPO active le récepteur EPOR et la voie JAK2/STAT5, étudiée dans l’érythropoïèse et la protection tissulaire. Produit réglementé et classé comme agent dopant.",
 ["Récepteur de l’EPO (EPOR)","Voie JAK2/STAT5","Érythropoïèse"],
 [pm("erythropoietin EPOR JAK2")],"r")

# ---------- SKIN SCIENCE ----------
add("ghk-cu","GHK-Cu","skin-science","lyophilise",
 "Complexe cuivre du tripeptide Gly-His-Lys, étudié dans la matrice extracellulaire et les modèles cutanés.",
 ["Copper tripeptide-1"],None,None,None,None,
 [("50 mg",39.99),("100 mg",60.99)],
 "Le GHK présente une forte affinité pour le cuivre(II). Le complexe est étudié pour son influence sur l’expression de gènes de la matrice (collagène, décorine) dans des modèles de fibroblastes.",
 ["Synthèse de collagène par les fibroblastes","Remodelage de la matrice extracellulaire","Formulation cosmétique et stabilité"],
 [pm("GHK-Cu copper peptide"),pc("GHK-Cu")],"f")

add("ahk-cu","AHK-Cu","skin-science","lyophilise",
 "Complexe cuivre du tripeptide Ala-His-Lys, étudié dans le follicule pileux et la matrice.",
 ["Copper tripeptide"],None,None,None,None,
 [("50 mg",39.99),("100 mg",60.99)],
 "L’AHK-Cu est un tripeptide complexé au cuivre étudié pour son influence sur les cellules du follicule pileux et l’expression de facteurs de croissance (VEGF) en culture.",
 ["Papille dermique et follicule pileux","Expression du VEGF","Formulation cosmétique"],
 [pm("AHK-Cu copper peptide hair")],"")

add("matrixyl","Matrixyl","skin-science","lyophilise",
 "Peptide signal pro-matrice (palmitoyl pentapeptide), étudié dans la synthèse de collagène.",
 ["Palmitoyl pentapeptide-4"],"214047-00-4",None,None,None,
 [("10 mg",44.99)],
 "Le Matrixyl est un peptide signal qui stimule l’expression du collagène et de la fibronectine par les fibroblastes dans les modèles cutanés et les formulations cosmétiques.",
 ["Synthèse de collagène et fibronectine","Fibroblastes dermiques","Formulation cosmétique"],
 [pm("matrixyl palmitoyl pentapeptide collagen")],"")

add("snap-8","SNAP-8","skin-science","lyophilise",
 "Octapeptide mimétique de la SNAP-25, étudié dans la libération de neurotransmetteurs.",
 ["Acétyl octapeptide-3"],None,None,None,None,
 [("10 mg",39.99),("100 mg",199.99)],
 "Le SNAP-8 reproduit une séquence N-terminale de la SNAP-25 et entre en compétition dans la formation du complexe SNARE, étudié dans des modèles d’exocytose et en cosmétique.",
 ["Complexe SNARE et exocytose","Formulation dermo-cosmétique","Tests de stabilité en émulsion"],
 [pm("acetyl octapeptide-3 SNAP-8")],"n")

add("melanotan-1","Melanotan I","skin-science","lyophilise",
 "Analogue de l’α-MSH (afamélanotide), agoniste des récepteurs à la mélanocortine, étudié en pigmentation.",
 ["Afamélanotide","MT-1"],"75921-69-6",None,None,None,
 [("10 mg",55.99)],
 "Le Melanotan I active le récepteur MC1R des mélanocytes et stimule la mélanogenèse dans les modèles de pigmentation cutanée.",
 ["Récepteur MC1R","Mélanogenèse","Modèles de pigmentation"],
 [pm("afamelanotide melanotan melanocortin")],"")

add("melanotan-2","Melanotan II","skin-science","lyophilise",
 "Analogue cyclique de l’α-MSH, agoniste large des mélanocortines, réactif de pigmentation.",
 ["MT-2"],"121062-08-6",None,None,None,
 [("10 mg",60.99)],
 "Le Melanotan II est un analogue cyclique non sélectif des récepteurs à la mélanocortine (MC1R, MC3R, MC4R), étudié dans la mélanogenèse et la signalisation centrale.",
 ["Récepteurs à la mélanocortine","Mélanogenèse","Signalisation MC4R"],
 [pm("melanotan II melanocortin")],"")

add("kpv","KPV","skin-science","lyophilise",
 "Tripeptide C-terminal de l’α-MSH (Lys-Pro-Val), étudié pour la modulation de l’inflammation.",
 ["Lys-Pro-Val"],"67727-97-3","C16H30N4O4",342.43,None,
 [("5 mg",39.99),("10 mg",59.99)],
 "Le KPV est étudié pour son action sur la voie NF-κB et la production de cytokines pro-inflammatoires dans des modèles épithéliaux et immunitaires.",
 ["Signalisation NF-κB","Modèles d’inflammation épithéliale","Production de cytokines in vitro"],
 [pm("KPV tripeptide inflammation")],"")

add("glow","GLOW (BPC-157 + GHK-Cu + TB-500)","skin-science","lyophilise",
 "Association de trois peptides de réparation et de matrice, étudiée pour ses effets combinés.",
 [],None,None,None,None,
 [("70 mg",109.99)],
 "Le GLOW combine BPC-157, GHK-Cu et TB-500. Association étudiée dans les modèles combinant réparation tissulaire, angiogenèse et synthèse de matrice.",
 ["Combinaisons de peptides","Réparation et matrice extracellulaire","Modèles cutanés"],
 [pm("BPC-157 GHK-Cu TB-500")],"")

add("klow","KLOW (BPC-157 + GHK-Cu + TB-500 + KPV)","skin-science","lyophilise",
 "Association de quatre peptides de réparation, de matrice et anti-inflammatoire.",
 [],None,None,None,None,
 [("80 mg",139.99)],
 "Le KLOW ajoute le KPV à l’association GLOW. Étudié dans les modèles combinant réparation, matrice extracellulaire et modulation de l’inflammation.",
 ["Combinaisons de peptides","Réparation et inflammation","Modèles cutanés"],
 [pm("BPC-157 GHK-Cu TB-500 KPV")],"")

# ---------- REGLEMENTES PHARMA ----------
add("hcg","HCG","myo-science","lyophilise",
 "Gonadotrophine chorionique humaine recombinante. Référence réglementée, disponible uniquement sur devis.",
 ["Gonadotrophine chorionique"],None,None,None,None,
 [("1000 iu",0),("5000 iu",0),("10000 iu",0)],
 "L’HCG active le récepteur LH/CG et la stéroïdogenèse, étudiée dans l’axe gonadotrope. Produit pharmaceutique strictement réglementé.",
 ["Récepteur LH/CG","Stéroïdogenèse","Axe gonadotrope"],
 [pm("human chorionic gonadotropin LHCGR")],"rq")

add("hmg","HMG","myo-science","lyophilise",
 "Gonadotrophine ménopausique humaine. Référence réglementée, disponible uniquement sur devis.",
 ["Ménotropine"],None,None,None,None,
 [("75 iu",0)],
 "L’HMG apporte une activité FSH et LH, étudiée dans la folliculogenèse et la stéroïdogenèse. Produit pharmaceutique strictement réglementé.",
 ["Activité FSH / LH","Folliculogenèse","Axe gonadotrope"],
 [pm("human menopausal gonadotropin")],"rq")

add("botulinum-toxin","Toxine botulique (type A)","skin-science","lyophilise",
 "Neurotoxine réglementée. Référence documentaire, non vendue en ligne : uniquement sur devis à des structures autorisées.",
 ["Botulinum toxin type A"],None,None,None,None,
 [("100 iu",0)],
 "La toxine botulique de type A clive la protéine SNAP-25 et bloque la libération d’acétylcholine à la jonction neuromusculaire. Substance strictement réglementée et contrôlée.",
 ["Clivage de la SNAP-25","Jonction neuromusculaire","Complexe SNARE"],
 [pm("botulinum toxin SNAP-25")],"rq")

# ---------- CONSOMMABLES ----------
add("bac-water","Eau bactériostatique","consommables","consommable",
 "Eau stérile à 0,9 % d’alcool benzylique, pour la reconstitution des peptides lyophilisés.",
 ["BAC Water"],None,None,None,None,
 [("3 ml",7.9),("10 ml",14.9)],
 "L’alcool benzylique limite la croissance bactérienne lors des prélèvements successifs. Vérifier la compatibilité avec le protocole : certains peptides et lignées y sont sensibles.",
 ["Reconstitution de peptides lyophilisés","Préparation de solutions mères"],[],"")

add("acetic-acid","Acide acétique 0,6 %","consommables","consommable",
 "Solvant stérile pour la reconstitution des peptides peu solubles dans l’eau.",
 ["醋酸水"],None,None,None,None,
 [("3 ml",8.9),("10 ml",12.9)],
 "Une solution acide diluée améliore la solubilité des peptides basiques ou hydrophobes. Ajuster ensuite le pH selon les besoins de l’essai.",
 ["Reconstitution de peptides basiques","Solutions mères"],[],"")

add("wipes","Lingettes alcoolisées","consommables","consommable",
 "Lingettes imbibées d’isopropanol 70 %, pour la désinfection du septum et du plan de travail.",
 [],None,None,None,None,
 [("Pack de 10",2.99)],
 "Désinfection du bouchon des flacons et du plan de travail avant prélèvement, pour préserver la stérilité des solutions mères.",
 ["Asepsie du plan de travail","Préparation des flacons"],[],"")

add("syringes-1ml","Seringues 1 ml","consommables","consommable",
 "Seringues stériles graduées 1 ml pour la manipulation précise des solutions au laboratoire.",
 [],None,None,None,None,
 [("Pack de 10",5.00)],
 "Seringues graduées à usage unique pour le prélèvement et la dilution précis des solutions de peptides au laboratoire.",
 ["Prélèvement et dilution","Précision de pipetage"],[],"")

# ======== EMISSION TS ========
def ts(s):
    return '"' + s.replace("\\","\\\\").replace('"','\\"') + '"'
def tnum(x):
    return "null" if x is None else repr(x)
def arr(xs):
    return "[" + ", ".join(ts(x) for x in xs) + "]"

def sku(slug, label):
    base = re.sub(r'[^A-Za-z0-9]+','-', slug).upper().strip('-')
    suf = re.sub(r'[^A-Za-z0-9]+','', label).upper()
    return f"SKY-{base}-{suf}"

out = io.StringIO()
out.write('''// Catalogue Skyalys — FICHIER GENERE (voir scripts/gen_catalog.py).
// Prix HT, cales sur la reference marche lorsque connus. Les champs chimiques
// (CAS, formule, masse molaire, PubChem) doivent etre verifies contre le COA
// du fournisseur avant publication ; un champ null n'est pas affiche.

export type CategorySlug =
''')
out.write("".join(f'  | "{c[0]}"\n' for c in CATS).rstrip("\n")+";\n\n")
out.write('''export type Format = "lyophilise" | "solution" | "consommable";

export type Category = { slug: CategorySlug; name: string; short: string; description: string };
export type Variant = { label: string; sku: string; price: number };
export type Reference = { title: string; source: string; url: string };

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  format: Format;
  summary: string;
  synonyms: string[];
  cas: string | null;
  formula: string | null;
  molarMass: number | null;
  pubchem: string | null;
  purity: string;
  appearance: string;
  storage: string;
  variants: Variant[];
  mechanism: string;
  researchAreas: string[];
  faqs: { q: string; a: string }[];
  references: Reference[];
  isNew?: boolean;
  featured?: boolean;
  regulated?: boolean;
  quoteOnly?: boolean;
};

export const categories: Category[] = [
''')
for s,n,sh,d in CATS:
    out.write(f"  {{ slug: {ts(s)}, name: {ts(n)}, short: {ts(sh)}, description: {ts(d)} }},\n")
out.write("];\n\n")
out.write('''export const formats: { slug: Format; name: string }[] = [
  { slug: "lyophilise", name: "Lyophilisé" },
  { slug: "solution", name: "Solution" },
  { slug: "consommable", name: "Consommable" },
];

const LYO = ''' + ts(LYO) + ''';
const SOL = ''' + ts(SOL) + ''';

const pubchemSearch = (t: string): Reference => ({
  title: `Fiche composé : ${t}`,
  source: "PubChem, National Library of Medicine",
  url: `https://pubchem.ncbi.nlm.nih.gov/#query=${encodeURIComponent(t)}`,
});
const pubmedSearch = (t: string): Reference => ({
  title: `Publications indexées : ${t}`,
  source: "PubMed, National Library of Medicine",
  url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(t)}`,
});

const standardFaqs = (name: string) => [
  {
    q: `Comment le lot de ${name} est-il contrôlé ?`,
    a: "Chaque lot est contrôlé par HPLC (pureté relative) et par spectrométrie de masse (identité moléculaire). Le certificat d’analyse du lot expédié est disponible dans l’espace Analyses et joint à la commande.",
  },
  {
    q: "Le pourcentage HPLC garantit-il la quantité contenue dans le flacon ?",
    a: "Non. La HPLC mesure la proportion du pic principal dans les conditions de la méthode. La quantité nette dépend aussi de la teneur en eau et en contre-ions. Pour un dosage précis, prévoir une quantification complémentaire.",
  },
  {
    q: "Ce produit peut-il être utilisé chez l’homme ou l’animal ?",
    a: "Non. Il est vendu exclusivement pour la recherche in vitro et les usages analytiques. Toute commande implique l’acceptation de cette restriction.",
  },
];
''')

out.write("\nexport const products: Product[] = [\n")
for p in P:
    fmt = p["fmt"]
    storage = "LYO" if fmt=="lyophilise" else ("SOL" if fmt=="solution" else ts("Température ambiante, à l’abri de la lumière."))
    appearance = {"lyophilise":"Poudre lyophilisée","solution":"Solution limpide","consommable":"Consommable de laboratoire"}[fmt]
    purity = "≥ 98 % (HPLC), identité confirmée par MS" if fmt=="lyophilise" else ("Qualité laboratoire" if fmt=="consommable" else "Qualité laboratoire")
    variants = []
    for lab,price in p["variants"]:
        variants.append(f'{{ label: {ts(lab)}, sku: {ts(sku(p["slug"],lab))}, price: {price} }}')
    refs = []
    for r in p["refs"]:
        if r[0]=="pubmed": refs.append(f'pubmedSearch({ts(r[1])})')
        elif r[0]=="pubchem": refs.append(f'pubchemSearch({ts(r[1])})')
        else: refs.append(f'{{ title: {ts(r[1])}, source: {ts(r[2])}, url: {ts(r[3])} }}')
    faqs = f'standardFaqs({ts(p["name"])})' if (fmt!="consommable") else "[]"
    out.write("  {\n")
    out.write(f'    slug: {ts(p["slug"])}, name: {ts(p["name"])}, category: {ts(p["cat"])}, format: {ts(fmt)},\n')
    out.write(f'    summary: {ts(p["summary"])},\n')
    out.write(f'    synonyms: {arr(p["syn"])}, cas: {tnum(p["cas"])}, formula: {tnum(p["formula"])}, molarMass: {tnum(p["mm"])}, pubchem: {tnum(p["pubchem"])},\n')
    out.write(f'    purity: {ts(purity)}, appearance: {ts(appearance)}, storage: {storage},\n')
    out.write('    variants: [' + ", ".join(variants) + '],\n')
    out.write(f'    mechanism: {ts(p["mech"])},\n')
    out.write('    researchAreas: [' + ", ".join(ts(a) for a in p["areas"]) + '],\n')
    out.write(f'    faqs: {faqs},\n')
    out.write('    references: [' + ", ".join(refs) + '],\n')
    flags=[]
    if p["new"]: flags.append("isNew: true")
    if p["featured"]: flags.append("featured: true")
    if p["regulated"]: flags.append("regulated: true")
    if p["quoteOnly"]: flags.append("quoteOnly: true")
    if flags: out.write("    " + ", ".join(flags) + ",\n")
    out.write("  },\n")
out.write("];\n\n")

out.write('''export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsByCategory = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const minPrice = (p: Product) => Math.min(...p.variants.map((v) => v.price));
export const isPurchasable = (p: Product) => !p.quoteOnly && p.variants.some((v) => v.price > 0);

// Supplements proposes sur les fiches peptides (vente additionnelle).
export const addOnSlugs = ["bac-water", "wipes", "syringes-1ml"];

export type Batch = { sku: string; lot: string; date: string; purity: string | null; coaUrl: string | null; sdsUrl: string | null };
export const batches: Batch[] = products.flatMap((p) =>
  p.variants.map((v) => ({ sku: v.sku, lot: `${v.sku.replace("SKY-", "")}-A01`, date: "", purity: null, coaUrl: null, sdsUrl: null })),
);
export const batchFor = (sku: string) => batches.find((b) => b.sku === sku);
''')

open("/home/user/portfolio/skyalys/src/lib/catalog.ts","w").write(out.getvalue())
print("products:", len(P))
from collections import Counter
print(Counter(p["cat"] for p in P))
print("quoteOnly:", [p["slug"] for p in P if p["quoteOnly"]])
