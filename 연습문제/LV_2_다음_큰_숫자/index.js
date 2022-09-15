// 정규식을 이용하여 문자열에 포함된 단어의 개수를 비교
function solution(n) {
  let answer = n + 1;
  while(true) {
    if (n.toString(2).match(/1/g).length === answer.toString(2).match(/1/g).length) break;
    answer++;
  }

  console.log(answer);
  return answer;
}

// test
// 83
solution(78);

// 27
solution(23);
