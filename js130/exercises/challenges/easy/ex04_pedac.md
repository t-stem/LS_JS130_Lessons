Write a program that takes a word and a list of possible anagrams and selects the correct sublist that contains the anagrams of the word.

For example, given the word "listen" and a list of candidates like "enlists", "google", "inlets", and "banana", the program should return a list containing "inlets". Please read the test suite for the exact rules of anagrams.

PEDAC

# PROBLEM
## Inputs
- string: word
- array: [words]

## Outputs
- array: [words that are anagrams of word]

## Explicit rules
- No matches returns empty array
- Identical word is not anagram
- Anagrams are case-insensitive

## Implicit rules
- anagram has same length as word
- anagram contains same letters as word in same quantities
- all words consist of alphabetic chars
- alphabetic chars follow alphabetic order
  * anagrams are identical when their letters are sorted alphabetically

## Questions
-

# EXAMPLES/TEST CASES


# DATA STRUCTURES
- tally {letter: frequency}
- sorted string alphabetically (google = eggloo)

# ALGORITHM
- Check if two words are algorithms

  IF word lengths are not equal
    RETURN false

  Convert both words to same case

  IF two words are identical
    RETURN false
  
  SORT the letters in both words alphabetically
  IF sorted words are equal
    RETURN true
  ELSE
    RETURN false

- LOOP through array of words
  IF currWord and targetWord are anagrams
    APPEND currWord to anagrams

- RETURN anagrams


# CODE