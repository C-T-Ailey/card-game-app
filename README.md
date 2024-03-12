# Seven Card Sloane
### A single-player Poker game by Chris Ailey

Seven Card Sloane is a single-player card game based on the Texas Hold'Em variant of Poker, built using React. Unlike conventional Poker, which requires engaging with other players and the mind-games which ensue, the sole aim of Seven Card Sloane (as it presently stands, at least) is to bet on a scoring hand you predict will be drawn. The payout for each hand relates to the odds of drawing it; the most common being One Pair -- virtually guaranteed to appear at least once per game -- with a payout of 1:1, while the Royal Flush is the rarest hand and accordingly has a payout of 1:20.

The game currently exists in a presentable and playable state, though several features are planned for future updates.

#### Current Features
* The basic game loop is fully functional; the player can choose the number of chips to bet, the hand they wish to bet on being drawn, and draw the seven hands which constitute a full game. Failed bets will subtract the wagered chips from the player's stock, and successful bets will pay out at the correct rate.
* A "Help" window with a detailed explanation of how to play and a glossary of each possible scoring hand is available to players.
* All buttons and features are appropriately disabled during stages of the game where they are unused, e.g. the Betting panel is disabled while a game is in progress, and the Shuffle and Draw buttons are disabled when a game has not been started.


#### Planned Features
* More detailed animations for the cards as they are dealt out, e.g. a face-down initial placement showing the card's back pattern before being flipped to reveal the card's suit and rank.
* A "Points Shop", allowing players to spend accumulated chips on rewards such as new card back patterns, unlockable features for modifying a hand's constituent cards, or including Jokers in the deck to improve the odds of drawing high-scoring hands.
* An Achievements list which will unlock special rewards in the Points Shop when certain conditions are met during games.


#### Known Bugs and Issues
* While it is possible to draw three pairs of matching cards in a hand, this "Three Pair" does not count as a scoring hand in its own right due to a poker hand being required to consist of no more than five cards. Instead, it is registered as a "Three Pair Special" variant of the "Two Pair" hand. This may be fixed, though it may be kept in the game as a unique variant of Two Pair attached to certain Achievement criteria.
* A "Full House" hand containing Three of a Kind and Two Pair will highlight each of those cards, despite the second Pair being superfluous to the hand, and the function for identifying and naming the scoring hand will register the lowest Pair as part of the Full House instead of the appropriate highest Pair.