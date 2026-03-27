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

    return targetWordSorted !== matchWorSorted // IMPROVEMENT: shortened IF logic into direct return statement to return boolean
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