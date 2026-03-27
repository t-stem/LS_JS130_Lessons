class Anagram {
  constructor(targetWord) {
    this.targetWord = targetWord;
  }

  isAnagram(word) {
    if (word.length !== this.targetWord.length) return false;

    let targetWord = this.targetWord.toLowerCase();
    let matchWord = word.toLowerCase();

    if (targetWord === matchWord) return false;

    let targetWordSorted = targetWord.split('').sort().join('');
    let matchWorSorted = matchWord.split('').sort().join('');

    if (targetWordSorted !== matchWorSorted) return false;

    return true;
  }

  match(wordsArr) {
    let anagrams = [];

    wordsArr.forEach(currWord => {
      if (this.isAnagram(currWord)) {
        anagrams.push(currWord);
      }
    })

    return anagrams;
  }
}

module.exports = Anagram;