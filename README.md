Projekt pozwala użytkownikowi wyszukać pokemona oraz wyświetlić na jego temat wszelakie informacje, takie jak:
-Statystyki
-Typy
-Nazwa
-Rysunek pokemona
-Type matchups (defensive vs " " and offensive vs " ") z adekwatnymi mnożnikami

Projekt ma autouzupełnianie w searchbar
statystyki są wyświetlane w formie Barchart

---Instalacja i uruchomienie---
Projekt można uruchomić poprzez live link, lub:
-pobrać cały projekt
-stworzyć folder i otworzyć go w vscode
-otworzyć terminal
-wpisać cd (nazwafolderu)
-wpisać npm run dev
-kliknąć w wyświetlony link

---Nie trzeba konfigurować---

<img width="2560" height="1394" alt="image" src="https://github.com/user-attachments/assets/9ab33792-95f2-4d1b-a9e9-44cb3137b0b3" />
<img width="2560" height="1385" alt="image" src="https://github.com/user-attachments/assets/6eb0fc6c-657a-4bb5-87ea-e53a58448a70" />

---struktura projektu---

/components
  Autocomplete.jsx
  DefenseChart.jsx
  Display.jsx
  ErrorBoundary.jsx
  OffenseChart.jsx
  StatsChart.jsx
  TitleSection.jsx
App.jsx
App.css
main.jsx

---Użyte biblioteki---
-ReactDOM (dla componentów)
-Axios (do pobierania informacji z api)
-useState (dla zmiennych)
-useMemo (buforowanie wyników obliczeń pomiędzy renderowaniami)
-recharts (Barchart z wartościami statystyk)
-useEffect (umożliwia synchronizację komponentów z systemem zewnętrznym) np. w autocomplete jest użyty do fetchowania nazw z api
-useRef (odwołanie do wartości nie potrzebnej do renderu)

-wybrałem recharts ponieważ chciałem aby statystyki ładnie wyglądały zamiast zwykłych cyfr
-wybrałem Axios bo najłatwiej mi się tym pobiera informacje z pokeApi

mam nadzieje że wystarczająco wyjaśnione

---Known Issues---
-wyszukiwanie "mewtwo" z jakiegoś powodu zwraca wyszukiwanie dla mew

!!!!!!!!! Live link: https://pokemon-stat-tracker.vercel.app !!!!!!!!!

src/
├─ App.jsx                # Root komponent
├─ App.css                # Style globalne
├─ components/
│   ├─ TitleSection.jsx   # Nagłówek aplikacji ("Pokémon Statchecker")
│   ├─ Autocomplete.jsx   # Pole wyszukiwania Pokémonów z autouzupełnianiem
│   ├─ Display.jsx        # Wyświetla wybranego Pokémona
│   │   ├─ StatsChart.jsx      # Wykres statystyk (HP, Atak, Obrona, itp.)
│   │   ├─ ErrorBoundary.jsx   # Otacza StatsChart, by zapobiec crashom
│   │   ├─ DefenseChart.jsx    # Tabela odporności typu Pokémon
│   │   └─ OffenseChart.jsx    # Tabela siły ataków typu Pokémon
│   └─ (opcjonalnie) inne komponenty np. TypeMatchups

---Opis kluczowych componentów---

App.jsx
  Pobieranie danych z searchbaru, oraz pobieranie informacji na temat wyszukanego pokemona z api, po czym odwołuje się do Autocomplete.jsx (automatyczne uzupełnianie wyszukiwania) oraz używa Display.jsx do wyświetlenia informacji

DefenseChart/Offensechart
  zmienne z informacjami na temat mnożników, obliczanie na podstawie OBYDWU typów, oraz zwracanie mnożnika zielony-pozytywny dla pokemona,czerwony-negatywny dla pokemona, biały-mnożnik x0 (brak interakcji), oraz tooltip jak najedzie się na typy

Display.jsx
  Na podstawie pobranej informacji z api wyświetla informacje na temat pokemona używa tooltip dla typów (to samo co w offense/defense charts) wyświetla zdjęcie pobrane z api używa ErrorBoundary, aby catchować możliwe błędy z StatsChart.jsx (jak pisałem to dużo sie z tym bawiłem więc się przydało) wyświetla StatsChart, po czym wyświetla DefenseChart oraz OffenseChart wszystko jest wyświetlane z pomocą informacji pobranych z api.


---Trudności---

StatsChart.jsx sprawiał wiele problemów, a mówiąc wiele problemów mam na myśli 1 którego nie umiałem znaleźć przez jakoś 2godziny. Mianowicie, jeśli w App.jsx w const searchPokemon wartość type2 była pobierana za pomocą:
type2: response.data.types[1]..type.name, to cała aplikacja crashowała wtedy kiedy wyszukiwało się pokemona tylko z 1 typem, tylko wyszukiwanie pokemonów z 2 typami działało. Musiałem to zmienić na: type2: response.data.types[1] ? response.data.types[1].type.name : null,
a oczywiście problemu szukałem w StatsChart.jsx więc dlatego tyle zajęło znalezienie problemu. Innym słowem naszedłem na ścieżke do naprawy problemu dopiero po 2godzinach kiedy ogarnąłem że pokemony z 2typami działają, a pokemony z 1 typem nie.
Był też problem z gradientem, ale to już nie pamiętam nawet co, bo to aż tak denerwujące nie było.


---future improvements---
-light mode/dark mode
-wartości na barcharcie bez najeżdżania myszką
-naprawienie problemu z mewtwo (nie wiem czemu to sie dzieje nigdy bardzo dziwny błąd, jedyny pokemon, który się niepoprawnie wyszukuje)



