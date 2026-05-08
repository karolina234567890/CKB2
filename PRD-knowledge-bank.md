# PRD: Knowledge Bank

**Status:** Draft  
**Data:** 2026-05-08  
**Produkt:** Design Console — Planning Agent  
**Feature:** Knowledge Bank (nowy moduł standalone)

---

## 1. Kontekst i problem

Planning Agent to narzędzie do tworzenia media planów, w którym planner przechodzi przez kolejne kroki (Channel Selection, Budget Allocation, Partner Selection itd.) wspierany przez AI Copilota. Copilot odpowiada na pytania i generuje rekomendacje w oparciu o kontekst kampanii.

**Problem:** Copilot nie ma dostępu do zinstytucjonalizowanej wiedzy organizacji — globalnych trendów mediowych, danych rynkowych per country, historii klienta, pozycjonowania brandu. Każda odpowiedź bazuje wyłącznie na danych z briefa i modelu językowego. Powoduje to, że:

- Rekomendacje nie uwzględniają specyfiki klienta (np. strategie historyczne, nagrody, preferencje partnerów)
- Planner musi ręcznie wyszukiwać i wklejać kontekst do chatu
- Wiedza agencji nie jest skumulowana ani dostępna w ustrukturyzowany sposób
- Nie ma możliwości wpływania na to, co Copilot priorytetyzuje

**Rozwiązanie:** Knowledge Bank — zarządzana baza faktów podzielona na 4 poziomy hierarchii (Global → Market → Client → Brand), z której Copilot automatycznie czerpie kontekst podczas pracy nad media planem.

---

## 2. Cele

### Cele biznesowe
- Zwiększyć jakość i trafność rekomendacji Copilota poprzez dodanie zinstytucjonalizowanego kontekstu
- Umożliwić agencji akumulowanie wiedzy i jej reużywanie across planners i kampanie
- Dać Knowledge Managerom kontrolę nad tym, co Copilot "wie" i co priorytetyzuje

### Cele użytkownika
- **Knowledge Managers (admini):** Możliwość łatwego zarządzania bazą wiedzy — upload plików, przegląd wyekstraktowanych faktów, korekcja, dodawanie ręczne
- **Media Planners:** Transparentność w tym, skąd pochodzi wiedza Copilota; możliwość przeglądania bazy wiedzy jako read-only

### Success metrics (do zdefiniowania z zespołem)
- % odpowiedzi Copilota z przynajmniej 1 cytowanym faktem z KB
- Liczba plików uploadowanych per tydzień (adoption Knowledge Managers)
- Czas spędzony na Knowledge Bank per sesję (engagement)
- Planner NPS / satysfakcja z rekomendacji Copilota

---

## 3. Użytkownicy i role

### Role i uprawnienia

| Rola | Opis | Uprawnienia w KB |
|---|---|---|
| **Global Admin** | Zarządza wiedzą globalną — trendy mediowe, standardy branżowe | Edit: Global tab. Read-only: Market, Client, Brand |
| **Market Admin** | Zarządza wiedzą dla konkretnego rynku (np. US, UK) | Edit: swoje markety. Read-only: wszystkie pozostałe |
| **Client Admin** | Zarządza wiedzą dla konkretnego klienta i jego brandów | Edit: swój klient + jego brandy. Read-only: pozostałe |
| **Media Planner** | Tworzy media plany, używa Copilota | Read-only: wszystkie taby Knowledge Bank |

**Uwaga:** Market Admin widzi WSZYSTKIE markety w selectorze, ale może edytować tylko te, do których ma przypisany dostęp. Pozostałe widzi jako read-only.

---

## 4. Architektura informacji

### Mapa aplikacji (po wprowadzeniu KB)

```
Design Console (top-level)
│
├── Planning Agent
│   ├── Media Plan List
│   │   ├── Single Market Plans [tab]
│   │   └── Multimarket Plans [tab]
│   └── Media Plan (detail)
│       ├── Kroki tworzenia planu
│       └── Copilot panel (z citation tooltipami)
│
├── Media Strategy
│
└── Knowledge Bank  ← NOWY MODUŁ
    ├── Global [tab]
    ├── Market [tab]
    ├── Client [tab]
    └── Brand [tab]
```

Knowledge Bank jest dostępny jako **standalone sekcja** w Design Console, niezależna od Planning Agent.

### Hierarchia wiedzy

```
Global
  └── Market (np. United States, United Kingdom)
        └── Client (np. Coca-Cola, Nike)
              └── Brand (np. Coca-Cola Zero, Nike Air)
```

Każdy poziom ma niezależną bazę faktów. Copilot w kontekście danego media planu (Client X / Market Y) automatycznie pobiera fakty ze wszystkich odpowiednich poziomów.

---

## 5. Knowledge Bank — szczegółowy opis funkcji

### 5.1 Nawigacja i dostęp

**Tabs:** Global | Market | Client | Brand

Przy wejściu na tab:
- **Global tab:** od razu pokazuje pliki i fakty. Brak selektora.
- **Market tab:** pokazuje Market selector (search + dropdown). Po wyborze marketu — pliki i fakty dla tego marketu.
- **Client tab:** pokazuje Client selector (search + dropdown). Po wyborze klienta — pliki i fakty.
- **Brand tab:** 2-poziomowy selector — najpierw wybór klienta, potem wyboru brandu (drugiego poziomu). Po obu wyborach — pliki i fakty dla wybranego brandu.

**Permission banner:** Subtelny banner na górze każdego taba:
- Zielony: "You have edit access to [level]"
- Szary: "Read-only — contact your admin to make changes"

---

### 5.2 File Management

Sekcja widoczna dla wszystkich użytkowników (admini mogą zarządzać, plannerzy tylko przeglądają).

**Upload (admin only):**
- Drag & drop zone + przycisk "Upload file"
- Obsługiwane formaty: PDF, DOCX, PPTX, XLSX
- Upload jest przypisany do aktualnie wybranego poziomu (tab + wybrany market/client/brand)
- Po uploadzie: natychmiastowe uruchomienie ekstrakcji faktów w tle

**File list:**
Każdy plik wyświetla:
- Ikona formatu (PDF/Word/PowerPoint/Excel)
- Nazwa pliku
- Kategoria (np. "Strategy", "Research", "Brief") — przypisywana automatycznie przez AI, edytowalna
- Język dokumentu
- Data uploadu
- Przycisk usunięcia (admin only)

**Loading state po uploadzie:**
Bezpośrednio po uploadzie, w sekcji Facts pojawiają się skeleton placeholdery topic cards (animowane szare bloki) wskazując że ekstrakcja jest w toku. Fakty pojawiają się stopniowo per temat w miarę jak AI je generuje.

---

### 5.3 Facts — struktura z tematami

Fakty są organizowane w **tematy (topics)**. Tematy tworzone są automatycznie przez AI podczas ekstrakcji faktów z pliku. Admin może temat edytować, zmienić jego nazwę, dodać ręcznie nowy temat lub usunąć.

#### Nagłówek sekcji Facts

```
X active facts  ·  Y high-priority      [+ Add topic]   [Search facts...]
```

- **X active facts** — łączna liczba aktywnych faktów na tym poziomie
- **Y high-priority** — liczba faktów oznaczonych High priority (stanowią "sygnały dla plannerów" — Copilot priorytetyzuje je)
- **[+ Add topic]** — widoczny tylko dla adminów
- **[Search facts...]** — przeszukuje treść faktów across wszystkich tematów

#### Topic card (collapsed — stan domyślny)

```
┌────────────────────────────────────────────────────────┐
│  [⚙]  Brand Positioning                      ●  2/2  ∧ │
│        Promise, pillars, differentiation                │
│                                                         │
│  AI summary: The brand positions itself as a           │
│  premium-yet-approachable choice, anchoring its        │
│  identity around craftsmanship and trust.              │
└────────────────────────────────────────────────────────┘
```

Elementy:
- **Ikona tematu** — auto-wybrana przez AI (SVG icon), admin może zmienić
- **Nazwa tematu** — edytowalna (admin)
- **Opis/subtitle** — krótki opis zakresu tematu, edytowalny (admin)
- **Czerwona kropka (●)** — pojawia się jeśli temat zawiera przynajmniej 1 fakt High priority
- **Badge N/N** — liczba faktów (aktywne / wszystkie)
- **Strzałka ∧∨** — collapse/expand
- **AI Summary** — 1-3 zdania generowane przez AI na podstawie wszystkich faktów w temacie. Auto-regenerowane przy każdej zmianie faktów (dodanie/edycja/usunięcie). Nie edytowalne ręcznie.

#### Topic card (expanded — po kliknięciu)

```
┌────────────────────────────────────────────────────────┐
│  [⚙]  Brand Positioning                      ●  2/2  ∨ │
│        Promise, pillars, differentiation                │
│                                                         │
│  AI summary: The brand positions itself as a           │
│  premium-yet-approachable choice...                    │
│                                                         │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  ✓  Reinforces positioning around "DEI media brief    │
│     v1" — anchor on craftsmanship and trust.           │
│     [High priority ∨]  [⚙ DEI media brief v1.pdf]    │
│     [+ Add tags]                                        │
│                                                         │
│  - - - - - - - - - - - - - - - - - - - - - - - - -   │
│                                                         │
│  ✓  Positioned as the premium-yet-approachable        │
│     choice; promise of effortless craft.               │
│     [High priority ∨]  [manual]  [#brand]             │
│     [#positioning]  [Edit]                             │
│                                                         │
│  + + + + + + + + + + + + + + + + + + + + + + + + +   │
│  +  Add fact to this topic                           + │
│  + + + + + + + + + + + + + + + + + + + + + + + + +   │
└────────────────────────────────────────────────────────┘
```

#### Fact row — elementy

| Element | Opis |
|---|---|
| **Checkmark** | Zielone kółko z checkmarkiem — fakt jest aktywny |
| **Treść faktu** | Tekst faktu. Inline editable (admin): kliknięcie aktywuje edycję w miejscu |
| **Priority pill** | Dropdown: High priority (salmon/red) / Medium priority (amber) / Low priority (gray). Admin zmienia priorytet. Planner widzi ale nie może zmienić. |
| **Source tag** | Jeśli wyekstraktowany z pliku: ikona AI + nazwa pliku. Jeśli dodany ręcznie: tag "manual" |
| **Hashtag tags** | #tag1 #tag2 — dodawane przez admina. "Add tags" jeśli brak |
| **Edit button** | Widoczny tylko dla adminów, aktywuje inline editing |
| **Delete** | Dostępne w trybie edycji (admin) — usuwa fakt z tematu |

**Inline editing faktu (admin):**
1. Kliknięcie w treść faktu LUB w "Edit" aktywuje tryb edycji
2. Tekst staje się edytowalny input
3. Przyciski: [Save] / [Cancel]
4. Po Save: AI Summary dla tematu regeneruje się automatycznie

#### Dodawanie faktu ręcznie

Przycisk "**+ Add fact to this topic**" (dashed border, na dole każdego expanded topic):
- Otwiera nowy fact row w trybie edycji pod istniejącymi faktami
- Admin wpisuje treść, ustawia priority, opcjonalnie dodaje tagi
- Source tag przyjmuje "manual"
- [Save] zapisuje fakt

#### Dodawanie tematu ręcznie (admin)

Przycisk "**+ Add topic**" (nagłówek sekcji Facts):
- Otwiera nową topic card z pustymi polami: nazwa, opis, ikona
- Admin wypełnia nazwę i opis
- Ikona auto-sugerowana przez AI na podstawie nazwy, admin może zmienić
- Zapisany pusty temat można od razu uzupełnić faktami przyciskiem "+ Add fact to this topic"

---

### 5.4 Stany puste (empty states)

| Scenariusz | Co widzi użytkownik |
|---|---|
| Nowy poziom — brak plików i faktów | Ilustracja + "No knowledge yet" + "Upload your first document to start building [Global/Market/Client/Brand] knowledge" + przycisk Upload (admin) lub info (planner) |
| Plik uploadowany, ekstrakcja w toku | Skeleton topic cards (animowane placeholder'y) + "Extracting facts..." |
| Plik uploadowany, AI nie znalazło żadnych faktów | Informacja: "No facts extracted from [filename]. You can add facts manually." |
| Wyszukiwanie bez wyników | "No facts match your search" |

---

## 6. Copilot — Citations

### Kontekst Copilota w media planie

Kiedy planner tworzy media plan, Copilot automatycznie ma dostęp do:
- **Global facts** (wszystkie, priorytet High najpierw)
- **Market facts** (dla marketu wybranego w top nav)
- **Client facts** (dla klienta wybranego w top nav)
- **Brand facts** (dla brandu wybranego w kroku Media Plan Details)
- **Brief facts** (wyekstraktowane z uploadowanego briefa — tylko na czas tego media planu, nie przechowywane w KB)

Fakty oznaczone **High priority** są przez Copilot priorytetyzowane — pojawiają się wcześniej w kontekście i mają wyższy ranking przy odpowiadaniu na pytania dotyczące wiedzy mediowej.

### Citation icon i tooltip

Każdy insight/rekomendacja Copilota zawiera ikonę informacyjną **[ℹ]** po prawej stronie tekstu.

Zachowanie:
- **Hover na [ℹ]:** pojawia się tooltip z listą faktów, na których oparty jest ten insight
- **Click na [ℹ]:** tooltip pozostaje widoczny (sticky) do kliknięcia poza
- **Brak faktów:** tooltip pokazuje "This insight is not based on stored facts"

### Struktura tooltipa

Każdy fakt w tooltipie zawiera:

```
┌──────────────────────────────────────────────────────┐
│  Based on:                                           │
│                                                      │
│  "CTV grew 34% year-over-year in premium content     │
│   environments in 2025..."                           │
│  Level: Global                                       │
│  Source: Global-Media-Trends-2025.pdf               │
│  Stored in: Global Knowledge Bank                   │
│  View in Knowledge Bank →                           │
│                                                      │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
│                                                      │
│  "US digital advertising shift +12% vs prior year"  │
│  Level: Market — United States                      │
│  Source: US-Market-Intelligence-Q4.pdf             │
│  Stored in: Market Knowledge Bank                   │
│  View in Knowledge Bank →                           │
│                                                      │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
│                                                      │
│  "Campaign focus: reach youth 18-25 urban"          │
│  Level: Brief                                       │
│  Source: CampaignBrief-FY26.pdf                    │
│  (not stored in Knowledge Bank)                     │
└──────────────────────────────────────────────────────┘
```

Szczegóły:
- **Treść faktu:** truncated po ~80 znakach z "..." (pełna treść po najechaniu na sam tekst)
- **Level:** Global / Market — [nazwa] / Client — [nazwa] / Brand — [nazwa] / Brief
- **Source:** nazwa pliku źródłowego
- **Stored in:** np. "Global Knowledge Bank", "Market Knowledge Bank (United States)"
- **"View in Knowledge Bank →":** deep-link do Knowledge Bank → odpowiedni tab + wybrany kontekst (market/client/brand). **Dostępny tylko dla faktów z KB, nie dla Brief.**

---

## 7. User flows

### Flow 1: Knowledge Manager uploaduje dokument i zarządza faktami

```
1. Design Console → Knowledge Bank (lewy nav)
2. Tab [Client] → Client selector: wybierz "Coca-Cola"
3. File Management → Upload zone → drag & drop "FY26-Coca-Cola-Strategy.pdf"
4. [Skeleton loading w sekcji Facts...]
5. Fakty pojawiają się pogrupowane w tematy (np. "Brand Positioning", "Campaign History", "Audience")
6. Admin przegląda tematy:
   a. Zauważa błąd w temacie "Brand Positioning" → kliknięcie w fakt → inline edit → Save
   b. Usuwa fakt nieistotny dla plannerów → kliknięcie Edit → Delete
   c. Dodaje ręczny fakt: "+ Add fact to this topic" → wpisuje treść → High priority → Save
   d. Zmienia priorytet faktu na "High priority" żeby Copilot go priorytetyzował
7. AI Summary per temat regeneruje się automatycznie
```

### Flow 2: Media Planner przegląda bazę wiedzy (read-only)

```
1. Design Console → Knowledge Bank
2. Tab [Global] → przegląda global facts (brak kontrolek edycji)
3. Tab [Market] → wybiera "United States" → przegląda market facts
4. Tab [Client] → wybiera "Coca-Cola" → widzi client facts zgrupowane w tematy
5. Używa Search: wpisuje "youth" → filtruje fakty across tematów
```

### Flow 3: Planner tworzy media plan z Copilotem korzystającym z KB

```
1. Design Console, top nav: Client: Coca-Cola | Market: United States
2. Planning Agent → New Media Plan → Upload brief → step 1: Brand = "Coca-Cola Zero"
3. Copilot (prawy panel) aktywny przez cały czas
4. Planner pyta Copilota: "What media approach should I prioritize?"
5. Copilot odpowiada uwzględniając:
   - Global facts (High priority facts najwyżej rankowane)
   - Market facts: United States
   - Client facts: Coca-Cola
   - Brand facts: Coca-Cola Zero
   - Brief facts: z uploadowanego briefa
6. Po każdym insighcie pojawia się [ℹ]
7. Planner hovering [ℹ] → tooltip z listą faktów źródłowych
8. Planner klika "View in Knowledge Bank →" → otwiera KB na odpowiednim tabę
```

---

## 8. Wymagania funkcjonalne

### Knowledge Bank — ogólne

| ID | Wymaganie | Priorytet |
|---|---|---|
| KB-01 | KB dostępny jako standalone sekcja w Design Console (nie wewnątrz Planning Agent) | Must |
| KB-02 | 4 taby: Global, Market, Client, Brand | Must |
| KB-03 | Market/Client/Brand taby wymagają selektora przed pokazaniem treści | Must |
| KB-04 | Brand tab ma 2-poziomowy selector (Client → Brand) | Must |
| KB-05 | Permission banner informujący o poziomie dostępu | Must |
| KB-06 | Każdy tab widoczny dla wszystkich zalogowanych userów (plannerzy read-only) | Must |

### File Management

| ID | Wymaganie | Priorytet |
|---|---|---|
| FM-01 | Upload pliku (PDF, DOCX, PPTX, XLSX) przez drag & drop lub kliknięcie | Must |
| FM-02 | Plik jest przypisany do konkretnego poziomu (tab + kontekst) | Must |
| FM-03 | Po uploadzie natychmiastowe uruchomienie ekstrakcji faktów | Must |
| FM-04 | Skeleton loading w sekcji Facts podczas ekstrakcji | Must |
| FM-05 | Lista uploadowanych plików z metadanymi (nazwa, kategoria, język, data) | Must |
| FM-06 | Usunięcie pliku (admin only) — nie usuwa wyekstraktowanych faktów automatycznie | Should |
| FM-07 | Kategoria pliku auto-przypisywana przez AI, edytowalna przez admina | Should |

### Facts — Topics

| ID | Wymaganie | Priorytet |
|---|---|---|
| FT-01 | Fakty auto-grupowane w tematy przez AI po ekstrakcji | Must |
| FT-02 | Każdy temat ma: ikonę (AI auto), nazwę, opis, AI summary | Must |
| FT-03 | AI Summary auto-regeneruje się po każdej zmianie faktów w temacie | Must |
| FT-04 | Admin może zmienić nazwę, opis, ikonę tematu | Must |
| FT-05 | Admin może dodać temat ręcznie | Must |
| FT-06 | Admin może usunąć temat (z potwierdzeniem; co z faktami — do decyzji: przenieś do "Uncategorized" lub usuń) | Must |
| FT-07 | Czerwona kropka na temacie jeśli zawiera ≥1 fakt High priority | Must |
| FT-08 | Badge N/N (aktywne/wszystkie) per temat | Should |
| FT-09 | Collapse/expand per temat (default: collapsed) | Must |

### Facts — poszczególne fakty

| ID | Wymaganie | Priorytet |
|---|---|---|
| FF-01 | Fakty wyświetlane z: treścią, priority, source, tags | Must |
| FF-02 | Inline editing treści faktu (admin) — aktivacja przez kliknięcie lub przycisk Edit | Must |
| FF-03 | Zmiana priorytetu: High / Medium / Low (dropdown pill) — admin only | Must |
| FF-04 | Dodawanie hashtag tagów per fakt — admin only | Should |
| FF-05 | Source tag: AI icon + filename (wyekstraktowane) lub "manual" | Must |
| FF-06 | Dodawanie faktu ręcznie do istniejącego tematu — admin only | Must |
| FF-07 | Usunięcie faktu — admin only | Must |
| FF-08 | Fakty mają unikalne ID (do citowania przez Copilota) | Must |

### Search i filtrowanie

| ID | Wymaganie | Priorytet |
|---|---|---|
| SR-01 | Wyszukiwarka across facts na danym poziomie | Must |
| SR-02 | Wyniki wyszukiwania filtrują facts i tematy (tematy bez wyników są ukryte) | Should |
| SR-03 | Stan pusty przy braku wyników wyszukiwania | Must |

### Copilot citations

| ID | Wymaganie | Priorytet |
|---|---|---|
| CC-01 | Każdy insight Copilota zawiera ikonę [ℹ] z tooltipem citations | Must |
| CC-02 | Tooltip pokazuje: treść faktu (truncated), level, source file, stored in, link View in KB | Must |
| CC-03 | "View in Knowledge Bank" link otwiera KB na właściwym tab i kontekście | Must |
| CC-04 | Fakty Brief w tooltipie bez linku View in KB | Must |
| CC-05 | Copilot priorytetyzuje fakty z prioryteten High przy odpowiadaniu | Must |
| CC-06 | Tooltip empty state jeśli insight nie bazuje na KB facts | Should |

---

## 9. Wymagania niefunkcjonalne

| ID | Wymaganie |
|---|---|
| NF-01 | Ekstrakcja faktów z typowego dokumentu (<20 stron) zakończona w <60s |
| NF-02 | Knowledge Bank ładuje się w <2s (pierwsze fakty widoczne) |
| NF-03 | Zmiany w KB (edycja, dodanie, priorytet) propagują się do Copilota w czasie rzeczywistym lub w <5 min |
| NF-04 | Dane KB są izolowane per klient — planner Client A nie widzi KB danych Client B |

---

## 10. Design guidance

### Visual style
Wzorować na istniejącym Planning Console (screenshots: PA-global, PA-single-market, media plan detail):
- Background: white cards na jasnym tle (#F8F9FA)
- Primary action: niebieski (#2563EB lub ustalony token)
- Checkmark active state: zielone kółko z białym ✓
- High priority pill: salmon/red (#EF4444 lub podobny), Medium: amber, Low: gray
- Tags: rounded gray pills
- Typography i spacing: zgodnie z istniejącym design systemem

### Structural reference
Sekcja faktów wzorowana 1:1 na screenshocie "Client memories":
- Topic card z ikoną, nazwą, opisem, badge, collapse/expand
- Fact row z checkmarkiem, treścią, priority pill, source tag, hashtag tags, edit
- "+ Add fact to this topic" z dashed border
- Ogólne proporcje, spacing, typografia z tego screenshotu

### Nowe komponenty do zaprojektowania
1. Tab navigation z permission indicators
2. Multi-level selector (Market/Client/Brand)
3. Permission banner (2 stany)
4. Upload zone
5. Skeleton loading (topic-level)
6. Topic card (collapsed + expanded)
7. Priority pill dropdown
8. Source tag (2 warianty: AI extracted / manual)
9. Citation icon [ℹ] inline w tekście Copilota
10. Citation tooltip (multi-fact layout)
11. "View in Knowledge Bank" link w tooltipie

---

## 11. Out of scope (v1)

- Wersjonowanie faktów (historia zmian)
- Komentarze / dyskusje do faktów
- Bulk import/export faktów (CSV)
- Automatyczne sugestie powiązanych faktów across poziomów
- Notifications gdy nowe High Priority fakty zostaną dodane
- Mobile view KB

---

## 12. Zależności

- Copilot API musi przyjmować fakty z KB jako część kontekstu (z wagowaniem per priority)
- Backend musi obsługiwać 4-poziomową hierarchię Knowledge Bank z RBAC per poziom
- AI pipeline: ekstrakcja faktów z dokumentów + tworzenie tematów + generowanie AI summary
- Deep-link z Copilota do KB (routing + scroll to topic)
