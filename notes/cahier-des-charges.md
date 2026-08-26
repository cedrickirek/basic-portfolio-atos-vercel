# Cahier des charges — semaine du 26 août 2026

**Objectif de la semaine : montrer la profondeur du travail.** Un lecteur
technique doit pouvoir entrer dans un projet, pas seulement le survoler.

Décidé avec Cédric le 26/08. Trois chantiers, un seul but : chaque projet
devient une histoire qu'on peut regarder, lire et télécharger.

---

## 1. Le parcours visé

Aujourd'hui un clic sur une carte ouvre une modale avec la description.
C'est un cul-de-sac : on lit trois lignes de plus, et c'est tout.

À la fin de la semaine :

```
  carte projet
      │  clic
      ▼
  MODALE : le reel se lance tout de suite
      │  · description sous la vidéo
      │  · « Lire l'étude de cas → »
      ▼
  PAGE PROJET  /projects/<slug>
      · reel
      · problème / approche / résultat
      · slide deck
```

La modale devient une **bande-annonce**, pas une fiche. Le reel est la
récompense du clic ; la page est pour qui veut aller plus loin.

**Décision prise :** la modale reste, elle ne montre plus la description
seule. Un clic = le reel démarre.

---

## 2. Les trois chantiers

### Chantier A — Un reel par projet

**Le plus important, et c'est Cédric qui le porte.** Tout le code existe
déjà (`ReelModal`, `ReelStrip`, les champs `reel` et `slides`) ; il ne
manque que les fichiers. Rien ne s'affiche tant qu'ils ne sont pas là.

À produire, par projet :

| Élément | Format | Où |
| --- | --- | --- |
| Vidéo | MP4 H.264, vertical 9:16 | `public/videos/<slug>.mp4` |
| Poster | JPG, même cadrage | `public/videos/<slug>.jpg` |
| Légende | une phrase | dans `projects.ts` |

**Le poster n'est pas optionnel.** Sans lui la tuile reste noire jusqu'à ce
que la première image se décode — et c'est cette image qui s'affiche dans
la bande d'accueil.

**Contrainte export statique :** `images.unoptimized` est actif, donc rien
n'est compressé au build. Ce qui est déposé est ce que chaque visiteur
télécharge. Viser **moins de 10 Mo par vidéo** ; au-delà on compresse
ensemble avant de committer.

Ordre suggéré : commencer par **Tutorly** (c'est le projet dont Cédric
parle le mieux) pour caler le format, puis dérouler.

### Chantier B — La page projet

Route `/projects/[slug]`, une page par projet.

**Contrainte technique vérifiée dans les docs de Next 16** (pas de mémoire,
c'est lu dans `node_modules/next/dist/docs/`) : en `output: "export"`, une
route dynamique n'existe que si elle fournit `generateStaticParams()`, et
`dynamicParams` doit valoir `false`. Sans ça le build casse. Autre piège de
cette version : **`params` est une Promise et doit être `await`é** — la
signature a changé, l'ancienne forme ne compile pas.

Structure de page, dans cet ordre :

1. **Reel** — en haut, c'est l'accroche
2. **Problème** — ce qui n'allait pas, pourquoi ça méritait un projet
3. **Approche** — ce qui a été construit, et les arbitrages
4. **Résultat** — ce qui marche, ce qui a été appris, ce qui reste ouvert
5. **Slide deck** — consultable et téléchargeable

Les trois sections centrales sont du texte que **seul Cédric peut écrire**.
Le code ne peut pas les inventer.

**Périmètre décidé : un seul projet cette semaine.** On construit le gabarit
correctement sur un vrai projet, on mesure le temps que ça coûte, et on
décide ensuite. Les cinq autres cartes continuent d'ouvrir la modale — rien
ne casse tant qu'une page n'existe pas.

### Chantier C — La catégorie « School projects »

Elle est déclarée dans le type et vide dans les données, donc elle ne
s'affiche pas du tout. Ce n'est pas cassé, c'est absent.

Il manque uniquement du contenu : titre, description, stack, catégorie
`"School projects"`. Une entrée = quelques lignes dans `projects.ts`, même
forme que les six existantes.

Question ouverte pour Cédric : **est-ce que ces travaux méritent d'être
montrés ?** Une catégorie avec un seul TP faible dessert le reste. Mieux
vaut deux projets solides que quatre remplissages.

---

## 3. Qui fait quoi

Cédric a demandé à coder une partie lui-même — « donne-moi le fichier, la
ligne et la décision, puis vérifie ».

| Tâche | Qui |
| --- | --- |
| Enregistrer les reels, faire les decks | **Cédric** |
| Écrire problème / approche / résultat | **Cédric** |
| Compresser vidéos et posters | Claude |
| Câbler `reel`/`slides` dans `projects.ts` | **Cédric**, vérifié par Claude |
| Route `[slug]` + `generateStaticParams` | Claude |
| Gabarit de la page projet | Claude, revu par Cédric |
| Rebrancher la modale sur le reel | Claude |
| Entrées « School projects » | **Cédric** |

**Le chemin critique passe par Cédric.** Le code est prêt ou rapide à
écrire ; ce qui manque, ce sont les vidéos et les textes. Une semaine sans
tournage = une semaine sans rien de visible.

---

## 4. Ordre de bataille

L'ordre compte : chaque étape rend la suivante testable.

1. **Un reel, un seul, sur Tutorly.** Il valide toute la chaîne : format,
   poids, poster, modale, bande d'accueil. Tant qu'il n'existe pas, tout le
   reste est théorique.
2. **Rebrancher la modale** sur le reel (description en légende, lien vers
   la page en dessous). Testable dès que l'étape 1 est faite.
3. **La page projet pour Tutorly**, gabarit complet avec du vrai texte.
4. **Décider** : est-ce que les cinq autres suivent, ou est-ce qu'on
   s'arrête à deux ou trois ?
5. **School projects**, si Cédric juge que le contenu tient debout.

---

## 5. Ce qui n'est pas dans le périmètre

Écrit noir sur blanc pour ne pas y revenir en milieu de semaine :

- **Performance 87 → 90+.** Le LCP est bloqué par ~835 ms d'hydratation
  (`motion/react` surtout), pas par les images. C'est une question
  d'architecture, pas un réglage. Et **ajouter des vidéos va empirer le
  score**, donc le mesurer maintenant n'a pas de sens : à refaire une fois
  les reels en place.
- **Nom de domaine.** `site.url` pointe toujours sur le sous-domaine
  Vercel. Demande un achat, pas du code.
- **Blog, formulaire de contact.** Écartés à l'arbitrage.
- **`workspace-pexel.jpg`** (2,13 Mo, inutilisé). Décision déjà prise par
  Cédric, on n'y revient pas.
- **Le playbook aura.** `notes/layout-playbook.md` attend que la branche
  aura soit reprise. Aucun lien avec cette semaine.

---

## 6. Comment on vérifie

Avant chaque commit, dans cet ordre :

```bash
npx tsc --noEmit    # Turbopack ne type-checke pas : le serveur de dev
                    # sert une erreur de type sans broncher
npx eslint src/     # `next lint` n'existe plus en Next 16
npm run build
```

Puis regarder le résultat, sur le build et pas sur le serveur de dev :

```bash
npm run build && npx serve out -l 4031
```

Trois pièges déjà rencontrés, à ne pas réapprendre :

- **`tsc` ne voit pas le disque.** Un chemin de vidéo ou de poster est une
  chaîne valide même si le fichier n'existe pas. Chaque chemin doit être
  récupéré sur le build et renvoyer un 200 — c'est comme ça qu'un 404 est
  déjà parti en production.
- **`--window-size` de Chrome headless ne fixe pas le viewport.** La page
  rend large puis est rognée, ce qui ressemble exactement à un débordement
  horizontal. Charger la page dans une `<iframe>` de 390 px.
- **Un type n'est pas un moteur de rendu.** Ajouter `reel` au type
  n'affiche rien ; il faut qu'un composant le lise. C'est déjà arrivé avec
  `country` sur la timeline.

Messages de commit : `git commit -F <fichier>`. Le here-string `@'...'@` de
PowerShell laisse un `@` littéral en première ligne sous Bash.

---

## 7. Ce qui définit une semaine réussie

Un seul critère, honnête :

> Un ami ouvre le site, clique sur une carte, **regarde Cédric expliquer le
> projet**, puis lit l'étude de cas complète.

Si ça marche pour **un** projet, la semaine est réussie et le reste n'est
que de la répétition. Si ça marche pour zéro, c'est que les vidéos n'ont
pas été tournées — et aucune ligne de code n'y aurait changé quoi que ce
soit.
