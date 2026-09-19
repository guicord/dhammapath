/**
 * Canonical Dhamma content. This is the single source of truth for both the
 * database seed (prisma/seed.ts) and the map's tooltip text (components/map),
 * so nothing is authored twice.
 *
 * `mapNodeId` is the literal `data-k` value from the original prototype
 * (input/dhamma-map.html) — map JSX references concepts by this id so it
 * never needs to change if `slug` (the public URL id) is renamed.
 */

export type DifficultyLevel = 'foundational' | 'intermediate' | 'advanced';
export type RelationshipType = 'related' | 'prerequisite' | 'derives_from';
export type SourceType = 'sutta' | 'commentary' | 'translation' | 'other';

export interface SeedConcept {
  slug: string;
  mapNodeId: string;
  title: string;
  paliTerm?: string;
  translation?: string;
  shortSummary: string;
  explanation: string;
  category: string;
  difficultyLevel: DifficultyLevel;
  tags: string[];
}

export interface SeedRelationship {
  from: string;
  to: string;
  type: RelationshipType;
}

export interface SeedSource {
  conceptSlug: string;
  title: string;
  url: string;
  attribution: string;
  sourceType: SourceType;
}

// ---------------------------------------------------------------------------
// Three Marks of Existence (nature-of-reality)
// ---------------------------------------------------------------------------
const threeMarks: SeedConcept[] = [
  {
    slug: 'three-marks-of-existence',
    mapNodeId: 'tilakkhana',
    title: 'Three Marks of Existence',
    paliTerm: 'Ti-lakkhaṇa',
    translation: 'The three characteristics',
    shortSummary: 'The three characteristics stamped on all experience.',
    explanation:
      'The three characteristics stamped on all experience. Seeing them clearly is what right view is for — they are not doctrines to believe but features to notice.',
    category: 'nature-of-reality',
    difficultyLevel: 'foundational',
    tags: ['three-marks'],
  },
  {
    slug: 'anicca',
    mapNodeId: 'anicca',
    title: 'Anicca',
    paliTerm: 'Anicca',
    translation: 'Impermanence',
    shortSummary: 'Impermanent.',
    explanation:
      'Impermanent. Everything that arises passes away — not only over a lifetime but moment to moment. Grasping at what is changing is what makes it painful.',
    category: 'nature-of-reality',
    difficultyLevel: 'foundational',
    tags: ['three-marks'],
  },
  {
    slug: 'dukkha-unsatisfactoriness',
    mapNodeId: 'dukkha',
    title: 'Dukkha',
    paliTerm: 'Dukkha',
    translation: 'Unsatisfactoriness',
    shortSummary: 'Unsatisfactory, stressful, not able to bear the weight we put on it.',
    explanation:
      "Unsatisfactory, stressful, not able to bear the weight we put on it. Wider than 'pain': the word covers subtle unease as much as open suffering.",
    category: 'nature-of-reality',
    difficultyLevel: 'foundational',
    tags: ['three-marks'],
  },
  {
    slug: 'anatta',
    mapNodeId: 'anatta',
    title: 'Anattā',
    paliTerm: 'Anattā',
    translation: 'Not-self',
    shortSummary: 'Not-self.',
    explanation:
      "Not-self. No fixed, owning, controlling self is found in body or mind. The argument in SN 22.59 is about control: if these were 'mine', they would obey.",
    category: 'nature-of-reality',
    difficultyLevel: 'foundational',
    tags: ['three-marks'],
  },
  {
    slug: 'sankhata-conditioned',
    mapNodeId: 'sankhata',
    title: 'Saṅkhata',
    paliTerm: 'Saṅkhata',
    translation: 'Conditioned',
    shortSummary: 'Anything that arises because of causes, and therefore must also cease.',
    explanation:
      "Anything that arises because of causes, and therefore must also cease. Nibbāna alone is <i>asaṅkhata</i>, unconditioned — which is why the third mark widens from 'conditioned things' to 'all things'.",
    category: 'nature-of-reality',
    difficultyLevel: 'intermediate',
    tags: ['three-marks'],
  },
];

// ---------------------------------------------------------------------------
// Dependent Origination + Kamma/Saṃsāra (nature-of-reality)
// ---------------------------------------------------------------------------
const dependentOrigination: SeedConcept[] = [
  {
    slug: 'dependent-origination',
    mapNodeId: 'paticca',
    title: 'Dependent Origination',
    paliTerm: 'Paṭicca-samuppāda',
    translation: 'Dependent origination',
    shortSummary: 'Dependent origination: nothing arises on its own.',
    explanation:
      'Dependent origination: nothing arises on its own. The Buddha said one who sees this sees the Dhamma — it is the mechanism behind the second Noble Truth.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['dependent-origination'],
  },
  {
    slug: 'do-link-1-ignorance',
    mapNodeId: 'L1',
    title: 'Avijjā (Dependent Origination)',
    paliTerm: 'Avijjā',
    translation: 'Ignorance',
    shortSummary: 'Not knowing the four truths.',
    explanation:
      'Not knowing the four truths. Not a first cause in time, but the condition that keeps the chain running.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['dependent-origination'],
  },
  {
    slug: 'do-link-2-formations',
    mapNodeId: 'L2',
    title: 'Saṅkhāra (Dependent Origination)',
    paliTerm: 'Saṅkhāra',
    translation: 'Formations',
    shortSummary: 'Volitional activity of body, speech, and mind — kamma being made.',
    explanation: 'Volitional activity of body, speech, and mind — kamma being made.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['dependent-origination'],
  },
  {
    slug: 'do-link-3-consciousness',
    mapNodeId: 'L3',
    title: 'Viññāṇa (Dependent Origination)',
    paliTerm: 'Viññāṇa',
    translation: 'Consciousness',
    shortSummary: 'Awareness arising at the sense doors, carried forward by past formations.',
    explanation: 'Awareness arising at the sense doors, carried forward by past formations.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['dependent-origination'],
  },
  {
    slug: 'do-link-4-mind-body',
    mapNodeId: 'L4',
    title: 'Nāmarūpa',
    paliTerm: 'Nāmarūpa',
    translation: 'Mind-body',
    shortSummary: 'The psycho-physical organism: name (mental factors) and form (materiality) together.',
    explanation: 'The psycho-physical organism: name (mental factors) and form (materiality) together.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['dependent-origination'],
  },
  {
    slug: 'do-link-5-six-sense-bases',
    mapNodeId: 'L5',
    title: 'Saḷāyatana',
    paliTerm: 'Saḷāyatana',
    translation: 'Six sense bases',
    shortSummary: 'Eye, ear, nose, tongue, body, and mind — the six doors through which experience arrives.',
    explanation: 'Eye, ear, nose, tongue, body, and mind — the six doors through which experience arrives.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['dependent-origination'],
  },
  {
    slug: 'do-link-6-contact',
    mapNodeId: 'L6',
    title: 'Phassa',
    paliTerm: 'Phassa',
    translation: 'Contact',
    shortSummary: 'The meeting of sense base, object, and consciousness.',
    explanation: 'The meeting of sense base, object, and consciousness. Nothing is experienced without it.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['dependent-origination'],
  },
  {
    slug: 'do-link-7-feeling',
    mapNodeId: 'L7',
    title: 'Vedanā (Dependent Origination)',
    paliTerm: 'Vedanā',
    translation: 'Feeling',
    shortSummary: 'The pleasant, unpleasant, or neutral tone that follows contact.',
    explanation:
      'The pleasant, unpleasant, or neutral tone that follows contact. The pivot point of the whole chain.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['dependent-origination'],
  },
  {
    slug: 'do-link-8-craving',
    mapNodeId: 'L8',
    title: 'Taṇhā',
    paliTerm: 'Taṇhā',
    translation: 'Craving',
    shortSummary: 'Wanting toward the pleasant, away from the unpleasant.',
    explanation:
      'Wanting toward the pleasant, away from the unpleasant. This is the second Noble Truth and the link where the chain can be broken.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['dependent-origination'],
  },
  {
    slug: 'do-link-9-clinging',
    mapNodeId: 'L9',
    title: 'Upādāna',
    paliTerm: 'Upādāna',
    translation: 'Clinging',
    shortSummary: 'Craving hardened into grasping: at sense pleasures, views, rites, and the idea of a self.',
    explanation: 'Craving hardened into grasping: at sense pleasures, views, rites, and the idea of a self.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['dependent-origination'],
  },
  {
    slug: 'do-link-10-becoming',
    mapNodeId: 'L10',
    title: 'Bhava',
    paliTerm: 'Bhava',
    translation: 'Becoming',
    shortSummary: 'The kammic process that sets up continued existence.',
    explanation: 'The kammic process that sets up continued existence.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['dependent-origination'],
  },
  {
    slug: 'do-link-11-birth',
    mapNodeId: 'L11',
    title: 'Jāti',
    paliTerm: 'Jāti',
    translation: 'Birth',
    shortSummary: 'The arising of a new existence, conditioned by that becoming.',
    explanation: 'The arising of a new existence, conditioned by that becoming.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['dependent-origination'],
  },
  {
    slug: 'do-link-12-ageing-and-death',
    mapNodeId: 'L12',
    title: 'Jarāmaraṇa',
    paliTerm: 'Jarāmaraṇa',
    translation: 'Ageing and death',
    shortSummary: 'With it come sorrow, lamentation, pain, grief, and despair.',
    explanation:
      'With it come sorrow, lamentation, pain, grief, and despair. And the whole mass of suffering begins again.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['dependent-origination'],
  },
  {
    slug: 'kamma',
    mapNodeId: 'kamma',
    title: 'Kamma',
    paliTerm: 'Kamma',
    translation: 'Intentional action',
    shortSummary: 'Intentional action.',
    explanation:
      "Intentional action. The Buddha's definition is explicit: it is <i>cetanā</i>, intention, that he calls kamma — not the outward act alone.",
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['kamma-and-samsara'],
  },
  {
    slug: 'vipaka',
    mapNodeId: 'vipaka',
    title: 'Vipāka',
    paliTerm: 'Vipāka',
    translation: 'Ripening / result',
    shortSummary: 'The ripening of kamma.',
    explanation:
      'The ripening of kamma. Not a moral ledger administered by anyone, but a natural consequence of how actions shape the mind.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['kamma-and-samsara'],
  },
  {
    slug: 'samsara',
    mapNodeId: 'samsara',
    title: 'Saṃsāra',
    paliTerm: 'Saṃsāra',
    translation: 'Wandering-on',
    shortSummary: "Literally 'wandering on': the round of repeated birth and death, driven by craving and ignorance.",
    explanation:
      "Literally 'wandering on': the round of repeated birth and death, driven by craving and ignorance.",
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['kamma-and-samsara'],
  },
  {
    slug: 'punabbhava',
    mapNodeId: 'punabbhava',
    title: 'Punabbhava',
    paliTerm: 'Punabbhava',
    translation: 'Renewed becoming',
    shortSummary: 'Renewed becoming — the continuation of the process into a further existence.',
    explanation:
      'Renewed becoming — the continuation of the process into a further existence. Its ending is liberation.',
    category: 'nature-of-reality',
    difficultyLevel: 'advanced',
    tags: ['kamma-and-samsara'],
  },
];

// ---------------------------------------------------------------------------
// Four Noble Truths (suffering-and-truth)
// ---------------------------------------------------------------------------
const fourNobleTruths: SeedConcept[] = [
  {
    slug: 'four-noble-truths',
    mapNodeId: 'saccani',
    title: 'The Four Noble Truths',
    paliTerm: 'Cattāri Ariyasaccāni',
    translation: 'The four noble truths',
    shortSummary: "The Buddha's first teaching after awakening, given at Sarnath.",
    explanation:
      "The Buddha's first teaching after awakening, given at Sarnath. Each truth carries a task: understand suffering, abandon craving, realise cessation, develop the path.",
    category: 'suffering-and-truth',
    difficultyLevel: 'foundational',
    tags: ['four-noble-truths'],
  },
  {
    slug: 'noble-truth-of-dukkha',
    mapNodeId: 't1',
    title: 'The Truth of Dukkha',
    paliTerm: 'Dukkha',
    translation: 'There is suffering',
    shortSummary:
      'Birth, ageing, illness, death, separation from what is loved, contact with what is not, not getting what one wants.',
    explanation:
      'Birth, ageing, illness, death, separation from what is loved, contact with what is not, not getting what one wants. In brief: the five clinging-aggregates.',
    category: 'suffering-and-truth',
    difficultyLevel: 'foundational',
    tags: ['four-noble-truths'],
  },
  {
    slug: 'noble-truth-of-samudaya',
    mapNodeId: 't2',
    title: 'The Truth of Samudaya',
    paliTerm: 'Samudaya',
    translation: 'Its origin',
    shortSummary: 'Craving (taṇhā) — for sense pleasure, for existence, for non-existence.',
    explanation:
      'Craving (<i>taṇhā</i>) — for sense pleasure, for existence, for non-existence. Craving is what keeps the round of becoming turning.',
    category: 'suffering-and-truth',
    difficultyLevel: 'foundational',
    tags: ['four-noble-truths'],
  },
  {
    slug: 'noble-truth-of-nirodha',
    mapNodeId: 't3',
    title: 'The Truth of Nirodha',
    paliTerm: 'Nirodha',
    translation: 'Cessation',
    shortSummary: 'The complete fading and letting go of that craving.',
    explanation:
      'The complete fading and letting go of that craving. This truth is nibbāna, stated as a possibility rather than a place.',
    category: 'suffering-and-truth',
    difficultyLevel: 'foundational',
    tags: ['four-noble-truths'],
  },
  {
    slug: 'noble-truth-of-magga',
    mapNodeId: 't4',
    title: 'The Truth of Magga',
    paliTerm: 'Magga',
    translation: 'The path',
    shortSummary: 'The Noble Eightfold Path: the way of practice leading to that cessation.',
    explanation:
      'The Noble Eightfold Path: the way of practice leading to that cessation. The fourth truth is the whole of what follows below.',
    category: 'suffering-and-truth',
    difficultyLevel: 'foundational',
    tags: ['four-noble-truths'],
  },
];

// ---------------------------------------------------------------------------
// Noble Eightfold Path + Wisdom factors + Five Aggregates (path-and-practice)
// ---------------------------------------------------------------------------
const pathAndPractice: SeedConcept[] = [
  {
    slug: 'noble-eightfold-path',
    mapNodeId: 'magga',
    title: 'The Noble Eightfold Path',
    paliTerm: 'Ariyo Aṭṭhaṅgiko Magga',
    translation: 'The noble eightfold path',
    shortSummary: 'Eight factors, cultivated together rather than in sequence.',
    explanation:
      'Eight factors, cultivated together rather than in sequence. They sort into three trainings: wisdom, ethical conduct, and concentration.',
    category: 'path-and-practice',
    difficultyLevel: 'foundational',
    tags: ['eightfold-path'],
  },
  {
    slug: 'panna-wisdom',
    mapNodeId: 'panna',
    title: 'Paññā',
    paliTerm: 'Paññā',
    translation: 'Wisdom',
    shortSummary: 'Discernment: seeing how things actually are.',
    explanation:
      'Discernment: seeing how things actually are. Placed first because right view reorients everything after it — but it also deepens as the other factors mature.',
    category: 'path-and-practice',
    difficultyLevel: 'foundational',
    tags: ['eightfold-path', 'wisdom'],
  },
  {
    slug: 'right-view',
    mapNodeId: 'p1',
    title: 'Right View',
    paliTerm: 'Sammā-diṭṭhi',
    translation: 'Right view',
    shortSummary: 'Understanding the four truths, and that actions have consequences.',
    explanation:
      'Understanding the four truths, and that actions have consequences. Mundane right view supports good rebirth; supramundane right view sees dependent origination directly.',
    category: 'path-and-practice',
    difficultyLevel: 'foundational',
    tags: ['eightfold-path', 'wisdom'],
  },
  {
    slug: 'right-intention',
    mapNodeId: 'p2',
    title: 'Right Intention',
    paliTerm: 'Sammā-saṅkappa',
    translation: 'Right intention',
    shortSummary:
      'What the mind inclines toward: renunciation instead of grasping, goodwill instead of ill-will, harmlessness instead of cruelty.',
    explanation:
      'What the mind inclines toward: renunciation instead of grasping, goodwill instead of ill-will, harmlessness instead of cruelty. Grouped under wisdom because it is the will responding to right view.',
    category: 'path-and-practice',
    difficultyLevel: 'foundational',
    tags: ['eightfold-path', 'wisdom'],
  },
  {
    slug: 'five-aggregates',
    mapNodeId: 'khandha',
    title: 'The Five Aggregates',
    paliTerm: 'Pañcakkhandha',
    translation: 'The five aggregates',
    shortSummary: 'The five heaps that make up any moment of experience.',
    explanation:
      "The five heaps that make up any moment of experience. The Buddha's answer to 'what is a person?' is this list — and none of the five is a self.",
    category: 'path-and-practice',
    difficultyLevel: 'intermediate',
    tags: ['five-aggregates'],
  },
  {
    slug: 'rupa-form',
    mapNodeId: 'rupa',
    title: 'Rūpa',
    paliTerm: 'Rūpa',
    translation: 'Form',
    shortSummary: 'Physical form: the body and material experience.',
    explanation:
      'Physical form: the body and material experience, described through the four elements of solidity, cohesion, heat, and motion.',
    category: 'path-and-practice',
    difficultyLevel: 'intermediate',
    tags: ['five-aggregates'],
  },
  {
    slug: 'vedana-feeling-aggregate',
    mapNodeId: 'vedana',
    title: 'Vedanā (Aggregate)',
    paliTerm: 'Vedanā',
    translation: 'Feeling',
    shortSummary: 'The pleasant, unpleasant, or neutral tone of any experience.',
    explanation:
      'The pleasant, unpleasant, or neutral tone of any experience. Not emotion — the raw affective quality that arises before reaction.',
    category: 'path-and-practice',
    difficultyLevel: 'intermediate',
    tags: ['five-aggregates'],
  },
  {
    slug: 'sanna-perception',
    mapNodeId: 'sanna',
    title: 'Saññā',
    paliTerm: 'Saññā',
    translation: 'Perception',
    shortSummary:
      "Recognition and labelling: matching present experience to past impressions, so a shape becomes 'tree'.",
    explanation:
      "Recognition and labelling: matching present experience to past impressions, so a shape becomes 'tree'. Once labelled, craving or aversion tends to follow the label.",
    category: 'path-and-practice',
    difficultyLevel: 'intermediate',
    tags: ['five-aggregates'],
  },
  {
    slug: 'sankhara-volition-aggregate',
    mapNodeId: 'sankhara',
    title: 'Saṅkhāra (Aggregate)',
    paliTerm: 'Saṅkhāra',
    translation: 'Volition / mental formations',
    shortSummary:
      'The intentional, kamma-forming activities of mind: intention, attention, mental states wholesome and unwholesome.',
    explanation:
      "The intentional, kamma-forming activities of mind: intention, attention, mental states wholesome and unwholesome. Also called 'mental formations'.",
    category: 'path-and-practice',
    difficultyLevel: 'intermediate',
    tags: ['five-aggregates'],
  },
  {
    slug: 'vinnana-consciousness-aggregate',
    mapNodeId: 'vinnana',
    title: 'Viññāṇa (Aggregate)',
    paliTerm: 'Viññāṇa',
    translation: 'Consciousness',
    shortSummary: 'Bare knowing at each sense door — seeing, hearing, smelling, tasting, touching, and cognising.',
    explanation:
      'Bare knowing at each sense door — seeing, hearing, smelling, tasting, touching, and cognising. It arises dependent on conditions; it is not a soul passing through.',
    category: 'path-and-practice',
    difficultyLevel: 'intermediate',
    tags: ['five-aggregates'],
  },
];

// ---------------------------------------------------------------------------
// Ethical conduct + Five Precepts + Three Unwholesome Roots (ethics-and-conduct)
// ---------------------------------------------------------------------------
const ethicsAndConduct: SeedConcept[] = [
  {
    slug: 'sila-ethical-conduct',
    mapNodeId: 'sila',
    title: 'Sīla',
    paliTerm: 'Sīla',
    translation: 'Ethical conduct',
    shortSummary: 'Virtue as a training, not a commandment.',
    explanation:
      'Virtue as a training, not a commandment. Its function is practical: a mind free of remorse can settle, so sīla is the ground concentration grows in.',
    category: 'ethics-and-conduct',
    difficultyLevel: 'foundational',
    tags: ['eightfold-path', 'conduct'],
  },
  {
    slug: 'right-speech',
    mapNodeId: 'p3',
    title: 'Right Speech',
    paliTerm: 'Sammā-vācā',
    translation: 'Right speech',
    shortSummary: 'Abstaining from lying, divisive speech, harsh speech, and idle chatter.',
    explanation:
      'Abstaining from lying, divisive speech, harsh speech, and idle chatter. The positive form: speak what is true, timely, gentle, and useful.',
    category: 'ethics-and-conduct',
    difficultyLevel: 'foundational',
    tags: ['eightfold-path', 'conduct'],
  },
  {
    slug: 'right-action',
    mapNodeId: 'p4',
    title: 'Right Action',
    paliTerm: 'Sammā-kammanta',
    translation: 'Right action',
    shortSummary: 'Abstaining from killing, taking what is not given, and sexual misconduct.',
    explanation:
      'Abstaining from killing, taking what is not given, and sexual misconduct — the bodily counterpart of right speech.',
    category: 'ethics-and-conduct',
    difficultyLevel: 'foundational',
    tags: ['eightfold-path', 'conduct'],
  },
  {
    slug: 'right-livelihood',
    mapNodeId: 'p5',
    title: 'Right Livelihood',
    paliTerm: 'Sammā-ājīva',
    translation: 'Right livelihood',
    shortSummary: 'Earning a living without harm.',
    explanation:
      'Earning a living without harm. The suttas name five trades to avoid: weapons, human beings, meat, intoxicants, and poisons.',
    category: 'ethics-and-conduct',
    difficultyLevel: 'foundational',
    tags: ['eightfold-path', 'conduct'],
  },
  {
    slug: 'five-precepts',
    mapNodeId: 'pancasila',
    title: 'The Five Precepts',
    paliTerm: 'Pañca Sīla',
    translation: 'The five precepts',
    shortSummary: 'The five training rules undertaken voluntarily by lay practitioners.',
    explanation:
      "The five training rules undertaken voluntarily by lay practitioners. The Pali is a resolve — 'I undertake the training' — rather than a prohibition handed down.",
    category: 'ethics-and-conduct',
    difficultyLevel: 'foundational',
    tags: ['five-precepts'],
  },
  {
    slug: 'precept-no-killing',
    mapNodeId: 's1',
    title: 'No Killing',
    paliTerm: 'Pāṇātipātā',
    translation: 'Abstaining from killing',
    shortSummary: 'Abstaining from taking life, extended in practice to harmlessness toward all beings.',
    explanation: 'Abstaining from taking life, extended in practice to harmlessness toward all beings.',
    category: 'ethics-and-conduct',
    difficultyLevel: 'foundational',
    tags: ['five-precepts'],
  },
  {
    slug: 'precept-no-stealing',
    mapNodeId: 's2',
    title: 'No Stealing',
    paliTerm: 'Adinnādānā',
    translation: 'Abstaining from stealing',
    shortSummary: 'Abstaining from taking what is not given, including deception and misuse of what is entrusted.',
    explanation:
      'Abstaining from taking what is not given, including deception and misuse of what is entrusted.',
    category: 'ethics-and-conduct',
    difficultyLevel: 'foundational',
    tags: ['five-precepts'],
  },
  {
    slug: 'precept-no-sexual-misconduct',
    mapNodeId: 's3',
    title: 'No Sexual Misconduct',
    paliTerm: 'Kāmesu micchācārā',
    translation: 'Abstaining from sexual misconduct',
    shortSummary: 'Abstaining from sexual behaviour that causes harm or betrays trust and commitments.',
    explanation: 'Abstaining from sexual behaviour that causes harm or betrays trust and commitments.',
    category: 'ethics-and-conduct',
    difficultyLevel: 'foundational',
    tags: ['five-precepts'],
  },
  {
    slug: 'precept-no-lying',
    mapNodeId: 's4',
    title: 'No Lying',
    paliTerm: 'Musāvādā',
    translation: 'Abstaining from false speech',
    shortSummary: 'Abstaining from false speech.',
    explanation:
      'Abstaining from false speech. Traditionally treated as the gravest of the five, since it corrupts everything built on trust.',
    category: 'ethics-and-conduct',
    difficultyLevel: 'foundational',
    tags: ['five-precepts'],
  },
  {
    slug: 'precept-no-intoxicants',
    mapNodeId: 's5',
    title: 'No Intoxicants',
    paliTerm: 'Surāmeraya',
    translation: 'Abstaining from intoxicants',
    shortSummary: 'Abstaining from drink and drugs that cause heedlessness.',
    explanation:
      'Abstaining from drink and drugs that cause heedlessness — because they erode the mindfulness the other four rest on.',
    category: 'ethics-and-conduct',
    difficultyLevel: 'foundational',
    tags: ['five-precepts'],
  },
  {
    slug: 'three-unwholesome-roots',
    mapNodeId: 'mula',
    title: 'The Three Unwholesome Roots',
    paliTerm: 'Akusala-mūla',
    translation: 'The three roots',
    shortSummary: 'Every unwholesome action traces back to one of three.',
    explanation:
      'Every unwholesome action traces back to one of three. Their opposites — non-greed, non-hatred, non-delusion — are the wholesome roots. Nibbāna is defined as their extinguishing.',
    category: 'ethics-and-conduct',
    difficultyLevel: 'intermediate',
    tags: ['three-roots'],
  },
  {
    slug: 'lobha-greed',
    mapNodeId: 'lobha',
    title: 'Lobha',
    paliTerm: 'Lobha',
    translation: 'Greed',
    shortSummary: 'Wanting, grasping, acquisitiveness.',
    explanation:
      'Wanting, grasping, acquisitiveness. Countered directly by generosity (<i>dāna</i>) and renunciation.',
    category: 'ethics-and-conduct',
    difficultyLevel: 'intermediate',
    tags: ['three-roots'],
  },
  {
    slug: 'dosa-hatred',
    mapNodeId: 'dosa',
    title: 'Dosa',
    paliTerm: 'Dosa',
    translation: 'Hatred',
    shortSummary: 'Aversion in all its forms, from irritation to rage.',
    explanation: 'Aversion in all its forms, from irritation to rage. Countered by mettā.',
    category: 'ethics-and-conduct',
    difficultyLevel: 'intermediate',
    tags: ['three-roots'],
  },
  {
    slug: 'moha-delusion',
    mapNodeId: 'moha',
    title: 'Moha',
    paliTerm: 'Moha',
    translation: 'Delusion',
    shortSummary: 'Not seeing how things are — the root beneath the other two.',
    explanation:
      'Not seeing how things are — the root beneath the other two, and the one only wisdom can remove.',
    category: 'ethics-and-conduct',
    difficultyLevel: 'intermediate',
    tags: ['three-roots'],
  },
];

// ---------------------------------------------------------------------------
// Concentration + Five Hindrances + Four Divine Abodes (concentration-and-meditation)
// ---------------------------------------------------------------------------
const concentrationAndMeditation: SeedConcept[] = [
  {
    slug: 'samadhi-concentration',
    mapNodeId: 'samadhi',
    title: 'Samādhi',
    paliTerm: 'Samādhi',
    translation: 'Concentration',
    shortSummary: 'Collectedness: the mind gathered and unified rather than scattered.',
    explanation:
      'Collectedness: the mind gathered and unified rather than scattered. Not trance — a bright, workable steadiness that wisdom can act from.',
    category: 'concentration-and-meditation',
    difficultyLevel: 'foundational',
    tags: ['eightfold-path', 'concentration'],
  },
  {
    slug: 'right-effort',
    mapNodeId: 'p6',
    title: 'Right Effort',
    paliTerm: 'Sammā-vāyāma',
    translation: 'Right effort',
    shortSummary:
      'Four efforts: prevent unwholesome states not yet arisen, abandon those arisen, arouse wholesome states, and maintain those already there.',
    explanation:
      'Four efforts: prevent unwholesome states not yet arisen, abandon those arisen, arouse wholesome states, and maintain those already there.',
    category: 'concentration-and-meditation',
    difficultyLevel: 'foundational',
    tags: ['eightfold-path', 'concentration'],
  },
  {
    slug: 'right-mindfulness',
    mapNodeId: 'p7',
    title: 'Right Mindfulness',
    paliTerm: 'Sammā-sati',
    translation: 'Right mindfulness',
    shortSummary: 'The four foundations: mindfulness of body, feelings, mind, and mental objects.',
    explanation:
      'The four foundations: mindfulness of body, feelings, mind, and mental objects — knowing what is present without adding to it.',
    category: 'concentration-and-meditation',
    difficultyLevel: 'foundational',
    tags: ['eightfold-path', 'concentration'],
  },
  {
    slug: 'right-concentration',
    mapNodeId: 'p8',
    title: 'Right Concentration',
    paliTerm: 'Sammā-samādhi',
    translation: 'Right concentration',
    shortSummary: 'Defined in the suttas as the four jhānas: successively deeper states of collected, settled attention.',
    explanation:
      'Defined in the suttas as the four jhānas: successively deeper states of collected, settled attention.',
    category: 'concentration-and-meditation',
    difficultyLevel: 'foundational',
    tags: ['eightfold-path', 'concentration'],
  },
  {
    slug: 'five-hindrances',
    mapNodeId: 'nivarana',
    title: 'The Five Hindrances',
    paliTerm: 'Nīvaraṇa',
    translation: 'The five hindrances',
    shortSummary: 'The five obstacles to a settled mind.',
    explanation:
      'The five obstacles to a settled mind. The classic similes compare them to water that is coloured, boiling, choked with weeds, wind-stirred, or muddy — in each case you cannot see your reflection.',
    category: 'concentration-and-meditation',
    difficultyLevel: 'intermediate',
    tags: ['five-hindrances'],
  },
  {
    slug: 'hindrance-sensual-desire',
    mapNodeId: 'h1',
    title: 'Sensual Desire',
    paliTerm: 'Kāmacchanda',
    translation: 'Sensual desire',
    shortSummary: 'Wanting toward sights, sounds, tastes, touches.',
    explanation: 'Wanting toward sights, sounds, tastes, touches. The mind leans out toward objects instead of settling.',
    category: 'concentration-and-meditation',
    difficultyLevel: 'intermediate',
    tags: ['five-hindrances'],
  },
  {
    slug: 'hindrance-ill-will',
    mapNodeId: 'h2',
    title: 'Ill-will',
    paliTerm: 'Byāpāda',
    translation: 'Ill-will',
    shortSummary: 'Aversion, irritation, resentment.',
    explanation: 'Aversion, irritation, resentment. Countered by mettā, the deliberate cultivation of goodwill.',
    category: 'concentration-and-meditation',
    difficultyLevel: 'intermediate',
    tags: ['five-hindrances'],
  },
  {
    slug: 'hindrance-sloth-and-torpor',
    mapNodeId: 'h3',
    title: 'Sloth and Torpor',
    paliTerm: 'Thīna-middha',
    translation: 'Sloth and torpor',
    shortSummary: 'Dullness and heaviness of mind and body.',
    explanation: 'Dullness and heaviness of mind and body. Countered by rousing energy, light, and interest.',
    category: 'concentration-and-meditation',
    difficultyLevel: 'intermediate',
    tags: ['five-hindrances'],
  },
  {
    slug: 'hindrance-restlessness-and-worry',
    mapNodeId: 'h4',
    title: 'Restlessness and Worry',
    paliTerm: 'Uddhacca-kukkucca',
    translation: 'Restlessness and worry',
    shortSummary: 'Agitation and remorse over what was done or left undone.',
    explanation: 'Agitation and remorse over what was done or left undone. Sīla addresses this at its root.',
    category: 'concentration-and-meditation',
    difficultyLevel: 'intermediate',
    tags: ['five-hindrances'],
  },
  {
    slug: 'hindrance-doubt',
    mapNodeId: 'h5',
    title: 'Doubt (Hindrance)',
    paliTerm: 'Vicikicchā',
    translation: 'Doubt',
    shortSummary: 'Not honest questioning, but the paralysing uncertainty that stops practice before it begins.',
    explanation: 'Not honest questioning, but the paralysing uncertainty that stops practice before it begins.',
    category: 'concentration-and-meditation',
    difficultyLevel: 'intermediate',
    tags: ['five-hindrances'],
  },
  {
    slug: 'four-divine-abodes',
    mapNodeId: 'brahma',
    title: 'The Four Divine Abodes',
    paliTerm: 'Brahmavihāra',
    translation: 'The four divine abodes',
    shortSummary: "The four 'divine abodes' or boundless states, radiated without limit in all directions.",
    explanation:
      "The four 'divine abodes' or boundless states, radiated without limit in all directions. Each has a near enemy that imitates it and a far enemy that opposes it.",
    category: 'concentration-and-meditation',
    difficultyLevel: 'intermediate',
    tags: ['four-divine-abodes'],
  },
  {
    slug: 'metta-loving-kindness',
    mapNodeId: 'metta',
    title: 'Mettā',
    paliTerm: 'Mettā',
    translation: 'Loving-kindness',
    shortSummary: 'Wishing beings well, without preference.',
    explanation:
      'Wishing beings well, without preference. Far enemy: ill-will. Near enemy: sentimental attachment, which looks like love but clings.',
    category: 'concentration-and-meditation',
    difficultyLevel: 'intermediate',
    tags: ['four-divine-abodes'],
  },
  {
    slug: 'karuna-compassion',
    mapNodeId: 'karuna',
    title: 'Karuṇā',
    paliTerm: 'Karuṇā',
    translation: 'Compassion',
    shortSummary: "The heart's response to suffering, wishing it eased.",
    explanation:
      "The heart's response to suffering, wishing it eased. Far enemy: cruelty. Near enemy: pity, which looks down.",
    category: 'concentration-and-meditation',
    difficultyLevel: 'intermediate',
    tags: ['four-divine-abodes'],
  },
  {
    slug: 'mudita-sympathetic-joy',
    mapNodeId: 'mudita',
    title: 'Muditā',
    paliTerm: 'Muditā',
    translation: 'Sympathetic joy',
    shortSummary: "Gladness at others' good fortune — the hardest of the four for most people.",
    explanation: "Gladness at others' good fortune — the hardest of the four for most people. Far enemy: envy.",
    category: 'concentration-and-meditation',
    difficultyLevel: 'intermediate',
    tags: ['four-divine-abodes'],
  },
  {
    slug: 'upekkha-equanimity',
    mapNodeId: 'upekkha',
    title: 'Upekkhā',
    paliTerm: 'Upekkhā',
    translation: 'Equanimity',
    shortSummary: 'Even-mindedness that holds steady through praise and blame, gain and loss.',
    explanation:
      'Even-mindedness that holds steady through praise and blame, gain and loss. Far enemy: anxiety. Near enemy: indifference, which merely looks calm.',
    category: 'concentration-and-meditation',
    difficultyLevel: 'intermediate',
    tags: ['four-divine-abodes'],
  },
];

// ---------------------------------------------------------------------------
// Ten Fetters + Fruits of the Path + Nibbāna (liberation-and-awakening)
// ---------------------------------------------------------------------------
const liberationAndAwakening: SeedConcept[] = [
  {
    slug: 'ten-fetters',
    mapNodeId: 'samyojana',
    title: 'The Ten Fetters',
    paliTerm: 'Saṃyojana',
    translation: 'The ten fetters',
    shortSummary: 'The bonds that tie a being to the round of rebirth.',
    explanation:
      'The bonds that tie a being to the round of rebirth. The four stages of awakening are defined by exactly which of these have fallen away — that is what makes them stages rather than feelings.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'advanced',
    tags: ['ten-fetters'],
  },
  {
    slug: 'fetter-self-view',
    mapNodeId: 'f_1',
    title: 'Self-view',
    paliTerm: 'Sakkāya-diṭṭhi',
    translation: 'Self-view',
    shortSummary: 'The belief in a real self within the aggregates.',
    explanation:
      'The belief in a real self within the aggregates. Dropped at stream-entry — not as an idea given up, but as something no longer seen.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'advanced',
    tags: ['ten-fetters', 'stream-enterer'],
  },
  {
    slug: 'fetter-doubt',
    mapNodeId: 'f_2',
    title: 'Doubt (Fetter)',
    paliTerm: 'Vicikicchā',
    translation: 'Doubt',
    shortSummary: 'Paralysing uncertainty about the path.',
    explanation: 'Paralysing uncertainty about the path. Ends at stream-entry because the practitioner has now seen for themselves.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'advanced',
    tags: ['ten-fetters', 'stream-enterer'],
  },
  {
    slug: 'fetter-attachment-to-rites',
    mapNodeId: 'f_3',
    title: 'Attachment to Rites and Rituals',
    paliTerm: 'Sīlabbata-parāmāsa',
    translation: 'Attachment to rites',
    shortSummary: 'Believing that rules or rituals alone bring liberation.',
    explanation: 'Believing that rules or rituals alone bring liberation. Dropped at stream-entry.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'advanced',
    tags: ['ten-fetters', 'stream-enterer'],
  },
  {
    slug: 'fetter-sensual-desire',
    mapNodeId: 'f_4',
    title: 'Sensual Desire (Fetter)',
    paliTerm: 'Kāmacchanda',
    translation: 'Sensual desire',
    shortSummary: 'Wanting toward sense pleasures.',
    explanation: 'Wanting toward sense pleasures. Weakened at once-returner, fully abandoned at non-returner.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'advanced',
    tags: ['ten-fetters', 'non-returner'],
  },
  {
    slug: 'fetter-ill-will',
    mapNodeId: 'f_5',
    title: 'Ill-will (Fetter)',
    paliTerm: 'Byāpāda',
    translation: 'Ill-will',
    shortSummary: 'Aversion.',
    explanation: 'Aversion. Weakened at once-returner, fully abandoned at non-returner.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'advanced',
    tags: ['ten-fetters', 'non-returner'],
  },
  {
    slug: 'fetter-desire-for-form',
    mapNodeId: 'f_6',
    title: 'Desire for Form',
    paliTerm: 'Rūpa-rāga',
    translation: 'Desire for form',
    shortSummary: 'Attachment to the refined states of the form realm — including the jhānas themselves.',
    explanation:
      'Attachment to the refined states of the form realm — including the jhānas themselves. Only an arahant is free of it.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'advanced',
    tags: ['ten-fetters', 'arahant'],
  },
  {
    slug: 'fetter-desire-for-formlessness',
    mapNodeId: 'f_7',
    title: 'Desire for Formlessness',
    paliTerm: 'Arūpa-rāga',
    translation: 'Desire for formlessness',
    shortSummary: 'Attachment to the formless attainments.',
    explanation: 'Attachment to the formless attainments. Also cut only at arahantship.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'advanced',
    tags: ['ten-fetters', 'arahant'],
  },
  {
    slug: 'fetter-conceit',
    mapNodeId: 'f_8',
    title: 'Conceit',
    paliTerm: 'Māna',
    translation: 'Conceit',
    shortSummary: 'Not just pride: the subtle measuring of oneself as better, worse, or equal.',
    explanation:
      'Not just pride: the subtle measuring of oneself as better, worse, or equal. It survives almost to the end.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'advanced',
    tags: ['ten-fetters', 'arahant'],
  },
  {
    slug: 'fetter-restlessness',
    mapNodeId: 'f_9',
    title: 'Restlessness (Fetter)',
    paliTerm: 'Uddhacca',
    translation: 'Restlessness',
    shortSummary: 'A residual subtle agitation of mind, long after coarse restlessness has gone.',
    explanation: 'A residual subtle agitation of mind, long after coarse restlessness has gone.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'advanced',
    tags: ['ten-fetters', 'arahant'],
  },
  {
    slug: 'fetter-ignorance',
    mapNodeId: 'f_10',
    title: 'Ignorance (Fetter)',
    paliTerm: 'Avijjā',
    translation: 'Ignorance',
    shortSummary: 'The last fetter, and the first link of dependent origination.',
    explanation: 'The last fetter, and the first link of dependent origination. When it falls, the chain has nowhere to start.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'advanced',
    tags: ['ten-fetters', 'arahant'],
  },
  {
    slug: 'fruits-of-the-path',
    mapNodeId: 'phala',
    title: 'Fruits of the Path',
    paliTerm: 'Phala',
    translation: 'Fruit',
    shortSummary: 'What the path yields.',
    explanation: 'What the path yields. Each stage of awakening has a moment of path (<i>magga</i>) and its fruit (<i>phala</i>).',
    category: 'liberation-and-awakening',
    difficultyLevel: 'intermediate',
    tags: ['fruits-of-the-path'],
  },
  {
    slug: 'jhana',
    mapNodeId: 'jhana',
    title: 'Jhāna',
    paliTerm: 'Jhāna',
    translation: 'Meditative absorption',
    shortSummary: 'Deep meditative absorption, usually described in four stages, the hindrances suppressed.',
    explanation:
      'Deep meditative absorption, usually described in four stages, the hindrances suppressed. The Buddha called it a pleasure not to be feared.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'intermediate',
    tags: ['fruits-of-the-path'],
  },
  {
    slug: 'fruit-sotapanna',
    mapNodeId: 'f1',
    title: 'Sotāpanna',
    paliTerm: 'Sotāpanna',
    translation: 'Stream-enterer',
    shortSummary: 'The first stage.',
    explanation:
      'The first stage. Three fetters fall away: self-view, doubt, and attachment to rites. No more than seven lives remain, and no rebirth below the human realm.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'intermediate',
    tags: ['fruits-of-the-path'],
  },
  {
    slug: 'fruit-sakadagami',
    mapNodeId: 'f2',
    title: 'Sakadāgāmi',
    paliTerm: 'Sakadāgāmi',
    translation: 'Once-returner',
    shortSummary: 'Greed and hatred are much weakened.',
    explanation: 'Greed and hatred are much weakened. At most one more return to this world.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'intermediate',
    tags: ['fruits-of-the-path'],
  },
  {
    slug: 'fruit-anagami',
    mapNodeId: 'f3',
    title: 'Anāgāmi',
    paliTerm: 'Anāgāmi',
    translation: 'Non-returner',
    shortSummary: 'Sensual desire and ill-will are fully abandoned.',
    explanation: 'Sensual desire and ill-will are fully abandoned. Not reborn in this realm again.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'intermediate',
    tags: ['fruits-of-the-path'],
  },
  {
    slug: 'fruit-arahant',
    mapNodeId: 'f4',
    title: 'Arahant',
    paliTerm: 'Arahant',
    translation: 'Worthy one',
    shortSummary: 'All ten fetters cut, all craving gone, the work done.',
    explanation:
      'All ten fetters cut, all craving gone, the work done. The classic phrase: what had to be done has been done.',
    category: 'liberation-and-awakening',
    difficultyLevel: 'intermediate',
    tags: ['fruits-of-the-path'],
  },
  {
    slug: 'nibbana',
    mapNodeId: 'nibbana',
    title: 'Nibbāna',
    paliTerm: 'Nibbāna',
    translation: 'Liberation / extinguishing',
    shortSummary: "Literally 'extinguishing' — the going out of the fires of greed, hatred, and delusion.",
    explanation:
      "Literally 'extinguishing' — the going out of the fires of greed, hatred, and delusion. Unconditioned and deathless, yet still not-self: it is not a soul or a heaven, and no one owns it.",
    category: 'liberation-and-awakening',
    difficultyLevel: 'intermediate',
    tags: ['nibbana'],
  },
];

export const seedConcepts: SeedConcept[] = [
  ...threeMarks,
  ...dependentOrigination,
  ...fourNobleTruths,
  ...pathAndPractice,
  ...ethicsAndConduct,
  ...concentrationAndMeditation,
  ...liberationAndAwakening,
];

// ---------------------------------------------------------------------------
// Relationships
//
// `prerequisite` reads as "fromConcept is a prerequisite of toConcept".
// Group headings link to their members as `related`; genuine doctrinal
// sequences (dependent origination, the four fruits, fetters that define a
// fruit) are modelled as `prerequisite`; terms that recur with a distinct
// explanation in a different context (e.g. `vedana` in the Five Aggregates
// vs `L7` in Dependent Origination) are linked as `related` rather than
// merged into one concept, preserving the doctrinal nuance of each context.
// ---------------------------------------------------------------------------
export const seedRelationships: SeedRelationship[] = [
  // Three Marks — heading to members
  { from: 'three-marks-of-existence', to: 'anicca', type: 'related' },
  { from: 'three-marks-of-existence', to: 'dukkha-unsatisfactoriness', type: 'related' },
  { from: 'three-marks-of-existence', to: 'anatta', type: 'related' },
  { from: 'three-marks-of-existence', to: 'sankhata-conditioned', type: 'related' },
  { from: 'three-marks-of-existence', to: 'four-noble-truths', type: 'related' },

  // Four Noble Truths — heading to members
  { from: 'four-noble-truths', to: 'noble-truth-of-dukkha', type: 'related' },
  { from: 'four-noble-truths', to: 'noble-truth-of-samudaya', type: 'related' },
  { from: 'four-noble-truths', to: 'noble-truth-of-nirodha', type: 'related' },
  { from: 'four-noble-truths', to: 'noble-truth-of-magga', type: 'related' },
  { from: 'noble-truth-of-magga', to: 'noble-eightfold-path', type: 'related' },

  // Eightfold Path — heading to the three trainings, trainings to factors
  { from: 'noble-eightfold-path', to: 'panna-wisdom', type: 'related' },
  { from: 'noble-eightfold-path', to: 'sila-ethical-conduct', type: 'related' },
  { from: 'noble-eightfold-path', to: 'samadhi-concentration', type: 'related' },
  { from: 'panna-wisdom', to: 'right-view', type: 'related' },
  { from: 'panna-wisdom', to: 'right-intention', type: 'related' },
  { from: 'sila-ethical-conduct', to: 'right-speech', type: 'related' },
  { from: 'sila-ethical-conduct', to: 'right-action', type: 'related' },
  { from: 'sila-ethical-conduct', to: 'right-livelihood', type: 'related' },
  { from: 'samadhi-concentration', to: 'right-effort', type: 'related' },
  { from: 'samadhi-concentration', to: 'right-mindfulness', type: 'related' },
  { from: 'samadhi-concentration', to: 'right-concentration', type: 'related' },

  // Wisdom examines the aggregates (flip card: front wisdom, back aggregates)
  { from: 'panna-wisdom', to: 'five-aggregates', type: 'related' },
  { from: 'five-aggregates', to: 'rupa-form', type: 'related' },
  { from: 'five-aggregates', to: 'vedana-feeling-aggregate', type: 'related' },
  { from: 'five-aggregates', to: 'sanna-perception', type: 'related' },
  { from: 'five-aggregates', to: 'sankhara-volition-aggregate', type: 'related' },
  { from: 'five-aggregates', to: 'vinnana-consciousness-aggregate', type: 'related' },

  // Conduct examines the precepts (flip card: front conduct, back precepts)
  { from: 'sila-ethical-conduct', to: 'five-precepts', type: 'related' },
  { from: 'five-precepts', to: 'precept-no-killing', type: 'related' },
  { from: 'five-precepts', to: 'precept-no-stealing', type: 'related' },
  { from: 'five-precepts', to: 'precept-no-sexual-misconduct', type: 'related' },
  { from: 'five-precepts', to: 'precept-no-lying', type: 'related' },
  { from: 'five-precepts', to: 'precept-no-intoxicants', type: 'related' },

  // Concentration examines the hindrances (flip card: front calm, back hindrances)
  { from: 'samadhi-concentration', to: 'five-hindrances', type: 'related' },
  { from: 'five-hindrances', to: 'hindrance-sensual-desire', type: 'related' },
  { from: 'five-hindrances', to: 'hindrance-ill-will', type: 'related' },
  { from: 'five-hindrances', to: 'hindrance-sloth-and-torpor', type: 'related' },
  { from: 'five-hindrances', to: 'hindrance-restlessness-and-worry', type: 'related' },
  { from: 'five-hindrances', to: 'hindrance-doubt', type: 'related' },

  // Three Unwholesome Roots
  { from: 'noble-eightfold-path', to: 'three-unwholesome-roots', type: 'related' },
  { from: 'three-unwholesome-roots', to: 'lobha-greed', type: 'related' },
  { from: 'three-unwholesome-roots', to: 'dosa-hatred', type: 'related' },
  { from: 'three-unwholesome-roots', to: 'moha-delusion', type: 'related' },
  { from: 'lobha-greed', to: 'right-intention', type: 'related' },
  { from: 'dosa-hatred', to: 'metta-loving-kindness', type: 'related' },
  { from: 'moha-delusion', to: 'panna-wisdom', type: 'related' },

  // Ten Fetters
  { from: 'noble-eightfold-path', to: 'ten-fetters', type: 'related' },
  { from: 'ten-fetters', to: 'fetter-self-view', type: 'related' },
  { from: 'ten-fetters', to: 'fetter-doubt', type: 'related' },
  { from: 'ten-fetters', to: 'fetter-attachment-to-rites', type: 'related' },
  { from: 'ten-fetters', to: 'fetter-sensual-desire', type: 'related' },
  { from: 'ten-fetters', to: 'fetter-ill-will', type: 'related' },
  { from: 'ten-fetters', to: 'fetter-desire-for-form', type: 'related' },
  { from: 'ten-fetters', to: 'fetter-desire-for-formlessness', type: 'related' },
  { from: 'ten-fetters', to: 'fetter-conceit', type: 'related' },
  { from: 'ten-fetters', to: 'fetter-restlessness', type: 'related' },
  { from: 'ten-fetters', to: 'fetter-ignorance', type: 'related' },

  // Four Divine Abodes
  { from: 'noble-eightfold-path', to: 'four-divine-abodes', type: 'related' },
  { from: 'four-divine-abodes', to: 'metta-loving-kindness', type: 'related' },
  { from: 'four-divine-abodes', to: 'karuna-compassion', type: 'related' },
  { from: 'four-divine-abodes', to: 'mudita-sympathetic-joy', type: 'related' },
  { from: 'four-divine-abodes', to: 'upekkha-equanimity', type: 'related' },
  { from: 'hindrance-ill-will', to: 'metta-loving-kindness', type: 'related' },
  { from: 'hindrance-restlessness-and-worry', to: 'sila-ethical-conduct', type: 'related' },

  // Fruits of the Path
  { from: 'noble-eightfold-path', to: 'fruits-of-the-path', type: 'prerequisite' },
  { from: 'fruits-of-the-path', to: 'jhana', type: 'related' },
  { from: 'jhana', to: 'right-concentration', type: 'related' },
  { from: 'jhana', to: 'samadhi-concentration', type: 'related' },
  { from: 'fruits-of-the-path', to: 'fruit-sotapanna', type: 'related' },
  { from: 'fruits-of-the-path', to: 'fruit-sakadagami', type: 'related' },
  { from: 'fruits-of-the-path', to: 'fruit-anagami', type: 'related' },
  { from: 'fruits-of-the-path', to: 'fruit-arahant', type: 'related' },
  { from: 'fruit-sotapanna', to: 'fruit-sakadagami', type: 'prerequisite' },
  { from: 'fruit-sakadagami', to: 'fruit-anagami', type: 'prerequisite' },
  { from: 'fruit-anagami', to: 'fruit-arahant', type: 'prerequisite' },
  { from: 'fruits-of-the-path', to: 'nibbana', type: 'related' },
  { from: 'fruit-arahant', to: 'nibbana', type: 'related' },

  // Fetters cut at each stage (prerequisite of reaching that fruit)
  { from: 'fetter-self-view', to: 'fruit-sotapanna', type: 'prerequisite' },
  { from: 'fetter-doubt', to: 'fruit-sotapanna', type: 'prerequisite' },
  { from: 'fetter-attachment-to-rites', to: 'fruit-sotapanna', type: 'prerequisite' },
  { from: 'fetter-sensual-desire', to: 'fruit-anagami', type: 'prerequisite' },
  { from: 'fetter-ill-will', to: 'fruit-anagami', type: 'prerequisite' },
  { from: 'fetter-desire-for-form', to: 'fruit-arahant', type: 'prerequisite' },
  { from: 'fetter-desire-for-formlessness', to: 'fruit-arahant', type: 'prerequisite' },
  { from: 'fetter-conceit', to: 'fruit-arahant', type: 'prerequisite' },
  { from: 'fetter-restlessness', to: 'fruit-arahant', type: 'prerequisite' },
  { from: 'fetter-ignorance', to: 'fruit-arahant', type: 'prerequisite' },

  // Dependent Origination — heading to each link, plus the sequential chain
  { from: 'dependent-origination', to: 'do-link-1-ignorance', type: 'related' },
  { from: 'dependent-origination', to: 'do-link-2-formations', type: 'related' },
  { from: 'dependent-origination', to: 'do-link-3-consciousness', type: 'related' },
  { from: 'dependent-origination', to: 'do-link-4-mind-body', type: 'related' },
  { from: 'dependent-origination', to: 'do-link-5-six-sense-bases', type: 'related' },
  { from: 'dependent-origination', to: 'do-link-6-contact', type: 'related' },
  { from: 'dependent-origination', to: 'do-link-7-feeling', type: 'related' },
  { from: 'dependent-origination', to: 'do-link-8-craving', type: 'related' },
  { from: 'dependent-origination', to: 'do-link-9-clinging', type: 'related' },
  { from: 'dependent-origination', to: 'do-link-10-becoming', type: 'related' },
  { from: 'dependent-origination', to: 'do-link-11-birth', type: 'related' },
  { from: 'dependent-origination', to: 'do-link-12-ageing-and-death', type: 'related' },
  { from: 'do-link-1-ignorance', to: 'do-link-2-formations', type: 'prerequisite' },
  { from: 'do-link-2-formations', to: 'do-link-3-consciousness', type: 'prerequisite' },
  { from: 'do-link-3-consciousness', to: 'do-link-4-mind-body', type: 'prerequisite' },
  { from: 'do-link-4-mind-body', to: 'do-link-5-six-sense-bases', type: 'prerequisite' },
  { from: 'do-link-5-six-sense-bases', to: 'do-link-6-contact', type: 'prerequisite' },
  { from: 'do-link-6-contact', to: 'do-link-7-feeling', type: 'prerequisite' },
  { from: 'do-link-7-feeling', to: 'do-link-8-craving', type: 'prerequisite' },
  { from: 'do-link-8-craving', to: 'do-link-9-clinging', type: 'prerequisite' },
  { from: 'do-link-9-clinging', to: 'do-link-10-becoming', type: 'prerequisite' },
  { from: 'do-link-10-becoming', to: 'do-link-11-birth', type: 'prerequisite' },
  { from: 'do-link-11-birth', to: 'do-link-12-ageing-and-death', type: 'prerequisite' },
  { from: 'do-link-12-ageing-and-death', to: 'do-link-1-ignorance', type: 'related' },

  // Kamma / Saṃsāra chain
  { from: 'kamma', to: 'vipaka', type: 'related' },
  { from: 'vipaka', to: 'samsara', type: 'related' },
  { from: 'samsara', to: 'punabbhava', type: 'related' },

  // Thematic overlaps: same Pali root, distinct context and explanation —
  // kept as separate concepts, connected explicitly rather than merged.
  { from: 'dukkha-unsatisfactoriness', to: 'noble-truth-of-dukkha', type: 'related' },
  { from: 'noble-truth-of-samudaya', to: 'do-link-8-craving', type: 'related' },
  { from: 'fetter-ignorance', to: 'do-link-1-ignorance', type: 'related' },
  { from: 'sankhara-volition-aggregate', to: 'do-link-2-formations', type: 'related' },
  { from: 'vinnana-consciousness-aggregate', to: 'do-link-3-consciousness', type: 'related' },
  { from: 'vedana-feeling-aggregate', to: 'do-link-7-feeling', type: 'related' },
  { from: 'fetter-doubt', to: 'hindrance-doubt', type: 'related' },
  { from: 'fetter-sensual-desire', to: 'hindrance-sensual-desire', type: 'related' },
  { from: 'fetter-ill-will', to: 'hindrance-ill-will', type: 'related' },
];

// ---------------------------------------------------------------------------
// Sources — a small, verified subset of real canonical references.
// Everything else intentionally has no source rows yet; the UI shows a
// "coming soon" placeholder rather than a fabricated citation, and filling
// in the rest is an ongoing content task (see story 12).
// ---------------------------------------------------------------------------
export const seedSources: SeedSource[] = [
  {
    conceptSlug: 'four-noble-truths',
    title: 'Dhammacakkappavattana Sutta: Setting the Wheel of Dhamma in Motion (SN 56.11)',
    url: 'https://suttacentral.net/sn56.11/en/sujato',
    attribution: 'Bhikkhu Sujato (trans.), SuttaCentral',
    sourceType: 'sutta',
  },
  {
    conceptSlug: 'anatta',
    title: 'Anattalakkhaṇa Sutta: The Characteristic of Non-self (SN 22.59)',
    url: 'https://suttacentral.net/sn22.59/en/sujato',
    attribution: 'Bhikkhu Sujato (trans.), SuttaCentral',
    sourceType: 'sutta',
  },
  {
    conceptSlug: 'noble-eightfold-path',
    title: 'Vibhaṅga Sutta: Analysis (SN 45.8)',
    url: 'https://suttacentral.net/sn45.8/en/sujato',
    attribution: 'Bhikkhu Sujato (trans.), SuttaCentral',
    sourceType: 'sutta',
  },
  {
    conceptSlug: 'right-mindfulness',
    title: 'Satipaṭṭhāna Sutta: The Foundations of Mindfulness (MN 10)',
    url: 'https://suttacentral.net/mn10/en/sujato',
    attribution: 'Bhikkhu Sujato (trans.), SuttaCentral',
    sourceType: 'sutta',
  },
  {
    conceptSlug: 'dependent-origination',
    title: 'Mahānidāna Sutta: The Great Discourse on Origination (DN 15)',
    url: 'https://suttacentral.net/dn15/en/sujato',
    attribution: 'Bhikkhu Sujato (trans.), SuttaCentral',
    sourceType: 'sutta',
  },
  {
    conceptSlug: 'metta-loving-kindness',
    title: 'Karaṇīyamettā Sutta: Loving-kindness (Snp 1.8)',
    url: 'https://suttacentral.net/snp1.8/en/sujato',
    attribution: 'Bhikkhu Sujato (trans.), SuttaCentral',
    sourceType: 'sutta',
  },
];
