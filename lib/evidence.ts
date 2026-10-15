export const EVIDENCE_REVIEW_DATE = "2026-10-15";

type EvidenceSource = { title: string; url: string; kind: string };
export type EvidenceTopic = {
  id: string;
  title: string;
  finding: string;
  claim: string;
  commentary: string;
  implication: string;
  sources: EvidenceSource[];
};

const yogaSource = { title: "NCCIH — Yoga: Effectiveness and Safety", url: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety", kind: "Public-health evidence summary" };
const meditationSource = { title: "NCCIH — Meditation and Mindfulness: Effectiveness and Safety", url: "https://www.nccih.nih.gov/health/meditation-and-mindfulness-effectiveness-and-safety", kind: "Public-health evidence summary" };
const rfSource = { title: "ARPANSA — Radiofrequency energy and the safety standard", url: "https://www.arpansa.gov.au/regulation-and-licensing/regulatory-publications/radiation-protection-series/codes-and-standards/rpss-1-qa", kind: "Radiation-protection agency guidance" };

export const evidenceTopics: EvidenceTopic[] = [
  {
    id: "exercise-mindset", title: "The hotel-worker mindset study", finding: "A real study, with narrower conclusions",
    claim: "The source describes hotel workers becoming healthier on all levels solely by changing how they viewed their work.",
    commentary: "Crum and Langer (2007) studied 84 female room attendants at seven hotels, assigning conditions by hotel. After four weeks, the informed group showed improvements in selected measures, including weight and blood pressure. Diet and activity changes relied on self-report; the authors suggested stronger behavioral measurement for future research.",
    implication: "This is an interesting result about framing and measured outcomes, not proof that mindset alone improves every aspect of health. The small number of hotels and short follow-up limit generalization.",
    sources: [{ title: "Crum & Langer (2007) — Mind-Set Matters", url: "https://mbl.stanford.edu/sites/g/files/sbiybj26571/files/media/file/2007_exercise_mindset_crumlanger_psych_sci.pdf", kind: "Original controlled study" }],
  },
  {
    id: "breathing", title: "Breathing, relaxation, and performance", finding: "Promising evidence; universal claims go further",
    claim: "The source treats deeper, slower nasal breathing as an automatic nervous-system switch and a route to maximum creativity and productivity.",
    commentary: "A one-month randomized study by Balban and colleagues (2023) compared daily five-minute breathing exercises with mindfulness meditation. Exhale-focused cyclic sighing showed greater improvement in mood and reduction in respiratory rate. Those outcomes do not establish that everyone breathes incorrectly, that one breathing pattern always activates a single nervous-system state, or that it maximizes creativity.",
    implication: "The digital exercise remains gentle noticing of ordinary breathing. This research is not a reason to force deeper breaths, hold the breath, or persist through discomfort. NCCIH advises beginners to avoid forceful yoga breathing.",
    sources: [{ title: "Balban et al. (2023) — Brief structured respiration practices", url: "https://pubmed.ncbi.nlm.nih.gov/36630953/", kind: "Original randomized study" }, yogaSource],
  },
  {
    id: "posture", title: "Posture and working positions", finding: "Comfort and variation are supported",
    claim: "The source links an elongated spine to guaranteed confidence, alertness, and strain-free work, including hours lying prone or supine.",
    commentary: "OSHA explains that no single posture or workstation arrangement fits everyone. Its guidance favors supported, neutral positions and frequent changes of position, even when a working posture is otherwise good. It does not establish that one spinal shape guarantees a psychological state or eliminates strain.",
    implication: "Treat the source’s preferred positions as personal experiments, not universal prescriptions. Fit the setup to your body and task, vary positions, and respond to discomfort instead of holding a supposedly perfect pose.",
    sources: [{ title: "OSHA — Computer Workstations", url: "https://www.osha.gov/etools/computer-workstations", kind: "Occupational-health guidance" }, { title: "OSHA — Good Working Positions", url: "https://www.osha.gov/etools/computer-workstations/positions", kind: "Occupational-health guidance" }],
  },
  {
    id: "power-poses", title: "Power poses and mental health", finding: "Mixed outcomes; treatment claims are not established",
    claim: "The source cites power-pose research and suggests specific opening or folding poses for depression or anxiety.",
    commentary: "A larger conceptual replication by Ranehill and colleagues (2015; 200 participants) found an effect on self-reported power, but not on hormones or the behavioral tasks tested. Feeling different after a posture is distinct from demonstrating a reliable hormonal change or treating a mental-health condition.",
    implication: "The cited power-pose experiment does not validate particular backbends for depression or forward folds for anxiety. Optional movement can be explored for comfort without promising treatment or replacing mental-health care.",
    sources: [{ title: "Ranehill et al. (2015) — Assessing the Robustness of Power Posing", url: "https://faculty.haas.berkeley.edu/dana_carney/ranehill.pdf", kind: "Original conceptual replication" }],
  },
  {
    id: "nature", title: "Nature, mood, and healing-field explanations", finding: "Some benefits supported; proposed mechanism unestablished",
    claim: "The source attributes broad mental and physical healing benefits of nature to positive electromagnetic fields around trees.",
    commentary: "Bratman and colleagues (2015) found reduced self-reported rumination and a brain-activity measure after a 90-minute nature walk in healthy participants, compared with an urban walk. That experiment did not test healing electromagnetic fields, immunity, inflammation, or treatment of clinical depression.",
    implication: "Enjoying nature can be worthwhile without assuming the source’s electrical explanation is established. This study supports a specific short-term outcome, not every health benefit listed in the book.",
    sources: [{ title: "Bratman et al. (2015) — Nature experience and rumination", url: "https://natureandhealth.uw.edu/publications/nature-experience-reduces-rumination-and-subgenual-prefrontal-cortex-activation/", kind: "Original controlled study, author’s institution" }],
  },
  {
    id: "earthing", title: "Earthing, discharge, and protective products", finding: "Insufficient evidence for the broad protection claims",
    claim: "The source says contact with earth, trees, people, pets, or grounding mats discharges harmful energy and cancels electromagnetic hazards.",
    commentary: "Grounding research exists. For example, Brown and colleagues (2010) ran an eight-person pilot examining markers after exercise-induced muscle soreness. Such a small, condition-specific pilot cannot establish prevention of disease or protection from wireless exposure. The cited radiation guidance does not provide evidence for the book’s discharge or balancing model.",
    implication: "The reviewed sources do not justify buying a mat to cancel electromagnetic harm or making a wired grounding device. Ordinary contact with your surroundings can remain a sensory practice without an electrical or medical promise.",
    sources: [{ title: "Brown et al. (2010) — Grounding and delayed-onset muscle soreness", url: "https://pubmed.ncbi.nlm.nih.gov/20192911/", kind: "Original pilot study" }, rfSource],
  },
  {
    id: "emf", title: "Wireless exposure and positive/negative EMFs", finding: "The source’s broad illness model is not established",
    claim: "The source classifies wireless fields as negative and harmful, and living things as positive and healing, with a need to balance exposure hours.",
    commentary: "ARPANSA reports no substantiated evidence of adverse health effects from wireless radiofrequency exposure below its standard’s limits. WHO guidance distinguishes low environmental exposure from high exposures that can cause harm. These assessments do not validate the book’s positive/negative health categories or its hour-for-hour balancing rule.",
    implication: "This is not a finding that every field, exposure level, or possible long-term outcome is harmless. The claim under review is the book’s general illness-and-discharge model, not all electromagnetic science. Persistent symptoms deserve attention without assuming that wireless exposure is their cause.",
    sources: [rfSource, { title: "WHO — Radiation: Electromagnetic fields", url: "https://www.who.int/news-room/questions-and-answers/item/radiation-electromagnetic-fields", kind: "Public-health guidance" }],
  },
  {
    id: "microplastics", title: "A credit card of microplastics per week", finding: "The familiar intake estimate is unreliable",
    claim: "The source presents a credit card’s weight of weekly microplastic intake as a study finding about an average person.",
    commentary: "The German Federal Institute for Risk Assessment’s 2026 account explains that this frequently repeated figure rests on flawed, oversimplified assumptions and is unsuitable for representing actual intake. Measuring exposure and interpreting possible health effects remain difficult.",
    implication: "Do not present five grams per week as an established average or infer an individual’s illness from it. Rejecting this estimate does not establish that microplastics are harmless; exposure and health effects remain active research questions.",
    sources: [{ title: "BfR2GO (2026) — Microplastics", url: "https://www.bfr2go.de/en/issue-1-2026/microplastics/", kind: "Risk-assessment agency research account" }],
  },
  {
    id: "detox", title: "Detoxing in response to pollution", finding: "Commercial detox benefits are not established",
    claim: "The source recommends actively detoxing in response to environmental contamination.",
    commentary: "NCCIH reports no compelling research supporting detox diets for eliminating toxins, and notes safety concerns with cleansing products, restrictive diets, and some procedures. Medical treatment of a specific poisoning is a different situation from a general wellness cleanse.",
    implication: "The presence of pollution does not itself demonstrate that a cleanse removes it from the body. This edition does not prescribe detox products, fasting, or cleansing routines.",
    sources: [{ title: "NCCIH — Detoxes and Cleanses", url: "https://www.nccih.nih.gov/health/detoxes-and-cleanses-what-you-need-to-know", kind: "Public-health evidence summary" }],
  },
  {
    id: "blue-light", title: "Blue-light-filtering glasses", finding: "No clear eye-strain advantage; sleep evidence uncertain",
    claim: "The source recommends blue-light glasses for reducing eye strain and working later without affecting sleep.",
    commentary: "A 2023 Cochrane review included 17 randomized trials involving 619 people. Blue-light-filtering lenses may offer no short-term eye-strain advantage over ordinary lenses; evidence about sleep quality was very uncertain and inconsistent. The review’s study search ended in March 2022.",
    implication: "Personal comfort is a valid observation, but it does not establish that the lenses protect sleep or make late-night screen work consequence-free. This finding concerns the glasses, not whether evening light can affect sleep.",
    sources: [{ title: "Singh et al. (2023) — Blue-light filtering spectacle lenses", url: "https://www.cochrane.org/evidence/CD013244_blue-light-filtering-spectacle-lenses-visual-performance-macular-back-part-eye-protection-and", kind: "Systematic review of randomized trials" }],
  },
  {
    id: "sleep", title: "Sleep, screens, and light", finding: "Distinguish visible light from wireless exposure",
    claim: "The source combines evening screen light with a claim that negative EMFs prevent fully restorative sleep.",
    commentary: "NHLBI recommends regular sleep routines, a quiet and dark sleeping environment, and avoiding bright artificial light before bed. Separately, a WHO-commissioned review summarized by ARPANSA found no effect of below-limit radiofrequency exposure on acute self-reported sleep disturbances in human experiments; those experiments do not settle all long-term sleep questions.",
    implication: "A quieter wind-down and reduced evening light are distinct from electromagnetic detoxing. The cited evidence does not establish that removing negative EMFs is required for restorative sleep.",
    sources: [{ title: "NHLBI — Healthy Sleep Habits", url: "https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits", kind: "Public-health guidance" }, { title: "ARPANSA — WHO review of acute radiofrequency symptoms", url: "https://www.arpansa.gov.au/who-review-reports-no-effect-radiofrequency-electromagnetic-field-exposure-self-reported-symptoms-human-experimental-studies", kind: "Agency account of a systematic review" }],
  },
  {
    id: "magnesium", title: "Magnesium and difficulty relaxing", finding: "Deficiency matters; the absolute claim is overstated",
    claim: "The source says magnesium deficiency makes relaxation almost impossible.",
    commentary: "NIH’s Office of Dietary Supplements describes deficiency symptoms such as fatigue, weakness, and, with worsening deficiency, cramps or neurological problems. It does not establish inability to relax as a diagnostic test or the source’s near-universal prediction. Supplements can have adverse effects and interact with medicines.",
    implication: "Do not infer a deficiency from feeling stressed or choose a supplement dose from this lesson. This focused note does not assess every food, hydration, or nutrition claim in the source.",
    sources: [{ title: "NIH ODS — Magnesium: Health Professional Fact Sheet", url: "https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/", kind: "Public-health evidence summary" }],
  },
  {
    id: "smiling", title: "Smiling and emotional well-being", finding: "Some short-term effects; broad health promises untested",
    claim: "The source says holding a smile will have drastic effects on happiness, health, and focus.",
    commentary: "The preregistered Many Smiles study (2022) included 3,878 participants in 19 countries. Voluntary facial actions and mimicry could initiate or amplify reported happiness; results were less conclusive for a pen-in-mouth task. This supports some facial-feedback effects under the tested conditions.",
    implication: "The study does not show that prolonged smiling improves overall health or productivity, or that people should override difficult emotions. An optional, comfortable expression is different from a test of endurance or a treatment.",
    sources: [{ title: "Coles et al. (2022) — Many Smiles Collaboration", url: "https://digitalcommons.chapman.edu/psychology_articles/330/", kind: "Original preregistered multicentre study" }],
  },
  {
    id: "activity", title: "Exercise and prolonged sitting", finding: "Benefits supported; avoid literal smoking comparisons",
    claim: "The source encourages movement but also says sitting deactivates metabolism and compares its dangers with smoking.",
    commentary: "WHO recommends that adults limit sedentary time and replace it with physical activity. Its general adult guidance is 150–300 minutes of moderate activity, or 75–150 minutes of vigorous activity, weekly, plus muscle-strengthening on at least two days. Some activity is better than none. These recommendations do not mean sitting switches metabolism off or is medically equivalent to smoking.",
    implication: "A few short sessions can be a useful beginning rather than a complete weekly target. Adapt activity to your abilities and circumstances; no single seated posture cancels the effects of prolonged inactivity.",
    sources: [{ title: "WHO — Guidelines on physical activity and sedentary behaviour (2020)", url: "https://www.who.int/publications/i/item/9789240015128", kind: "Evidence-based public-health guideline" }, { title: "WHO — Physical activity recommendations", url: "https://www.who.int/initiatives/behealthy/physical-activity", kind: "Public-health recommendations" }],
  },
  {
    id: "yoga-benefits", title: "Yoga benefits and individual flow claims", finding: "General evidence does not validate every listed benefit",
    claim: "The source’s flow lists promise outcomes including pain relief, injury prevention, improved circulation, and emotional release.",
    commentary: "NCCIH describes evidence for some yoga outcomes, including stress management, balance, and some low-back-pain improvement, with differences across studies. Research on yoga programs does not establish every benefit of each specific sequence in this book. These flow pages are overviews, not complete supervised instruction.",
    implication: "Keep benefits in context as the original author’s claims. Beginners should avoid extreme poses and forceful breathing; individual conditions may require modifications and qualified guidance. No flow guarantees treatment or prevention of injury.",
    sources: [yogaSource],
  },
  {
    id: "meditation-benefits", title: "Meditation, cognition, and emotional benefits", finding: "Potential benefits; script-specific promises untested",
    claim: "The source’s meditation lists include cognitive improvement, productivity, neuroplasticity, and emotional healing.",
    commentary: "NCCIH describes possible benefits for some symptoms and well-being outcomes, but notes preliminary or uneven research, mixed findings, and unclear practical implications of some brain studies. That evidence does not validate this book’s particular scripts or guarantee improved creativity, decision-making, or productivity.",
    implication: "These are optional contemplative exercises. Meditation can sometimes be distressing; pause or choose another practice if it is unhelpful. It is not a substitute for care for persistent or severe symptoms.",
    sources: [meditationSource],
  },
  {
    id: "eye-blinking", title: "Eye exercises and blink rate", finding: "Decreased blinking is not a screen-health benefit",
    claim: "The source’s Yoga for Eyes benefit list includes decreasing blink rate and increasing eye lubrication.",
    commentary: "The National Eye Institute explains that people may blink less during prolonged screen use, which can contribute to dry eye. Presenting reduced blinking as an eye-health goal conflicts with that guidance. It does not validate the other therapeutic or cosmetic claims in this flow.",
    implication: "Do not deliberately suppress blinking to pursue this listed benefit. Persistent eye discomfort or visual changes call for an eye-care assessment rather than relying on the flow to treat them.",
    sources: [{ title: "National Eye Institute — Causes of Dry Eye", url: "https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/dry-eye/causes-dry-eye", kind: "Public-health guidance" }],
  },
  {
    id: "inversions", title: "Inversions and eye pressure", finding: "Specific safety concern; not a universal reset",
    claim: "The source describes inversions as a way to reset the body and mind and improve circulation.",
    commentary: "Jasien and colleagues (2015) studied 10 people with glaucoma and 10 without it. Four head-down yoga positions caused rapid increases in eye pressure that returned to baseline after sitting. This small study did not establish long-term glaucoma progression, but it shows why even familiar head-down poses are not automatically suitable for everyone.",
    implication: "The original medical caution remains important. The digital adaptation stays upright; this review does not prescribe an inversion angle, duration, or progression.",
    sources: [{ title: "Jasien et al. (2015) — Eye pressure during four yoga positions", url: "https://pubmed.ncbi.nlm.nih.gov/26698309/", kind: "Original prospective observational study" }],
  },
];

export const lessonEvidence: Record<string, string[]> = {
  "redefining-yoga": ["exercise-mindset"],
  "minimizing-stress": ["breathing", "magnesium"],
  "maximizing-relaxation": ["breathing", "posture"],
  "pranayama": ["breathing"],
  "posture-practice": ["posture"],
  "mind-body-connection": ["power-poses"],
  "the-balance-game": ["yoga-benefits"],
  "nature-therapy": ["nature"],
  "earthing-and-discharging": ["earthing"],
  "inversion-therapy": ["inversions"],
  "smile-yoga": ["smiling"],
  "working-out-and-cardio": ["activity"],
  "dangers-of-sitting": ["activity", "posture"],
  "updated-ergonomics": ["posture"],
  "nutrition": ["magnesium"],
  "sleep": ["sleep", "emf"],
  "new-health-variables": ["emf", "microplastics", "detox"],
  "emf-basics": ["emf"],
  "emf-protection": ["earthing", "emf", "blue-light"],
};

export function evidenceForLesson(slug: string): EvidenceTopic[] {
  return (lessonEvidence[slug] ?? []).map(id => evidenceTopics.find(topic => topic.id === id)!);
}

export function evidenceForPractice(entry: { kind: "flow" | "meditation"; slug: string }): EvidenceTopic[] {
  const ids = entry.kind === "meditation" ? ["meditation-benefits"]
    : entry.slug === "yoga-for-eyes" ? ["yoga-benefits", "eye-blinking"] : ["yoga-benefits"];
  return ids.map(id => evidenceTopics.find(topic => topic.id === id)!);
}

export function evidenceReadingText(topics: EvidenceTopic[]): string[] {
  return topics.flatMap(topic => [topic.claim, topic.commentary, topic.implication]);
}
